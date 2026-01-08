"""
Commit API routes
"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.controllers.commit_controller import CommitController
from app.schemas.commit_schema import CommitCreate, CommitResponse, CommitList

router = APIRouter(prefix="/repos/{repo_id}/commits", tags=["Commits"])


@router.get("", response_model=CommitList)
def get_commits(repo_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all commits for a repository"""
    commits, total = CommitController.get_by_repository(db, repo_id, skip=skip, limit=limit)
    return {"commits": commits, "total": total}


@router.get("/{commit_id}", response_model=CommitResponse)
def get_commit(repo_id: int, commit_id: int, db: Session = Depends(get_db)):
    """Get a commit by ID"""
    return CommitController.get_by_id(db, commit_id)


@router.post("", response_model=CommitResponse, status_code=status.HTTP_201_CREATED)
def create_commit(repo_id: int, commit_data: CommitCreate, db: Session = Depends(get_db)):
    """Create a new commit"""
    return CommitController.create(db, repo_id, commit_data)
