from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import SignupResponse, UserCreate
from app.services.auth_service import AuthService
from app.utils.errors import AppError

router = APIRouter(tags=["Auth"])


@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user account.

    - **name**: 2-120 characters
    - **email**: valid email address (must be unique)
    - **password**: 8-128 characters
    """
    existing = AuthService.get_user_by_email(db, payload.email)
    if existing:
        raise AppError(
            status_code=status.HTTP_409_CONFLICT,
            code="EMAIL_ALREADY_EXISTS",
            message="This email is already registered",
        )

    try:
        user, workspace = AuthService.create_user(db, payload)
        return {
            "data": {"user": user, "workspace": workspace},
            "message": "Account created",
        }
    except Exception:
        db.rollback()
        raise
