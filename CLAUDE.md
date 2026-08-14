# Monostich — Project Context

## What this project is

A social media site where users compose single-line poems (monostichs) by dragging and placing word tiles, like magnetic poetry. Functionally mirrors Twitter at a basic level. Goal: 1000 active users. Built for learning fundamental software engineering skills.

See `product.md` for the product design and the reasoning behind it — modes, values, the poem/tile model, and build order. Together with this file it is the authority on current state.

The original planning documents are archived in `docs/` for history. They predate almost every decision below and should not be read as current.

---

## How to work on this project

**This project exists to teach, not to ship fast.** The user is an early-career developer deliberately going slowly to build fluency. Optimizing for velocity defeats the purpose. See `~/.claude/CLAUDE.md` for the general mentoring preferences; the points below are what this project specifically needs.

### Depth of explanation

Long, dense explanations are correct here. A good answer runs 800–1500 words with headers, tables, and code, and covers:

- **The concept before the code.** Explain the mechanism, then show the implementation illustrating it.
- **The alternatives that were on the table.** Judgment can't develop from a single data point. Name what else could have been chosen and what would make you choose differently.
- **Hard constraints vs. conventions.** "Postgres requires this" and "most Python teams do this" are different claims and should be labelled as such.
- **Protocol-level and mechanical detail.** How server-side parameter binding works on the wire, what MVCC does on commit, why `await` suspends rather than parallelizes. This detail is wanted, not noise.
- **The big-picture reasoning**, not just the local fix.

Do not compress to save space. The user has explicitly and repeatedly asked for more detail, not less.

### Pace

Work in small, verified steps. Finish and confirm one thing before opening the next. The user gets overwhelmed when several decisions are opened simultaneously — when that happens, cut scope to a single next action rather than presenting a menu.

Expect to re-explain concepts covered earlier when they resurface. That is normal and expected, not a sign the first explanation failed.

### Who writes the code

The user writes all application code. Claude explains, reviews, and shows examples in chat. Claude does not edit files in this repo — the exception is `CLAUDE.md` itself, and only on explicit request.

For genuinely unfamiliar tooling, provide working example code up front — nobody can invent an API they have never seen. Then walk through it slowly afterward. Withholding syntax stalls progress; withholding *design* is what preserves the learning.

### Review style

Be direct about what's wrong and why. Name bugs plainly rather than hinting. When reviewing, lead with anything that breaks at runtime, then correctness, then style. Fold fixes into the concept they belong to rather than batching a separate cleanup pass.

Verify claims against the actual files before asserting them — read the whole file, not a grep window.

---

## Current state

**Phase 1 — Local Foundation:** complete
**Phase 2 — Skeleton Pipeline:** complete
**Phase 3 — Application Development:** in progress. Auth is built and deployed.

### What works end to end

`POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`, and `GET /health` — running locally under Docker Compose and deployed on Railway, with migrations applied in both.

### Backend layout

```
backend/
  domain/        pure Python. Imports nothing else in the app.
    user.py      User, UserCredentials
    poem.py      (empty — next feature)
  db/            persistence adapter — SQL and row mapping only
    users.py     create, get_by_email, get_credentials_by_email, get_by_id
    types.py     Pool type alias
  services/      orchestration, transaction boundaries, error translation
    auth.py      register, login
  schemas/       Pydantic DTOs at the HTTP boundary
    user.py      UserCreate, UserLogin, UserOut, TokenOut
  api/
    deps.py      get_pool, get_conn, get_current_user
    v1/auth.py   routers
  core/
    config.py    pydantic-settings
    security.py  argon2 hashing, JWT encode/decode
    errors.py    DomainError hierarchy
  main.py        composition root: lifespan, middleware, handlers, router registration
  alembic/       migrations (2 applied)
```

**Dependency rule: dependencies point inward.** `api` → `services` → `db` → `domain`. `domain` imports nothing from the app. Services must never import FastAPI; they raise `DomainError` subclasses and the single handler in `main.py` maps those to HTTP.

### Type layers

Four shapes of "user," each changing for a different reason:

