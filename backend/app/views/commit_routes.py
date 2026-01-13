"""Commit API routes."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.commit_schema import CommitCreate, CommitResponse
from app.controllers import commit_controller

router = APIRouter()


@router.post("/commits", response_model=CommitResponse, status_code=201)
def create_commit(commit: CommitCreate, db: Session = Depends(get_db)):
    """Create a new commit."""
    return commit_controller.create_commit(db, commit)


@router.get("/commits/{commit_id}", response_model=CommitResponse)
def get_commit(commit_id: int, db: Session = Depends(get_db)):
    """Get a commit by ID."""
    return commit_controller.get_commit(db, commit_id)


@router.get("/repositories/{repo_id}/commits", response_model=List[CommitResponse])
def get_repository_commits(
    repo_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all commits for a repository."""
    return commit_controller.get_commits_by_repository(db, repo_id, skip, limit)
