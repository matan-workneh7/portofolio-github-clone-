"""
Commit Pydantic schemas
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class CommitBase(BaseModel):
    """Base commit schema"""
    message: str = Field(..., min_length=1)


class CommitCreate(CommitBase):
    """Schema for creating a new commit"""
    author_id: int
    hash: Optional[str] = None  # Auto-generated if not provided


class AuthorInfo(BaseModel):
    """Embedded author info in commit response"""
    id: int
    username: str
    avatar_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class CommitResponse(CommitBase):
    """Schema for commit response"""
    id: int
    repository_id: int
    author_id: int
    author: Optional[AuthorInfo] = None
    hash: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class CommitList(BaseModel):
    """Schema for list of commits"""
    commits: List[CommitResponse]
    total: int
