from psycopg import AsyncConnection
from psycopg.errors import UniqueViolation

from core.errors import EmailAlreadyRegistered, InvalidCredentials, UsernameTaken
from core.security import create_access_token, hash_password, verify_password
from db import users
from domain.user import User
from schemas.user import UserCreate, UserLogin

# SECURITY: hash against a dummy so the "no such user" path costs the same
# as a wrong-password path. Without this, response timing reveals which
# emails have accounts. Do not remove.
_DUMMY_HASH = hash_password("timing-equalization-placeholder")


async def register(conn: AsyncConnection, data: UserCreate) -> User:
    hashed = hash_password(data.password)

    try:
        async with conn.transaction():
            user = await users.create(
                conn,
                username=data.username,
                email=data.email,
                hashed_password=hashed,
            )
    except UniqueViolation as exc:
        # SECURITY: this potentially leaks active emails during brute-force registration
        match exc.diag.constraint_name:
            case "ix_users_email":
                raise EmailAlreadyRegistered from exc
            case "ix_users_username":
                raise UsernameTaken from exc
            case _:
                raise

    return user


async def login(conn: AsyncConnection, data: UserLogin) -> str:
    credentials = await users.get_credentials_by_email(conn, data.email)

    if credentials is None:
        verify_password(data.password, _DUMMY_HASH)
        raise InvalidCredentials

    if not verify_password(data.password, credentials.hashed_password):
        raise InvalidCredentials

    return create_access_token(credentials.id)
