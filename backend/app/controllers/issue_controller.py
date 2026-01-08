"""
Issue controller - Business logic for issue operations
"""
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status

from app.models.issue import Issue, IssueStatus
from app.models.repository import Repository
from app.models.user import User
from app.schemas.issue_schema import IssueCreate, IssueUpdate


class IssueController:
    """Controller for issue-related operations"""
    
    @staticmethod
    def get_by_repository(
        db: Session, 
        repo_id: int, 
        status_filter: Optional[IssueStatus] = None,
        skip: int = 0, 
        limit: int = 100
    ) -> tuple[List[Issue], int]:
        """Get all issues for a repository"""
        # Verify repo exists
        repo = db.query(Repository).filter(Repository.id == repo_id).first()
        if not repo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Repository with id {repo_id} not found"
            )
        
        query = db.query(Issue).filter(Issue.repository_id == repo_id)
        
        if status_filter:
            query = query.filter(Issue.status == status_filter)
        
        query = query.order_by(Issue.created_at.desc())
        total = query.count()
        issues = query.options(joinedload(Issue.creator)).offset(skip).limit(limit).all()
        return issues, total
    
    @staticmethod
    def get_by_id(db: Session, issue_id: int) -> Issue:
        """Get an issue by ID"""
        issue = db.query(Issue).options(
            joinedload(Issue.creator)
        ).filter(Issue.id == issue_id).first()
        
        if not issue:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Issue with id {issue_id} not found"
            )
        return issue
    
    @staticmethod
    def create(db: Session, repo_id: int, issue_data: IssueCreate) -> Issue:
        """Create a new issue"""
        # Verify repo exists
        repo = db.query(Repository).filter(Repository.id == repo_id).first()
        if not repo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Repository with id {repo_id} not found"
            )
        
        # Verify creator exists
        creator = db.query(User).filter(User.id == issue_data.creator_id).first()
        if not creator:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Creator with id {issue_data.creator_id} not found"
            )
        
        issue = Issue(
            repository_id=repo_id,
            creator_id=issue_data.creator_id,
            title=issue_data.title,
            description=issue_data.description
        )
        
        db.add(issue)
        db.commit()
        db.refresh(issue)
        
        # Load the creator relationship
        db.refresh(issue, ['creator'])
        return issue
    
    @staticmethod
    def update(db: Session, issue_id: int, issue_data: IssueUpdate) -> Issue:
        """Update an existing issue"""
        issue = IssueController.get_by_id(db, issue_id)
        
        update_data = issue_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(issue, field, value)
        
        db.commit()
        db.refresh(issue)
        return issue
    
    @staticmethod
    def delete(db: Session, issue_id: int) -> bool:
        """Delete an issue"""
        issue = IssueController.get_by_id(db, issue_id)
        db.delete(issue)
        db.commit()
        return True
