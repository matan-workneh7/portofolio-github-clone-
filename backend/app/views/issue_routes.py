"""
Issue API routes
"""
from typing import Optional
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.controllers.issue_controller import IssueController
from app.models.issue import IssueStatus
from app.schemas.issue_schema import IssueCreate, IssueUpdate, IssueResponse, IssueList

router = APIRouter(prefix="/repos/{repo_id}/issues", tags=["Issues"])


@router.get("", response_model=IssueList)
def get_issues(
    repo_id: int, 
    status: Optional[IssueStatus] = Query(None, description="Filter by issue status"),
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all issues for a repository"""
    issues, total = IssueController.get_by_repository(
        db, repo_id, status_filter=status, skip=skip, limit=limit
    )
    return {"issues": issues, "total": total}


@router.get("/{issue_id}", response_model=IssueResponse)
def get_issue(repo_id: int, issue_id: int, db: Session = Depends(get_db)):
    """Get an issue by ID"""
    return IssueController.get_by_id(db, issue_id)


@router.post("", response_model=IssueResponse, status_code=status.HTTP_201_CREATED)
def create_issue(repo_id: int, issue_data: IssueCreate, db: Session = Depends(get_db)):
    """Create a new issue"""
    return IssueController.create(db, repo_id, issue_data)


@router.put("/{issue_id}", response_model=IssueResponse)
def update_issue(repo_id: int, issue_id: int, issue_data: IssueUpdate, db: Session = Depends(get_db)):
    """Update an existing issue"""
    return IssueController.update(db, issue_id, issue_data)


@router.delete("/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_issue(repo_id: int, issue_id: int, db: Session = Depends(get_db)):
    """Delete an issue"""
    IssueController.delete(db, issue_id)
    return None
