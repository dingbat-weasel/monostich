from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="ignore")

    database_url: str
    vite_frontend_url: str
    jwt_secret: str


settings = Settings()  # pyright: ignore[reportCallIssue]
