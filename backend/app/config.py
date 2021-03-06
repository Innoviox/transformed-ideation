from pathlib import Path
from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "Flashable"
    DEBUG_MODE: bool = False


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str
    DB_NAME: str


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass

# Loads env variables from .env file
settings = Settings(_env_file='../.env', _env_file_encoding='utf-8')