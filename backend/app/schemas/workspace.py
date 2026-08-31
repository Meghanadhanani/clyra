from pydantic import BaseModel

from app.schemas.user import WorkspaceResponse


class CurrentWorkspaceResponse(BaseModel):
    data: WorkspaceResponse
    message: str
