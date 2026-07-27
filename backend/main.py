from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.v1.auth import router as auth_router
from core.config import settings
from core.errors import DomainError
from db.pool import pool


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    async with pool:
        await pool.wait(timeout=10)
        yield


app = FastAPI(title="monostich", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.vite_frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.exception_handler(DomainError)
async def handle_domain_error(request: Request, exc: DomainError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code, content={"error": exc.message, "code": exc.code}
    )


app.include_router(auth_router, prefix="/api/v1")


@app.get("/health")
async def health(response: Response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"

    return {"status": "ok"}
