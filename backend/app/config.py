from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_HOST: str = "localhost"
    POSTGRES_DB: str = "mydb"
    POSTGRES_USER: str = "user"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_PORT: int = 5432
    ALLOWED_ORIGINS: list = ["*"]

    class Config:
        env_file = ".env"


settings = Settings()
