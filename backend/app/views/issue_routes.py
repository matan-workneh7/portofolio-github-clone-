"""Issue API routes."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.issue_schema import IssueCreate, IssueUpdate, IssueResponse
from app.controllers import issue_controller

router = APIRouter()


@router.post("/issues", response_model=IssueResponse, status_code=201)
def create_issue(issue: IssueCreate, db: Session = Depends(get_db)):
    """Create a new issue."""
    return issue_controller.create_issue(db, issue)


@router.get("/issues/{issue_id}", response_model=IssueResponse)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    """Get an issue by ID."""
    return issue_controller.get_issue(db, issue_id)


@router.get("/repositories/{repo_id}/issues", response_model=List[IssueResponse])
def get_repository_issues(
    repo_id: int,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Get all issues for a repository."""
    return issue_controller.get_issues_by_repository(db, repo_id, skip, limit, status)


@router.put("/issues/{issue_id}", response_model=IssueResponse)
def update_issue(issue_id: int, issue: IssueUpdate, db: Session = Depends(get_db)):
    """Update an issue."""
    return issue_controller.update_issue(db, issue_id, issue)


@router.delete("/issues/{issue_id}", status_code=204)
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    """Delete an issue."""
    issue_controller.delete_issue(db, issue_id)
    return None
