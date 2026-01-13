"""User model."""
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    """User model representing a GitHub user."""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    repositories = relationship("Repository", back_populates="owner", cascade="all, delete-orphan")
    commits = relationship("Commit", back_populates="author", cascade="all, delete-orphan")
    issues = relationship("Issue", back_populates="creator", foreign_keys="Issue.creator_id", cascade="all, delete-orphan")
    stars = relationship("Star", back_populates="user", cascade="all, delete-orphan")
