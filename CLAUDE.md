# Monostich — Project Context

## What this project is

A social media site where users compose single-line poems (monostichs) by dragging and placing word tiles, like magnetic poetry. Functionally mirrors Twitter at a basic level. Goal: 1000 active users. Built for learning fundamental software engineering skills.

See `principles.md`, `architecture.md`, and `gameplan.md` for full planning documentation.

## Current state

**Phase 1 — Local Foundation: complete**
**Phase 2 — Skeleton Pipeline: complete**

### Phase 1 summary

- `backend/` — FastAPI app with `/health` endpoint, CORS configured dynamically via `VITE_FRONTEND_URL` env var, running via uvicorn in Docker
- `frontend/` — Vite + React + TypeScript scaffold, fetches `/health` and renders response, backend URL via `VITE_API_URL` env var
- `compose.yaml` — three services: `backend`, `frontend`, `db` (Postgres), all running with `docker compose up`
- Python environment managed with `uv`, `pyproject.toml` as source of truth
- `.vscode/settings.json` points VS Code at `backend/.venv`

### Phase 2 summary

- Alembic migrations running from host using `.env.local` (localhost) vs `.env` (Docker internal `db` hostname)
- First migration `users` table committed to `backend/alembic/versions/`
- CI pipeline at `.github/workflows/ci.yml` — backend ruff lint/format check, frontend `tsc --noEmit` + eslint, triggers on PRs and push to main
- Deployed to Railway: three services (backend, frontend, Postgres), frontend live at public URL

## What's next

Phase 3 — Application Development. Start with auth (registration, login, JWT).

## Key decisions made

- Python 3.14 (system version), `uv` for package management, `pyproject.toml` not `requirements.txt`
- Node 26, standard `node:26-slim` Docker base image for frontend
- `ghcr.io/astral-sh/uv:python3.14-trixie-slim` as backend base image
- Serial integers deferred — ID type decision not yet made
- Tiles are first-class DB entities (one row per unique word), referenced by poems via a join table (schema design deferred to Phase 3)
- CSS Modules for styling (no decision needed at scaffold time, Vite supports out of the box)
- Railway chosen over AWS/Terraform for hosting (simpler, faster to set up at this stage)
- Two-env approach: `.env` uses `db` hostname for Docker services, `.env.local` uses `localhost` for host-side tools like Alembic
