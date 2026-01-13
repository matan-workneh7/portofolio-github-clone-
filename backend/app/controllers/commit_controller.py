"""Commit controller - business logic for commits."""
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.commit import Commit
from app.models.repository import Repository
from app.models.user import User
from app.schemas.commit_schema import CommitCreate
from app.utils.helpers import generate_commit_hash


def get_commit(db: Session, commit_id: int) -> Commit:
    """Get a commit by ID."""
    commit = db.query(Commit).filter(Commit.id == commit_id).first()
    if not commit:
        raise HTTPException(status_code=404, detail="Commit not found")
    return commit


def get_commits_by_repository(db: Session, repo_id: int, skip: int = 0, limit: int = 100) -> list[Commit]:
    """Get all commits for a repository."""
    # Verify repository exists
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    return db.query(Commit).filter(Commit.repository_id == repo_id).order_by(Commit.created_at.desc()).offset(skip).limit(limit).all()


def create_commit(db: Session, commit: CommitCreate) -> Commit:
    """Create a new commit."""
    # Verify repository exists
    repo = db.query(Repository).filter(Repository.id == commit.repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    # Verify author exists
    author = db.query(User).filter(User.id == commit.author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    
    # Generate unique commit hash
    commit_hash = generate_commit_hash()
    # Ensure hash is unique (very unlikely collision, but check anyway)
    while db.query(Commit).filter(Commit.hash == commit_hash).first():
        commit_hash = generate_commit_hash()
    
    db_commit = Commit(
        repository_id=commit.repository_id,
        author_id=commit.author_id,
        message=commit.message,
        hash=commit_hash
    )
    db.add(db_commit)
    db.commit()
    db.refresh(db_commit)
    return db_commit
