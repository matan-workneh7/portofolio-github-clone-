"""
Commit model
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Commit(Base):
    """Commit model representing a repository commit"""
    
    __tablename__ = "commits"
    
    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text, nullable=False)
    hash = Column(String(40), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    repository = relationship("Repository", back_populates="commits")
    author = relationship("User", back_populates="commits")
    
    def __repr__(self):
        return f"<Commit(id={self.id}, hash='{self.hash[:7]}')>"
