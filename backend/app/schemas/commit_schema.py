"""Commit Pydantic schemas."""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.user_schema import UserResponse


class CommitBase(BaseModel):
    """Base commit schema."""
    message: str


class CommitCreate(CommitBase):
    """Schema for creating a commit."""
    repository_id: int
    author_id: int


class CommitResponse(CommitBase):
    """Schema for commit response."""
    id: int
    repository_id: int
    author_id: int
    hash: str
    created_at: datetime
    author: Optional[UserResponse] = None
    
    class Config:
        from_attributes = True
