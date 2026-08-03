from uuid import UUID

from psycopg import AsyncConnection
from psycopg.rows import class_row

from domain.user import User, UserCredentials


async def create(
    conn: AsyncConnection, *, username: str, email: str, hashed_password: str
) -> User:
    async with conn.cursor(row_factory=class_row(User)) as cur:
        await cur.execute(
            """
            INSERT INTO users (username, email, hashed_password)
            VALUES (%s, %s, %s)
            RETURNING id, username, email, created_at
            """,
            (username, email, hashed_password),
        )
        row = await cur.fetchone()
        assert row is not None
        return row


async def get_by_email(conn: AsyncConnection, email: str) -> User | None:
    async with conn.cursor(row_factory=class_row(User)) as cur:
        await cur.execute(
            """
            SELECT id, username, email, created_at
            FROM users
            WHERE email = %s
            """,
            (email,),
        )
        return await cur.fetchone()


async def get_credentials_by_email(
    conn: AsyncConnection, email: str
) -> UserCredentials | None:
    async with conn.cursor(row_factory=class_row(UserCredentials)) as cur:
        await cur.execute(
            """
                SELECT id, hashed_password
                FROM users
                WHERE email = %s
                """,
            (email,),
        )
        return await cur.fetchone()


async def get_by_id(conn: AsyncConnection, user_id: UUID) -> User | None:
    async with conn.cursor(row_factory=class_row(User)) as cur:
        await cur.execute(
            """
                SELECT id, username, email, created_at
                FROM users
                WHERE id = %s
                """,
            (user_id,),
        )
        return await cur.fetchone()
