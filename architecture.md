# Architecture

This document describes the frontend file structure, styling conventions, and component/hook patterns for this project. It is a living reference — update it as the project evolves.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React (TS) + Vite | Fundamentals-first; no Next.js framework magic |
| Styling | CSS Modules + custom properties | Full CSS power, locally scoped, no collisions |
| Backend | Python 3.11+ / FastAPI | Type-safe, async-ready |
| Database | PostgreSQL via AWS RDS | Relational, complex joins, some services handled in DB directly |
| ORM / Migrations | SQLAlchemy 2.0 + Alembic | Modern async style |
| Containerization | Docker + docker-compose | Local environment mirrors production |
| Infrastructure | Terraform | Infrastructure as Code |
| Compute | AWS Fargate | Serverless containers, no server management |
| Load Balancer | Application Load Balancer | Internet-facing; routes HTTPS to Fargate, handles SSL termination |
| CDN / Frontend Hosting | CloudFront + S3 | React build served at the edge |
| Secrets | AWS Secrets Manager | Injected into Fargate at runtime |
| Caching (Phase 4) | Redis / ElastiCache | Add when feed performance requires it |

---

## Frontend File Structure

```
/src
  /pages                        # Route-level components only. No logic, no state.
    HomePage.tsx                # Composes Feed feature
    ComposePage.tsx             # Composes PoemComposer feature
    ProfilePage.tsx             # Composes Profile feature
    LoginPage.tsx               # Composes Auth feature

  /features                     # One folder per product feature.
    /feed                       # Everything the Feed needs, colocated.
      Feed.tsx                  # Container: owns data fetching via useFeed
      FeedCard.tsx              # Single poem rendered in the feed
      FeedCard.module.css
      useFeed.ts                # Custom hook: fetch, pagination, loading/error state

    /poem-composer              # The core interactive experience.
      PoemComposer.tsx          # Outer container, owns submit logic
      TileBoard.tsx             # The arrangement surface (drop target)
      WordTray.tsx              # The pool of unplaced tiles (drag source)
      Tile.tsx                  # Single draggable word tile
      useTileState.ts           # ← Most important hook in the project (see below)
      PoemComposer.module.css

    /profile
      ProfilePage.tsx           # User profile shell
      Fridge.tsx                # Display grid for a user's published poems
      LikedFridge.tsx           # Private collection of liked poems
      useFridge.ts              # Fetch and manage fridge poem data

    /auth
      LoginPage.tsx
      RegisterPage.tsx
      useAuth.ts                # Auth state, token storage, login/logout actions

  /shared                       # Genuinely reusable across features.
    /components
      Avatar.tsx
      Button.tsx
      Button.module.css
      Modal.tsx
      Modal.module.css
    /hooks
      useApi.ts                 # Base fetch wrapper: loading, error, response state

  /lib
    api.ts                      # Axios instance, base URL, auth header interceptor
    types.ts                    # Shared TypeScript interfaces (Poem, User, Tile, etc.)

  /styles
    global.css                  # Resets, body font, root-level defaults
    tokens.css                  # CSS custom properties: colors, spacing, type scale

  App.tsx                       # Router setup (React Router)
  main.tsx                      # Entry point, mounts App
```

---

## The Pages / Features Distinction

**Pages** are thin. Their only job is to assemble features for a given route and handle route-level concerns (reading URL params, redirecting if unauthenticated). They should contain no business logic and no local state.

**Features** are self-contained slices of product functionality. A feature folder owns its components, its styles, and its hooks. If you deleted a feature folder, nothing outside it should break (except the page that imports it).

This separation gives you a reliable answer to "where does this go?" as the project grows.

---

## Styling: CSS Modules + Design Tokens

### Why CSS Modules
Raw CSS gets messy fast because class names are global. Two components with a `.card` class will collide. CSS Modules scope class names locally at build time — `.card` in `FeedCard.module.css` is completely isolated from `.card` anywhere else. Vite supports this out of the box with no configuration.

Usage:
```tsx
// FeedCard.module.css
.card { border-radius: 8px; padding: var(--space-md); }
.card__author { font-size: var(--text-sm); color: var(--color-muted); }

// FeedCard.tsx
import styles from './FeedCard.module.css'
<div className={styles.card}>
  <span className={styles.card__author}>{poem.author}</span>
</div>
```

