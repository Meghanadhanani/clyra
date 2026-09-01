from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_tables
from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.workspaces import router as workspace_router
from app.utils.errors import AppError, app_error_handler

app = FastAPI(title="CLYRA API", version="1.0.0")
app.add_exception_handler(AppError, app_error_handler)

import os

origins_env = os.getenv("CORS_ORIGINS")
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
if origins_env:
    allowed_origins.extend([origin.strip() for origin in origins_env.split(",") if origin.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|.*\.local)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    create_tables()

@app.get("/")
def health_check() -> dict:
    return {"msg": "Server is up & running"}


app.include_router(auth_router, prefix="/api/v1")
app.include_router(workspace_router, prefix="/api/v1")
