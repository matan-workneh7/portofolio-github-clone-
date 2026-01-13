"""Issue controller - business logic for issues."""
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.issue import Issue
from app.models.repository import Repository
from app.models.user import User
from app.schemas.issue_schema import IssueCreate, IssueUpdate


def get_issue(db: Session, issue_id: int) -> Issue:
    """Get an issue by ID."""
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue


def get_issues_by_repository(db: Session, repo_id: int, skip: int = 0, limit: int = 100, status: str = None) -> list[Issue]:
    """Get all issues for a repository with optional status filter."""
    # Verify repository exists
    repo = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    query = db.query(Issue).filter(Issue.repository_id == repo_id)
    if status:
        query = query.filter(Issue.status == status)
    return query.order_by(Issue.created_at.desc()).offset(skip).limit(limit).all()


def create_issue(db: Session, issue: IssueCreate) -> Issue:
    """Create a new issue."""
    # Verify repository exists
    repo = db.query(Repository).filter(Repository.id == issue.repository_id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    # Verify creator exists
    creator = db.query(User).filter(User.id == issue.creator_id).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
    
    db_issue = Issue(**issue.model_dump())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue


def update_issue(db: Session, issue_id: int, issue_update: IssueUpdate) -> Issue:
    """Update an issue."""
    db_issue = get_issue(db, issue_id)
    update_data = issue_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_issue, key, value)
    db.commit()
    db.refresh(db_issue)
    return db_issue


def delete_issue(db: Session, issue_id: int) -> None:
    """Delete an issue."""
    db_issue = get_issue(db, issue_id)
    db.delete(db_issue)
    db.commit()
