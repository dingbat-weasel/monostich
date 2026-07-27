from typing import Annotated

from fastapi import APIRouter, Depends, status
from psycopg import AsyncConnection

from api.deps import get_conn
from schemas.user import UserCreate, UserOut
from services import auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(
    data: UserCreate,
    conn: Annotated[AsyncConnection, Depends(get_conn)],
) -> UserOut:
    return await auth.register(conn, data)
