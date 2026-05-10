# syntax=docker/dockerfile:1

FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim

WORKDIR /app
# copy env dependencies into image
COPY pyproject.toml uv.lock ./

# disable dev dependencies
ENV UV_NO_DEV=1

# sync project into a new environment, asserting the lockfile is up to date
RUN uv sync --locked

# copy rest of dependencies
COPY . .

ENV PATH="/app/.venv/bin:$PATH"


CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]