"""
User Pydantic schemas
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user schema"""
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    """Schema for creating a new user"""
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UserUpdate(BaseModel):
    """Schema for updating a user"""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    """Schema for user response"""
    id: int
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserList(BaseModel):
    """Schema for list of users"""
    users: List[UserResponse]
    total: int
