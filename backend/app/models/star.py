"""
Star model
"""
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base


class Star(Base):
    """Star model representing a user starring a repository"""
    
    __tablename__ = "stars"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Unique constraint to prevent duplicate stars
    __table_args__ = (
        UniqueConstraint('user_id', 'repository_id', name='unique_user_repo_star'),
    )
    
    # Relationships
    user = relationship("User", back_populates="stars")
    repository = relationship("Repository", back_populates="stars")
    
    def __repr__(self):
        return f"<Star(user_id={self.user_id}, repository_id={self.repository_id})>"
