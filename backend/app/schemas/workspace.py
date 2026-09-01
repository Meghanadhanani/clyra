from pydantic import BaseModel, Field

from app.schemas.user import WorkspaceResponse


class WorkspaceUpdateRequest(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=120)
    ai_system_prompt: str | None = Field(None, max_length=2000)


class CurrentWorkspaceResponse(BaseModel):
    data: WorkspaceResponse
    message: str

