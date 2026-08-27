from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import check_database_connection, get_db

router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        check_database_connection()
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Database is not connected",
        ) from exc
