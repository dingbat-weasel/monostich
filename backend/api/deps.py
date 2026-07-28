from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends, Request
from psycopg import AsyncConnection

from db.types import Pool

async def get_pool(request: Request) -> Pool:
    return request.state.pool

async def get_conn(pool: Annotated[Pool, Depends(get_pool)]) -> AsyncGenerator[AsyncConnection]:
    async with pool.connection() as conn:
        yield conn
