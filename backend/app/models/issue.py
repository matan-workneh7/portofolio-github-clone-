"""
Issue model
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class IssueStatus(str, enum.Enum):
    """Issue status enumeration"""
    OPEN = "open"
    CLOSED = "closed"


class Issue(Base):
    """Issue model representing a repository issue"""
    
    __tablename__ = "issues"
    
    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(IssueStatus), default=IssueStatus.OPEN, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    repository = relationship("Repository", back_populates="issues")
    creator = relationship("User", back_populates="issues")
    
    def __repr__(self):
        return f"<Issue(id={self.id}, title='{self.title[:30]}')>"
