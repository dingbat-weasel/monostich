# Gameplan

This document describes the four-phase build sequence for this project. Each phase has a clear entry condition, a clear exit condition, and produces something observable. Read PRINCIPLES.md for the reasoning behind this structure.

---

## Phase 1 — Local Foundation

**Goal:** The full stack runs locally in a single command, in an environment that structurally mirrors production.

**Why Docker first:** Not because Docker is interesting, but because "works on my machine in a way identical to production" eliminates an entire category of debugging later. Solve environment inconsistency once, now, when the app is simple.

### Exit condition
`docker compose up` boots the frontend, backend, and database. The frontend renders a page. The backend responds to a health check endpoint. The two can communicate.

### Steps
1. Write a `docker-compose.yml` with three services: `frontend` (Vite dev server), `backend` (FastAPI via uvicorn), `db` (Postgres).
2. Backend: FastAPI app with a single `/health` endpoint returning `{ "status": "ok" }`. SQLAlchemy connected to the compose Postgres instance.
3. Frontend: Vite + React scaffold. Single page that fetches `/health` and renders the response.
4. Verify the frontend can reach the backend through the compose network.
5. Write the first Alembic migration: `users` table. Verify it runs via `alembic upgrade head` inside the backend container.

### What you are NOT doing in this phase
- No AWS, no Terraform, no CI/CD
- No real features
- No auth
- No frontend styling

---

## Phase 2 — Skeleton Pipeline

**Goal:** A hello-world version of the app is deployed to a real URL via an automated pipeline. The deployment problem is solved once, while the app is still simple.

**Why before building features:** Retrofitting CI/CD onto a complex app means debugging deployment and application logic simultaneously. Setting up the pipeline now means every future feature merge is automatically deployed. You also catch infrastructure problems (IAM permissions, network config, environment variables) while there's nothing else to debug.

### Exit condition
Pushing to `main` triggers a GitHub Actions workflow that builds, tests, and deploys the app to a publicly accessible URL.

### Infrastructure (Terraform)
Provision in this order — each depends on the last:
1. **VPC** — private subnets for backend/db, public subnet for load balancer
2. **RDS** — Postgres instance in private subnet
3. **ECR** — container registry for Docker images
4. **ECS / Fargate** — cluster, task definition referencing ECR image, service
5. **Application Load Balancer** — routes HTTPS traffic to Fargate tasks; handles SSL termination
6. **S3 + CloudFront** — S3 bucket for React build artifacts, CloudFront distribution in front of it
7. **Secrets Manager** — DB credentials injected into Fargate at runtime (never in env files or source control)

### CI/CD Pipeline (GitHub Actions)
Three stages, triggered on push to `main`:

**Stage 1 — Test**
- Run `pytest` (backend)
- Run `npm test` (frontend)
- Run `terraform plan` (validate infra changes, don't apply)

**Stage 2 — Build**
- Build backend Docker image
- Push to Amazon ECR

**Stage 3 — Deploy**
- Update Fargate service with new image tag
- Run `alembic upgrade head` as a one-off Fargate task (migrations before traffic)
- Upload React build artifacts to S3
- Invalidate CloudFront cache

### What you are NOT doing in this phase
- No real features, still hello world
- No Redis, no read replicas, no RDS Proxy
- Staging environment only — production comes later

---

## Phase 3 — Application Development

**Goal:** Build the actual product. Infrastructure and CI/CD are frozen. Every merge ships automatically.

**Sequence within this phase:** Build in order of what teaches you the most and validates your core mechanic fastest.

### Recommended feature order

**1. Auth**
Everything else depends on knowing who the user is. Build registration, login, JWT issuance, and a protected route before touching any product features. This also forces you to solve token storage and the auth header interceptor in `lib/api.ts` early.

**2. Poem Composer (useTileState first)**
This is the unique mechanic of the app and the most interesting React problem. Build `useTileState` with button interactions before introducing dnd-kit. Get the state shape right:
- Word pool for the session
- Current hand (dealt subset)
- Arranged poem (placed tiles in order)
- Actions: placeTile, removeTile, reorderTile, dealNewHand, reset

Once the state transitions are solid, integrate dnd-kit. The library handles gesture detection; your hook handles what the gesture means.

**3. Poem persistence**
Wire the composer's submit action to a `POST /poems` endpoint. This is where local interaction state becomes server state — a concrete, instructive moment.

**4. Feed**
Fetch and render a paginated list of poems. Build `useFeed`. Implement infinite scroll or pagination. This is your first real read-heavy endpoint.

**5. Profiles / Fridge**
User profile pages, published poem display, liked poem collection.

**6. Social layer**
Following, liking, and the social feed (poems from followed users). The follow graph lives in Postgres — a junction table is sufficient at this scale.

**7. Comments**
Rendered as tiles for visual consistency. Structurally similar to poems but simpler (no arrangement mechanic needed unless you want it).

### Database philosophy for this phase
Lean on Postgres before reaching for Redis or other services. Postgres can handle:
- Feed queries with proper indexing (no Redis fan-out needed until you have real scale problems)
- Session management (use a `sessions` table before reaching for Redis)
- Full-text search on poems if you add search

Add external services only when Postgres demonstrably can't handle the load. This keeps the system simple and teaches you what the database can actually do.

---

## Phase 4 — Scaling and Hardening

**Goal:** Respond to real problems with real solutions. Add complexity only when you have evidence it's needed.

Add these in response to actual bottlenecks, not in anticipation of hypothetical ones:

| Problem | Solution |
|---|---|
| Feed queries slow under load | Redis fan-out via ElastiCache |
| DB connection exhaustion | RDS Proxy for connection pooling |
| Read query contention | RDS Read Replica; API reads from replica, writes to primary |
| API latency spikes | CloudWatch + X-Ray tracing to identify slow queries |
| Cold start latency | Fargate task pre-warming or minimum task count |
| Horizontal scale needed | Fargate auto-scaling on CPU threshold |

### Promoting to production
When the app is stable on staging and has real users, replicate the Terraform environment for production. The `/infra/envs/` structure supports this — staging and prod are the same modules with different variable overrides.
