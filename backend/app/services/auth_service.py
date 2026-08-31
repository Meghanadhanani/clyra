import bcrypt
import re
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.workspace import Workspace
from app.models.workspace_member import WorkspaceMember
from app.schemas.user import UserCreate


class AuthService:
    """Handles user registration logic."""

    @staticmethod
    def hash_password(password: str) -> str:
        pwd_bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_workspace_for_user(db: Session, user: User) -> Workspace | None:
        if user.workspace_id is None:
            return None
        return db.query(Workspace).filter(Workspace.id == user.workspace_id).first()

    @staticmethod
    def make_unique_slug(db: Session, workspace_name: str) -> str:
        base_slug = re.sub(r"[^a-z0-9]+", "-", workspace_name.lower()).strip("-")
        base_slug = base_slug or "workspace"
        slug = base_slug
        number = 2

        while db.query(Workspace).filter(Workspace.slug == slug).first():
            slug = f"{base_slug}-{number}"
            number += 1

        return slug

    @classmethod
    def create_user(cls, db: Session, payload: UserCreate) -> tuple[User, Workspace]:
        workspace = Workspace(
            name=payload.workspace_name,
            slug=cls.make_unique_slug(db, payload.workspace_name),
            plan="free",
        )
        db.add(workspace)
        db.flush()

        user = User(
            workspace_id=workspace.id,
            name=payload.name,
            email=payload.email,
            password_hash=cls.hash_password(payload.password),
            role="owner",
        )
        db.add(user)
        db.flush()

        db.add(WorkspaceMember(workspace_id=workspace.id, user_id=user.id, role="owner"))
        db.commit()
        db.refresh(user)
        return user, workspace
