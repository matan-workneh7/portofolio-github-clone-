"""Star controller - business logic for stars."""
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.star import Star
from app.models.repository import Repository
from app.models.user import User


def star_repository(db: Session, user_id: int, repository_id: int) -> Star:
    """Star a repository."""
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify repository exists
    repo = db.query(Repository).filter(Repository.id == repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    # Check if already starred
    existing = db.query(Star).filter(
        Star.user_id == user_id,
        Star.repository_id == repository_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Repository already starred")
    
    try:
        star = Star(user_id=user_id, repository_id=repository_id)
        db.add(star)
        db.commit()
        db.refresh(star)
        return star
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Failed to star repository")


def unstar_repository(db: Session, user_id: int, repository_id: int) -> None:
    """Unstar a repository."""
    star = db.query(Star).filter(
        Star.user_id == user_id,
        Star.repository_id == repository_id
    ).first()
    
    if not star:
        raise HTTPException(status_code=404, detail="Star not found")
    
    db.delete(star)
    db.commit()


def is_starred(db: Session, user_id: int, repository_id: int) -> bool:
    """Check if a repository is starred by a user."""
    star = db.query(Star).filter(
        Star.user_id == user_id,
        Star.repository_id == repository_id
    ).first()
    return star is not None


def get_starred_repositories(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> list[Repository]:
    """Get all repositories starred by a user."""
    return db.query(Repository).join(Star).filter(
        Star.user_id == user_id
    ).offset(skip).limit(limit).all()


def get_repository_stars_count(db: Session, repository_id: int) -> int:
    """Get the number of stars for a repository."""
    return db.query(Star).filter(Star.repository_id == repository_id).count()
