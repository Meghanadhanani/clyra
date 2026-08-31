import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:password@localhost:5432/clyra",
)

# Keep this secret only in .env. Never commit a real production secret.
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-local-development-secret")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "180"))
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
