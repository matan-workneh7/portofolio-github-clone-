"""
User model
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    """User model representing a GitHub-like user"""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    repositories = relationship("Repository", back_populates="owner", cascade="all, delete-orphan")
    commits = relationship("Commit", back_populates="author", cascade="all, delete-orphan")
    issues = relationship("Issue", back_populates="creator", cascade="all, delete-orphan")
    stars = relationship("Star", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"
