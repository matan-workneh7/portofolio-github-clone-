"""Issue Pydantic schemas."""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.issue import IssueStatus
from app.schemas.user_schema import UserResponse


class IssueBase(BaseModel):
    """Base issue schema."""
    title: str
    description: Optional[str] = None
    status: IssueStatus = IssueStatus.OPEN


class IssueCreate(IssueBase):
    """Schema for creating an issue."""
    repository_id: int
    creator_id: int


class IssueUpdate(BaseModel):
    """Schema for updating an issue."""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[IssueStatus] = None


class IssueResponse(IssueBase):
    """Schema for issue response."""
    id: int
    repository_id: int
    creator_id: int
    created_at: datetime
    updated_at: datetime
    creator: Optional[UserResponse] = None
    
    class Config:
        from_attributes = True
