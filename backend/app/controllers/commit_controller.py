"""
Commit controller - Business logic for commit operations
"""
import secrets
from typing import List
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status

from app.models.commit import Commit
from app.models.repository import Repository
from app.models.user import User
from app.schemas.commit_schema import CommitCreate


class CommitController:
    """Controller for commit-related operations"""
    
    @staticmethod
    def get_by_repository(db: Session, repo_id: int, skip: int = 0, limit: int = 100) -> tuple[List[Commit], int]:
        """Get all commits for a repository"""
        # Verify repo exists
        repo = db.query(Repository).filter(Repository.id == repo_id).first()
        if not repo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Repository with id {repo_id} not found"
            )
        
        query = db.query(Commit).filter(Commit.repository_id == repo_id).order_by(Commit.created_at.desc())
        total = query.count()
        commits = query.options(joinedload(Commit.author)).offset(skip).limit(limit).all()
        return commits, total
    
    @staticmethod
    def get_by_id(db: Session, commit_id: int) -> Commit:
        """Get a commit by ID"""
        commit = db.query(Commit).options(
            joinedload(Commit.author)
        ).filter(Commit.id == commit_id).first()
        
        if not commit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Commit with id {commit_id} not found"
            )
        return commit
    
    @staticmethod
    def create(db: Session, repo_id: int, commit_data: CommitCreate) -> Commit:
        """Create a new commit"""
        # Verify repo exists
        repo = db.query(Repository).filter(Repository.id == repo_id).first()
        if not repo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Repository with id {repo_id} not found"
            )
        
        # Verify author exists
        author = db.query(User).filter(User.id == commit_data.author_id).first()
        if not author:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Author with id {commit_data.author_id} not found"
            )
        
        # Generate hash if not provided
        commit_hash = commit_data.hash or secrets.token_hex(20)
        
        commit = Commit(
            repository_id=repo_id,
            author_id=commit_data.author_id,
            message=commit_data.message,
            hash=commit_hash
        )
        
        db.add(commit)
        db.commit()
        db.refresh(commit)
        
        # Load the author relationship
        db.refresh(commit, ['author'])
        return commit