### Why Design Tokens
Define your visual language once in `tokens.css` as CSS custom properties. Every module file references these variables instead of raw values. Change a color in one place, it updates everywhere.

```css
/* tokens.css */
:root {
  --color-bg: #f5f0e8;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-muted: #6b6b6b;
  --color-accent: #c45c2e;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;

  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
}
```

### BEM-style naming within modules
Even inside a scoped module, consistent naming prevents confusion as files grow. Follow Block__Element--Modifier:
- `.card` — the block
- `.card__title` — an element of the card
- `.card--featured` — a modifier state

---

## Hooks: The Core Pattern

**Rule:** A custom hook is where logic lives. A component is where markup lives.

A custom hook is just a function whose name starts with `use` and which calls other hooks internally. It extracts state and behavior out of components so components stay readable and logic stays testable.

### The boundary that matters most
Every feature in this app will have two kinds of state:

- **Local interaction state** — exists only in the browser, hasn't touched the server yet. The tiles currently arranged on the compose board. A form being filled out.
- **Server state** — data that lives in the database and is fetched, cached, and synchronized. The feed. A user's saved poems.

These are different problems and should be handled separately. Don't mix fetch logic into a hook that manages UI interaction state.

### useTileState — the most important hook in this project
This hook owns the entire compose interaction. It should manage:
- The full word pool for this session
- The current "hand" dealt to the user (random subset)
- The arranged poem (ordered list of placed tiles)
- Actions: `placeTile`, `removeTile`, `reorderTile`, `dealNewHand`, `reset`

It returns state and actions. It knows nothing about drag and drop — that's the UI layer's concern. dnd-kit will call `reorderTile` when a drag completes; `useTileState` just executes the state transition.

```ts
// Shape to aim for
const { hand, poem, placeTile, removeTile, reorderTile, dealNewHand } = useTileState(wordPool)
```

Build this hook with placeholder button interactions before introducing dnd-kit. Get the state transitions right first. Then the drag integration becomes a matter of wiring gestures to actions you've already defined.

### useApi — the base data hook
All server communication should go through a single Axios instance (`lib/api.ts`) that handles the base URL and auth headers. Feature hooks like `useFeed` call this rather than raw fetch.

---

## Backend Structure

```
/backend
  /alembic                      # Migration version history
  /app
    /api/v1
      poems.py                  # Route handlers
      users.py
    /core
      config.py                 # Settings from env vars
      security.py               # JWT, password hashing
    /db
      session.py                # SQLAlchemy engine + session factory
    /models
      poem.py                   # SQLAlchemy table definitions
      user.py
    /schemas
      poem.py                   # Pydantic input/output validation
      user.py
    /services
      feed.py                   # Business logic (feed assembly, pagination)
      poem.py
    main.py                     # FastAPI app, router registration
  /tests
  Dockerfile
  requirements.txt
```

---

## Infrastructure Structure

```
/infra
  /modules
    vpc/                        # VPC, subnets, security groups
    rds/                        # RDS Postgres instance
    ecs/                        # Fargate cluster, task definition, service
    s3_cloudfront/              # Frontend hosting
  /envs
    staging/                    # Staging environment variable overrides
    prod/                       # Production overrides
  main.tf
  variables.tf
  outputs.tf
```

---

## Security Architecture

This is the conventional production security model for a React SPA + API setup. Each layer protects against different threats — removing any one leaves a different hole.

### The layers

**JWT authentication** — the primary API security boundary. Every protected endpoint requires a valid signed token. A request without one gets a 401 regardless of where it comes from — browser, curl, Postman, anywhere. This is what actually secures your API, not network obscurity.

**VPC network isolation** — RDS lives in a private subnet with no public IP. Even if an attacker found your database endpoint, they cannot reach it from the internet. Fargate tasks also run in private subnets. The only publicly addressable resource is the ALB.

**Security groups** — AWS firewall rules enforced at the resource level:
- ALB accepts HTTPS (443) from anywhere on the internet
- Fargate accepts traffic only from the ALB
- RDS accepts traffic only from Fargate

Each layer is only reachable from the layer directly above it.

**CORS** — a browser-enforced policy, not a server-enforced one. Tells browsers to refuse requests to `api.yourapp.com` from any origin except `yourapp.com`. Does not affect curl, Postman, or any non-browser client — those ignore CORS entirely. Protects against malicious websites using your logged-in users' browsers as attack vectors.

