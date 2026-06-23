import os
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

VITE_FRONTEND_URL = os.environ.get("VITE_FRONTEND_URL")
if not VITE_FRONTEND_URL:
    raise RuntimeError("VITE_FRONTEND_URL environment variable not set")

origins = [VITE_FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"status": "home"}


@app.get("/health")
async def health(response: Response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"

    return {"status": "ok"}
