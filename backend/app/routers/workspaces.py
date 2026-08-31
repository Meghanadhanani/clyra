from fastapi import APIRouter, Depends

from app.dependencies.workspace import get_current_workspace
from app.models.workspace import Workspace
from app.schemas.workspace import CurrentWorkspaceResponse

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