| Type | Layer | Built with | Changes when |
|---|---|---|---|
| `UserCreate` | inbound adapter | Pydantic | the API input contract changes |
| `UserRow`-style row types | persistence | dataclass | the database schema changes |
| `User`, `UserCredentials` | domain | dataclass | business rules change |
| `UserOut`, `TokenOut` | outbound adapter | Pydantic | the API output contract changes |

Pydantic where parsing hasn't already happened (untrusted HTTP input, serialization out). Dataclasses where it has (Postgres and psycopg already typed the data).

Row types are only introduced when a query's shape genuinely differs from a domain type. Where they match, `class_row(User)` builds the domain object directly — no intermediate class.

---

## Key decisions

### Data access

- **psycopg3 directly, no ORM.** SQLAlchemy was considered and dropped. Rationale: single-database app, and the ORM's main value (relationship traversal, autogenerate) is exactly what obscures the learning.
- **Alembic retained for migrations**, which pulls SQLAlchemy in as a dependency confined to the migration layer. `target_metadata = None` — migrations are hand-written, no autogenerate.
- `alembic/env.py` re-adds the `+psycopg` dialect prefix, because `DATABASE_URL` is stored in the plain libpq form psycopg needs.
- **Explicit column lists, never `SELECT *`.** The decisive reason is deployment: migrations run before new code, so old code must tolerate a new column. `SELECT *` with strict dataclasses breaks the moment a column is added.
- Connection pool created in `lifespan`, yielded as lifespan state, reached via `request.state.pool` through `get_pool`. `min_size=2, max_size=10, check=AsyncConnectionPool.check_connection`.
- **DAL functions take a connection and never commit.** Services own transaction boundaries.
- `timestamptz` for all timestamps, never naive `timestamp`.

### Auth

- argon2id via `argon2-cffi` (chosen over bcrypt to avoid the 72-byte limit).
- PyJWT HS256, 15-minute access tokens, algorithm pinned on decode.
- **Uniqueness is enforced by the database, not by a pre-flight check.** `register` catches `UniqueViolation` and matches `exc.diag.constraint_name` against exact index names (`ix_users_email`, `ix_users_username`). This couples a service file to a migration; the intended safeguard is a test, not a shared constant — migrations must not import application code.
- **Login timing is deliberately equalized.** The "no such user" branch hashes against `_DUMMY_HASH` before failing. Removing it reintroduces an account-enumeration oracle. Both failure paths raise the same `InvalidCredentials`.
- **Known accepted risk:** registration distinguishes `EMAIL_TAKEN` from `USERNAME_TAKEN`, which leaks whether an email has an account. Documented in `services/auth.py`. The proper fix needs email sending.

### Error contract

Every error response, from any layer, has the shape:

```json
{ "error": "human readable", "code": "MACHINE_READABLE", "details": [] }
```

`details` is optional and currently only present on validation errors.

Three handlers in `main.py` produce it. `DomainError` covers everything the application raises — one handler serves every subclass, because Starlette dispatches by walking the exception's MRO. `StarletteHTTPException` covers routing 404s and 405s, deriving the code from `HTTPStatus(...).name` so new status codes need no new code. `RequestValidationError` covers Pydantic 422s, and **must** wrap `exc.errors()` in `jsonable_encoder` — Pydantic error `ctx` values can contain exception instances that `json.dumps` refuses.

Registering the *Starlette* `HTTPException`, not FastAPI's subclass, is deliberate: the router raises the base class, so registering the subclass would miss every 404.

### Config and environments

- `pydantic-settings`, instantiated at import so missing variables crash at startup rather than at first use. `PostgresDsn` and `SecretStr` — both need unwrapping at use sites (`str(...)`, `.get_secret_value()`).
- `.env.docker` — read by containers via `env_file`. Uses the `db` hostname.
- `.env.host` — loaded into the shell by direnv (`.envrc`). Uses `localhost:5433`.
- `.env.example` — committed, documents required keys.
- A value differs between the two env files only when the *network path* differs.
- Postgres is published on host port **5433**, because Postgres.app occupies 5432 on the dev machine. Container-internal it is still 5432.

### Deployment

