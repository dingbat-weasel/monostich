from psycopg import AsyncConnection
from psycopg.errors import UniqueViolation

from core.errors import EmailAlreadyRegistered, UsernameTaken
from core.security import hash_password
from db import users
from schemas.user import UserCreate, UserOut


async def register(conn: AsyncConnection, data: UserCreate) -> UserOut:
    try:
        async with conn.transaction():
            row = await users.create(
                conn,
                username=data.username,
                email=data.email,
                hashed_password=hash_password(data.password),
            )
    except UniqueViolation as exc:
        constraint = exc.diag.constraint_name or ""
        if "email" in constraint:
            raise EmailAlreadyRegistered from exc
        if "username" in constraint:
            raise UsernameTaken from exc
        raise

    return UserOut(
        id=row.id, username=row.username, email=row.email, created_at=row.created_at
    )
