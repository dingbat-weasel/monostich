from dataclasses import dataclass
from datetime import datetime
from uuid import UUID

from psycopg import AsyncConnection
from psycopg.rows import class_row


@dataclass
class UserRow:
    id: UUID
    username: str
    email: str
    hashed_password: str
    created_at: datetime


async def get_by_email(conn: AsyncConnection, email: str) -> UserRow | None:
    async with conn.cursor(row_factory=class_row(UserRow)) as cur:
        await cur.execute(
            """
            SELECT id, username, email, hashed_password, created_at
            FROM users
            WHERE email = %s
            """,
            (email,),
        )
        return await cur.fetchone()


async def create(
    conn: AsyncConnection, username: str, email: str, hashed_password: str
) -> UserRow:
    async with conn.cursor(row_factory=class_row(UserRow)) as cur:
        await cur.execute(
            """
            INSERT INTO USERS (username, email, hashed_password)
            VALUES (%s, %s, %s)
            RETURNING id, username, email, hashed_password, created_at
            """,
            (username, email, hashed_password),
        )
        row = await cur.fetchone()
        assert row is not None
        return row
