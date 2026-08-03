from typing import Annotated

from fastapi import APIRouter, Depends, status
from psycopg import AsyncConnection

from api.deps import get_conn, get_current_user
from domain.user import User
from schemas.user import TokenOut, UserCreate, UserLogin, UserOut
from services import auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    conn: Annotated[AsyncConnection, Depends(get_conn)],
    data: UserCreate,
) -> UserOut:
    user = await auth.register(conn, data)
    return UserOut.model_validate(user)


@router.post("/login")
async def login(
    conn: Annotated[AsyncConnection, Depends(get_conn)],
    data: UserLogin,
) -> TokenOut:
    token = await auth.login(conn, data)
    return TokenOut(access_token=token)


@router.get("/me")
async def me(user: Annotated[User, Depends(get_current_user)]) -> UserOut:
    return UserOut.model_validate(user)
