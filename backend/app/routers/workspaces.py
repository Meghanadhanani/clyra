from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.dependencies.workspace import get_current_workspace
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.workspace import CurrentWorkspaceResponse, WorkspaceUpdateRequest
from app.utils.errors import AppError

router = APIRouter(tags=["Workspaces"])


@router.get(
    "/workspaces/current",
    response_model=CurrentWorkspaceResponse,
    summary="Get the authenticated user's workspace",
)
def get_workspace(workspace: Workspace = Depends(get_current_workspace)):
    return {
        "data": workspace,
        "message": "Current workspace fetched",
    }


@router.patch(
    "/workspaces/current",
    response_model=CurrentWorkspaceResponse,
    summary="Update the authenticated user's workspace",
)
def update_workspace(
    payload: WorkspaceUpdateRequest,
    workspace: Workspace = Depends(get_current_workspace),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.role != "owner":
        raise AppError(
            status_code=status.HTTP_403_FORBIDDEN,
            code="FORBIDDEN",
            message="Only workspace owners can update workspace settings",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(workspace, field, value)

    if update_data:
        db.add(workspace)
        db.commit()
        db.refresh(workspace)

    return {
        "data": workspace,
        "message": "Workspace updated successfully",
    }

