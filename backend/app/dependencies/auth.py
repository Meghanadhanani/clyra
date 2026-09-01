from uuid import UUID

import jwt
from fastapi import Cookie, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.errors import AppError
from app.utils.security import decode_access_token


def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
) -> User:
    if access_token is None:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="AUTHENTICATION_REQUIRED",
            message="Please log in to continue",
        )

    try:
        payload = decode_access_token(access_token)
        user_id = UUID(payload["sub"])
        workspace_id = UUID(payload["workspace_id"])
    except (jwt.PyJWTError, KeyError, ValueError):
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="INVALID_OR_EXPIRED_TOKEN",
            message="Your session is invalid or expired. Please log in again",
        )

    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="USER_NOT_AVAILABLE",
            message="Your account is not available. Please log in again",
        )

    if user.workspace_id != workspace_id:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="INVALID_SESSION",
            message="Your session is invalid. Please log in again",
        )

    return user
