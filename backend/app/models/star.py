"""Star model."""
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Star(Base):
    """Star model representing a user's star on a repository."""
    
    __tablename__ = "stars"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="stars")
    repository = relationship("Repository", back_populates="stars")
    
    # Ensure a user can only star a repository once
    __table_args__ = (
        UniqueConstraint('user_id', 'repository_id', name='unique_user_repo_star'),
    )
