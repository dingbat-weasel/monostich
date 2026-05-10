# Monostich — Project Context

## What this project is

A social media site where users compose single-line poems (monostichs) by dragging and placing word tiles, like magnetic poetry. Functionally mirrors Twitter at a basic level. Goal: 1000 active users. Built for learning fundamental software engineering skills.

See `principles.md`, `architecture.md`, and `gameplan.md` for full planning documentation.

## Current state

**Phase 1 — Local Foundation: complete**

- `backend/` — FastAPI app with `/health` endpoint, CORS configured for `localhost:5173`, running via uvicorn in Docker
- `frontend/` — Vite + React + TypeScript scaffold, fetches `/health` and renders response
- `compose.yaml` — three services: `backend`, `frontend`, `db` (Postgres), all running with `docker compose up`
- Python environment managed with `uv`, `pyproject.toml` as source of truth
- `.vscode/settings.json` points VS Code at `backend/.venv`

## What's next

- Alembic setup and first migration (`users` table)
- Then Phase 2: infrastructure and CI/CD pipeline

## Key decisions made

- Python 3.14 (system version), `uv` for package management, `pyproject.toml` not `requirements.txt`
- Node 26, standard `node:26-slim` Docker base image for frontend
- `ghcr.io/astral-sh/uv:python3.14-trixie-slim` as backend base image
- Serial integers deferred — ID type decision not yet made
- Tiles are first-class DB entities (one row per unique word), referenced by poems via a join table (schema design deferred to Phase 3)
- CSS Modules for styling (no decision needed at scaffold time, Vite supports out of the box)
