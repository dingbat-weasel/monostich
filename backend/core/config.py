from pydantic import SecretStr, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="ignore")

    database_url: PostgresDsn
    frontend_url: str
    jwt_secret: SecretStr


settings = Settings()  # pyright: ignore[reportCallIssue]
