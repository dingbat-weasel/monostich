from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass(frozen=True, slots=True)
class User:
    id: UUID
    username: str
    email: str
    created_at: datetime


@dataclass(frozen=True, slots=True)
class UserCredentials:
    id: UUID
    hashed_password: str
