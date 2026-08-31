import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from uuid import UUID

from sqlalchemy.orm import Session

from app.config import REFRESH_TOKEN_EXPIRE_DAYS
from app.models.refresh_session import RefreshSession


class RefreshSessionService:
    @staticmethod
    def hash_token(token: str) -> str:
        return hashlib.sha256(token.encode("utf-8")).hexdigest()

    @staticmethod
    def create(db: Session, user_id: UUID) -> str:
        """Save only a hash. The raw token goes to the browser once."""
        raw_token = secrets.token_urlsafe(48)
        session = RefreshSession(
            user_id=user_id,
            token_hash=RefreshSessionService.hash_token(raw_token),
            expires_at=datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        )
        db.add(session)
        return raw_token

    @staticmethod
    def get_active(db: Session, raw_token: str) -> RefreshSession | None:
        session = (
            db.query(RefreshSession)
            .filter(RefreshSession.token_hash == RefreshSessionService.hash_token(raw_token))
            .first()
        )
        if session is None or session.revoked_at is not None:
            return None
        if session.expires_at <= datetime.now(timezone.utc):
            return None
        return session

    @staticmethod
    def revoke(db: Session, raw_token: str) -> None:
        session = RefreshSessionService.get_active(db, raw_token)
        if session is not None:
            session.revoked_at = datetime.now(timezone.utc)
            db.commit()

    @staticmethod
    def rotate(db: Session, session: RefreshSession) -> str:
        session.revoked_at = datetime.now(timezone.utc)
        new_token = RefreshSessionService.create(db, session.user_id)
        db.commit()
        return new_token
