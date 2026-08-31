from fastapi import APIRouter, Cookie, Depends, Response, status
from sqlalchemy.orm import Session

from app.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    COOKIE_SECURE,
    REFRESH_TOKEN_EXPIRE_DAYS,
)
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.user import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
    SignupResponse,
    UserCreate,
)
from app.services.auth_service import AuthService
from app.services.refresh_session_service import RefreshSessionService
from app.utils.errors import AppError
from app.utils.security import create_access_token

router = APIRouter(tags=["Auth"])


def set_auth_cookies(response: Response, user: User, workspace_id: str, refresh_token: str) -> None:
    access_token = create_access_token(str(user.id), workspace_id, user.role)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )


def auth_response(user: User, workspace, message: str) -> dict:
    return {
        "data": {"user": user, "workspace": workspace},
        "message": message,
    }


@router.post(
    "/auth/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def signup(payload: UserCreate, response: Response, db: Session = Depends(get_db)):
    existing = AuthService.get_user_by_email(db, payload.email)
    if existing:
        raise AppError(
            status_code=status.HTTP_409_CONFLICT,
            code="EMAIL_ALREADY_EXISTS",
            message="This email is already registered",
        )

    try:
        user, workspace = AuthService.create_user(db, payload)
        refresh_token = RefreshSessionService.create(db, user.id)
        db.commit()
        set_auth_cookies(response, user, str(workspace.id), refresh_token)
        return auth_response(user, workspace, "Account created and login successful")
    except Exception:
        db.rollback()
        raise


@router.post(
    "/auth/login",
    response_model=LoginResponse,
    summary="Log in with email and password",
)
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = AuthService.get_user_by_email(db, payload.email)

    if user is None or not AuthService.verify_password(payload.password, user.password_hash):
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="INVALID_CREDENTIALS",
            message="Email or password is incorrect",
        )
    if not user.is_active:
        raise AppError(
            status_code=status.HTTP_403_FORBIDDEN,
            code="ACCOUNT_INACTIVE",
            message="This account is inactive",
        )

    workspace = AuthService.get_workspace_for_user(db, user)
    if workspace is None:
        raise AppError(
            status_code=status.HTTP_409_CONFLICT,
            code="WORKSPACE_NOT_FOUND",
            message="This account does not have a workspace yet",
        )

    refresh_token = RefreshSessionService.create(db, user.id)
    db.commit()
    set_auth_cookies(response, user, str(workspace.id), refresh_token)
    return auth_response(user, workspace, "Login successful")


@router.post(
    "/auth/refresh",
    response_model=LoginResponse,
    summary="Refresh an expired access-token session",
)
def refresh_session(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
):
    if refresh_token is None:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="REFRESH_TOKEN_REQUIRED",
            message="Please log in again",
        )

    session = RefreshSessionService.get_active(db, refresh_token)
    if session is None:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="INVALID_OR_EXPIRED_REFRESH_TOKEN",
            message="Your session has expired. Please log in again",
        )

    user = db.get(User, session.user_id)
    if user is None or not user.is_active:
        raise AppError(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="USER_NOT_AVAILABLE",
            message="Please log in again",
        )

    workspace = AuthService.get_workspace_for_user(db, user)
    if workspace is None:
        raise AppError(
            status_code=status.HTTP_409_CONFLICT,
            code="WORKSPACE_NOT_FOUND",
            message="This account does not have a workspace yet",
        )

    new_refresh_token = RefreshSessionService.rotate(db, session)
    set_auth_cookies(response, user, str(workspace.id), new_refresh_token)
    return auth_response(user, workspace, "Session refreshed")


@router.get(
    "/auth/me",
    response_model=CurrentUserResponse,
    summary="Get the currently logged-in user",
)
def get_me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    workspace = AuthService.get_workspace_for_user(db, user)
    if workspace is None:
        raise AppError(
            status_code=status.HTTP_409_CONFLICT,
            code="WORKSPACE_NOT_FOUND",
            message="This account does not have a workspace yet",
        )
    return auth_response(user, workspace, "Current user fetched")


@router.post(
    "/auth/logout",
    summary="Log out the current browser session",
)
def logout(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
):
    if refresh_token is not None:
        RefreshSessionService.revoke(db, refresh_token)

    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
    )
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
    )
    return {"data": None, "message": "Logged out"}
