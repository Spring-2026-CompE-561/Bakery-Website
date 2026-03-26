# data serialization using pydantic

from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

import os

DOTENV = os.path.join(os.path.dirname(__file__), '.env')

class Settings(BaseSettings):
    app_name: str = "Bakery API"
    app_version: str = "1.0.0"
    secret_key: str = Field(default="long-secret-bakery-key", description="JWT Secret")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    database_url: str = "sqlite:///./bakery.db"

    # https://docs.pydantic.dev/latest/concepts/pydantic_settings/
    # class-based 'config' is no more
    model_config = SettingsConfigDict(env_file=DOTENV, extra='ignore') # specify .env file for env variables


settings = Settings()
