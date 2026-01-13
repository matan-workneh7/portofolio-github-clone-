"""Issue model."""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class IssueStatus(enum.Enum):
    """Issue status enumeration."""
    OPEN = "open"
    CLOSED = "closed"


class Issue(Base):
    """Issue model representing a repository issue."""
    
    __tablename__ = "issues"
    
    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False, index=True)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(IssueStatus), default=IssueStatus.OPEN, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    repository = relationship("Repository", back_populates="issues")
    creator = relationship("User", back_populates="issues", foreign_keys=[creator_id])