**Rate limiting** — applied at the application layer via `slowapi`. Auth endpoints (login, register) are rate limited to prevent credential stuffing. Not a substitute for auth, a complement to it.

**Secrets Manager** — database credentials and JWT signing keys are never in source control, environment files, or Docker images. Injected into Fargate containers at runtime.

**HTTPS** — SSL terminated at the ALB. Traffic between users and the ALB is encrypted. Traffic between ALB and Fargate is inside the private VPC.

### What this means in practice

The ALB is internet-facing. This is intentional and conventional — your React app runs in the user's browser, outside your VPC, and needs to reach the API directly. "The API is publicly addressable" is not a vulnerability if auth is solid. The database being unreachable from outside the VPC is what actually matters at the infrastructure level.

A truly private API that your browser-based frontend cannot reach does not work for this architecture. The correct mental model: **controlled public entry point, secured by auth, with private data stores behind it.**

### Auth implementation

- Passwords stored as bcrypt hashes, never plaintext
- JWT access tokens: short-lived (15 min), stored in memory only (never localStorage)
- Refresh tokens: longer-lived, stored in httpOnly cookies (unreadable by JavaScript)
- Refresh tokens stored as hashes in a `sessions` table — enables revocation and active session management
- `get_current_user` FastAPI dependency validates tokens and protects routes
- Axios interceptor attaches access token to every request; intercepts 401s to attempt silent refresh

---

## Database Schema

### Core tables

**users**
- `id` — primary key (see note on ID types below)
- `email` — unique
- `username` — unique
- `hashed_password`
- `created_at`, `updated_at`

**profiles** (one-to-one with users, created on registration)
- `id`
- `user_id` — FK to users
- `display_name`
- `bio`
- `avatar_url`

**sessions** (refresh token store)
- `id`
- `user_id` — FK to users
- `token_hash` — hashed refresh token, never the token itself
- `expires_at`
- `created_at`
- `user_agent`, `ip_address` — optional, useful for session management UI

**poems**
- `id`
- `user_id` — FK to users
- `tiles` — ordered array of words (Postgres array column)
- `created_at`

**user_follows** (self-referential many-to-many)
- `follower_id` — FK to users
- `following_id` — FK to users
- `created_at`
- PRIMARY KEY (`follower_id`, `following_id`) — prevents duplicate follows

**likes**
- `user_id` — FK to users
- `poem_id` — FK to poems
- `created_at`
- PRIMARY KEY (`user_id`, `poem_id`)

### ID type
Three options: serial integer, UUID, or ULID. Serial integers are simple but expose record counts and are harder to shard. UUIDs are globally unique but random — poor index locality, larger storage. ULIDs are sortable and unique — time-ordered, URL-safe, good index locality. ULID is worth considering for a new project.

### Migrations discipline
- Never edit a migration that has already been applied anywhere
- Every schema change is a new migration file
- Treat migration history as append-only, like git history
- `alembic upgrade head` runs automatically in the CI/CD deploy step before new Fargate tasks receive traffic

---

## API Design

### Consistent error shape
Every error response across every endpoint returns the same shape:
```json
{ "error": "Human readable message", "code": "MACHINE_READABLE_CODE" }
```
Define a global exception handler in FastAPI at startup. Never handle errors differently per endpoint.

### Input validation
All incoming data is validated by Pydantic schemas before reaching route handlers. Define constraints explicitly — maximum username length, allowed characters, maximum poem tile count. Every piece of data from the outside world is untrusted.

### Environment variables
- Backend: settings loaded from environment via `pydantic-settings` in `core/config.py`
- Frontend: Vite exposes vars prefixed with `VITE_` — API base URL is always an env var, never hardcoded
- Never commit `.env` files containing real values

### CORS configuration
FastAPI `CORSMiddleware` configured at startup. In development, allow `localhost:5173`. In production, allow only your CloudFront domain. No wildcards in production.

---

## Monorepo Root

```
/quirky-twitter                 # (or whatever you name it)
  /backend
  /frontend
  /infra
  /scripts                      # DB seeding, utility scripts
  docker-compose.yml            # Local full-stack orchestration
  .github/workflows/            # CI/CD pipelines
  ARCHITECTURE.md               # This file
  GAMEPLAN.md
  PRINCIPLES.md
  README.md
```
