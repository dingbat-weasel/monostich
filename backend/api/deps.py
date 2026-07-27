from collections.abc import AsyncGenerator
from psycopg import AsyncConnection
from db.pool import pool


async def get_conn() -> AsyncGenerator[AsyncConnection]:
    async with pool.connection() as conn:
        yield conn
