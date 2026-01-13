"""Repository Pydantic schemas."""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.user_schema import UserResponse


class RepositoryBase(BaseModel):
    """Base repository schema."""
    name: str
    description: Optional[str] = None
    is_public: bool = True


class RepositoryCreate(RepositoryBase):
    """Schema for creating a repository."""
    owner_id: int


class RepositoryUpdate(BaseModel):
    """Schema for updating a repository."""
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None


class RepositoryResponse(RepositoryBase):
    """Schema for repository response."""
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    owner: Optional[UserResponse] = None
    
    class Config:
        from_attributes = True
