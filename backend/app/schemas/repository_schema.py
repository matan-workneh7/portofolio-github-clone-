"""
Repository Pydantic schemas
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class RepositoryBase(BaseModel):
    """Base repository schema"""
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    is_public: bool = True


class RepositoryCreate(RepositoryBase):
    """Schema for creating a new repository"""
    owner_id: int


class RepositoryUpdate(BaseModel):
    """Schema for updating a repository"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    is_public: Optional[bool] = None


class OwnerInfo(BaseModel):
    """Embedded owner info in repository response"""
    id: int
    username: str
    avatar_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class RepositoryResponse(RepositoryBase):
    """Schema for repository response"""
    id: int
    owner_id: int
    owner: Optional[OwnerInfo] = None
    created_at: datetime
    updated_at: datetime
    stars_count: int = 0
    
    class Config:
        from_attributes = True


class RepositoryList(BaseModel):
    """Schema for list of repositories"""
    repositories: List[RepositoryResponse]
    total: int
