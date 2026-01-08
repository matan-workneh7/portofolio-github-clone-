"""
Issue Pydantic schemas
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.issue import IssueStatus


class IssueBase(BaseModel):
    """Base issue schema"""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None


class IssueCreate(IssueBase):
    """Schema for creating a new issue"""
    creator_id: int


class IssueUpdate(BaseModel):
    """Schema for updating an issue"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[IssueStatus] = None


class CreatorInfo(BaseModel):
    """Embedded creator info in issue response"""
    id: int
    username: str
    avatar_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class IssueResponse(IssueBase):
    """Schema for issue response"""
    id: int
    repository_id: int
    creator_id: int
    creator: Optional[CreatorInfo] = None
    status: IssueStatus
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class IssueList(BaseModel):
    """Schema for list of issues"""
    issues: List[IssueResponse]
    total: int
