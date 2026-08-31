from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.config import ACCESS_TOKEN_EXPIRE_MINUTES, COOKIE_SECURE
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
from app.utils.errors import AppError
from app.utils.security import create_access_token

router = APIRouter(tags=["Auth"])


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
       
        access_token = create_access_token(str(user.id), str(workspace.id), user.role)
        response.set_cookie(
         key="access_token",
         value=access_token,
         httponly=True,
         secure=COOKIE_SECURE,
         samesite="lax",
         max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )
        return {
            "data": {"user": user, "workspace": workspace},
            "message": "Account created",
        }
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

    access_token = create_access_token(str(user.id), str(workspace.id), user.role)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {
        "data": {"user": user, "workspace": workspace},
        "message": "Login successful",
    }


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

    return {
        "data": {"user": user, "workspace": workspace},
        "message": "Current user fetched",
    }
