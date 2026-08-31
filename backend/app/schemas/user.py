import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    """Schema for sign-up request body."""

    name: str = Field(..., min_length=2, max_length=120, examples=["Jane Doe"])
    email: EmailStr = Field(..., examples=["jane@example.com"])
    password: str = Field(..., min_length=8, max_length=128, examples=["Str0ng!Pass"])
    workspace_name: str = Field(..., min_length=2, max_length=120, examples=["StyleCart"])

    @field_validator("name", "workspace_name", mode="before")
    @classmethod
    def trim_text_fields(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("password")
    @classmethod
    def reject_outer_password_spaces(cls, value: str) -> str:
        if value != value.strip():
            raise ValueError("Password cannot start or end with spaces")
        return value

class LoginRequest(BaseModel):
    email: EmailStr = Field(..., examples=["john@example.com"])
    password: str = Field(..., min_length=1, max_length=128)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower() if isinstance(value, str) else value


class UserResponse(BaseModel):
    """Schema for sign-up response (never exposes password)."""

    id: uuid.UUID
    name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class WorkspaceResponse(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    plan: str

    model_config = {"from_attributes": True}


class SignupData(BaseModel):
    user: UserResponse
    workspace: WorkspaceResponse


class SignupResponse(BaseModel):
    data: SignupData
    message: str


class LoginResponse(BaseModel):
    data: SignupData
    message: str


class CurrentUserResponse(BaseModel):
    data: SignupData
    message: str
