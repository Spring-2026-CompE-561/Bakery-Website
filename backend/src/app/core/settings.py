from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Bakery API"
    app_version: str = "1.0.0"
    secret_key: str = Field(default="long-secret-bakery-key", description="JWT Secret")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    database_url: str = "sqlite:///./bakery.db"

    class Config:
        env_file = ".env"


settings = Settings()
