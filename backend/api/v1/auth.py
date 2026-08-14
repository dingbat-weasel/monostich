from fastapi import APIRouter, status

from api.deps import ConnDep, CurrentUserDep
from schemas.user import TokenOut, UserCreate, UserLogin, UserOut
from services import auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    conn: ConnDep,
    data: UserCreate,
) -> UserOut:
    user = await auth.register(conn, data)
    return UserOut.model_validate(user)


@router.post("/login")
async def login(
    conn: ConnDep,
    data: UserLogin,
) -> TokenOut:
    token = await auth.login(conn, data)
    return TokenOut(access_token=token)


@router.get("/me")
async def me(user: CurrentUserDep) -> UserOut:
    return UserOut.model_validate(user)
