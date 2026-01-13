"""Search controller - business logic for search."""
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.user import User
from app.models.repository import Repository


def search_users(db: Session, query: str, skip: int = 0, limit: int = 20) -> list[User]:
    """Search users by username or email."""
    search_term = f"%{query.lower()}%"
    # Use func.lower for case-insensitive search (MySQL compatible)
    return db.query(User).filter(
        or_(
            func.lower(User.username).like(search_term),
            func.lower(User.email).like(search_term)
        )
    ).offset(skip).limit(limit).all()


def search_repositories(db: Session, query: str, skip: int = 0, limit: int = 20) -> list[Repository]:
    """Search repositories by name or description."""
    search_term = f"%{query.lower()}%"
    # Use func.lower for case-insensitive search (MySQL compatible)
    return db.query(Repository).filter(
        or_(
            func.lower(Repository.name).like(search_term),
            func.lower(Repository.description).like(search_term)
        )
    ).offset(skip).limit(limit).all()
