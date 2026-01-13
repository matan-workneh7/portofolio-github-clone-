"""Repository controller - business logic for repositories."""
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.repository import Repository
from app.models.user import User
from app.schemas.repository_schema import RepositoryCreate, RepositoryUpdate


def get_repository(db: Session, repo_id: int) -> Repository:
    """Get a repository by ID."""
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repo


def get_repositories(db: Session, skip: int = 0, limit: int = 100, owner_id: int = None) -> list[Repository]:
    """Get all repositories with optional filtering by owner."""
    query = db.query(Repository)
    if owner_id:
        query = query.filter(Repository.owner_id == owner_id)
    return query.offset(skip).limit(limit).all()


def create_repository(db: Session, repo: RepositoryCreate) -> Repository:
    """Create a new repository."""
    # Verify owner exists
    owner = db.query(User).filter(User.id == repo.owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Owner not found")
    
    # Check if repository name already exists for this owner
    existing = db.query(Repository).filter(
        Repository.owner_id == repo.owner_id,
        Repository.name == repo.name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Repository name already exists for this owner")
    
    try:
        db_repo = Repository(**repo.model_dump())
        db.add(db_repo)
        db.commit()
        db.refresh(db_repo)
        return db_repo
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Failed to create repository")


def update_repository(db: Session, repo_id: int, repo_update: RepositoryUpdate) -> Repository:
    """Update a repository."""
    db_repo = get_repository(db, repo_id)
    update_data = repo_update.model_dump(exclude_unset=True)
    
    # Check name uniqueness if name is being updated
    if "name" in update_data:
        existing = db.query(Repository).filter(
            Repository.owner_id == db_repo.owner_id,
            Repository.name == update_data["name"],
            Repository.id != repo_id
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Repository name already exists for this owner")
    
    try:
        for key, value in update_data.items():
            setattr(db_repo, key, value)
        db.commit()
        db.refresh(db_repo)
        return db_repo
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Failed to update repository")


def delete_repository(db: Session, repo_id: int) -> None:
    """Delete a repository."""
    db_repo = get_repository(db, repo_id)
    db.delete(db_repo)
    db.commit()