- Railway, three services: backend, frontend, Postgres.
- `PORT=8000` set explicitly as a service variable; the Dockerfile binds `${PORT:-8000}` via `sh -c` with `exec` so uvicorn is PID 1 and receives SIGTERM.
- Pre-deploy command: `alembic upgrade head`. Automatic migration is acceptable **only** with expand/contract discipline — additive, backward-compatible changes; destructive changes in a later, separate deploy.
- Healthcheck path `/health`.
- CI (`.github/workflows/ci.yml`) lints only; Railway deploys via its own GitHub integration.

### Tooling

- Python 3.14, `uv`, `pyproject.toml` as source of truth.
- Ruff with `select = ["E", "F", "I", "A", "B", "UP"]`. Pyright configured via `[tool.pyright]` in `backend/pyproject.toml` so it works in any editor.
- Local dev: `compose.yaml` bind-mounts `./backend:/app` with an anonymous volume at `/app/.venv` (so the image's Linux venv isn't masked) and runs uvicorn with `--reload`. The Dockerfile `CMD` remains the production command.
- Editor is Neovim (kickstart.nvim) in tmux, with pyright + ruff LSP and conform.nvim running `ruff_organize_imports` then `ruff_format` on save.

---

## Frontend conventions

Not yet built beyond the Phase 1 scaffold, but these are decided.

### Structure

```
src/
  pages/       route-level only. Thin assemblers. No logic, no state.
  features/    one folder per product feature, colocating components, hooks, styles
  shared/      genuinely reusable components and hooks
  lib/         api client, shared types
  styles/      global.css, tokens.css
```

Deleting a feature folder should break nothing outside it except the page that imports it.

Note the asymmetry with the backend: **the backend groups by layer, the frontend groups by feature.** That's deliberate, not an inconsistency — a backend has few layers crossed by many entities, while a frontend has many features that each own a whole vertical slice.

### Styling

CSS Modules, because scoping should be structural rather than a thing you remember to do. Design tokens as CSS custom properties in `tokens.css`; module files reference variables, never raw values. BEM-style naming within a module (`.card`, `.card__title`, `.card--featured`).

### Hooks

- **A hook owns state, derived values, and actions. A component maps them to markup and contains no business logic.** When a component starts feeling complicated, extract a hook.
- **Local interaction state and server state are different problems.** Never put fetch logic in a hook that manages UI interaction state. `useTileState` owns tiles; something else owns fetching them.
- **Don't store what you can derive.** Storing two arrays that must be kept in sync is how tiles get duplicated or lost. Store the minimum and compute the rest — this is the central design decision in `useTileState`.
- **Build the state shape before the UI.** Validate transitions with placeholder buttons, then wire the real interaction on top. Applies directly to `useTileState` before dnd-kit: the library handles gestures, the hook decides what a gesture *means*.
- Prefer `useReducer` over `useState` once several actions touch the same state — the reducer is a pure function, testable with no React at all.

## Open items

- **No tests at all.** Highest value first: duplicate email → 409 (pins the constraint-name coupling), wrong password → 401, `/me` without a token → 401. Needs pytest, `httpx` `ASGITransport`, and a test-database strategy.
- **Refresh tokens and the `sessions` table** are unbuilt. Access tokens alone mean a 15-minute session. Deferred until after the composer.
- **Password hashing runs on the event loop.** `hash_password` is ~100ms of CPU inside an `async def`, blocking all concurrent requests in that worker. `asyncio.to_thread` is the fix; deliberately deferred as premature at current traffic.
- `domain/poem.py` is empty. The poem/tile data model is **designed but not built** — see `product.md`. Deliberately not written as a migration yet: the schema is downstream of the composer interaction, so `useTileState` comes first.
- Frontend is still the Phase 1 scaffold; it fetches `/health` and renders the status. Next work is React, not Python: `useTileState` as a pure reducer with button interactions, before dnd-kit and before any persistence.

---

## Walkthrough progress

**Complete.** The user worked through a structured explanation of the whole backend: async and the event loop, config, connections and pooling, the DAL, services and transactions, the layered type discussion that produced the domain layer, the API layer (`Depends` resolution, dependency caching, `yield` lifecycle), and `main.py` as a composition root (middleware ordering, MRO-based handler dispatch).

Next work is the frontend — `useTileState` as a pure reducer before any React, dnd-kit, or persistence.
