from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from psycopg import AsyncConnection

from core.errors import InvalidCredentials
from core.security import decode_access_token
from db import users
from db.types import Pool
from domain.user import User

_bearer = HTTPBearer(auto_error=False)


async def get_pool(request: Request) -> Pool:
    return request.state.pool


async def get_conn(
    pool: Annotated[Pool, Depends(get_pool)],
) -> AsyncGenerator[AsyncConnection]:
    async with pool.connection() as conn:
        yield conn


async def get_current_user(
    conn: Annotated[AsyncConnection, Depends(get_conn)],
    authorization: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> User:
    if authorization is None:
        raise InvalidCredentials

    user_id = decode_access_token(authorization.credentials)
    user = await users.get_by_id(conn, user_id)
    if user is None:
        raise InvalidCredentials

    return user
