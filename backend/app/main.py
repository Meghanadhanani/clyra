from fastapi import FastAPI

from app.database import create_tables
from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.workspaces import router as workspace_router
from app.utils.errors import AppError, app_error_handler

app = FastAPI(title="CLYRA API", version="1.0.0")
app.add_exception_handler(AppError, app_error_handler)


@app.on_event("startup")
def startup() -> None:
    create_tables()


app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(workspace_router, prefix="/api/v1")
