"""
Repository controller - Business logic for repository operations
"""
from typing import List
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status

from app.models.repository import Repository
from app.models.star import Star
from app.models.user import User
from app.schemas.repository_schema import RepositoryCreate, RepositoryUpdate


class RepositoryController:
    """Controller for repository-related operations"""
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> tuple[List[Repository], int]:
        """Get all public repositories with pagination"""
        query = db.query(Repository).filter(Repository.is_public == True)
        total = query.count()
        repos = query.options(joinedload(Repository.owner)).offset(skip).limit(limit).all()
        return repos, total
    
    @staticmethod
    def get_by_id(db: Session, repo_id: int) -> Repository:
        """Get a repository by ID"""
        repo = db.query(Repository).options(
            joinedload(Repository.owner)
        ).filter(Repository.id == repo_id).first()
        
        if not repo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Repository with id {repo_id} not found"
            )
        return repo
    
    @staticmethod
    def get_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> tuple[List[Repository], int]:
        """Get repositories by user ID"""
        # Verify user exists
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id {user_id} not found"
            )
        
        query = db.query(Repository).filter(Repository.owner_id == user_id)
        total = query.count()
        repos = query.options(joinedload(Repository.owner)).offset(skip).limit(limit).all()
        return repos, total
    
    @staticmethod
    def create(db: Session, repo_data: RepositoryCreate) -> Repository:
        """Create a new repository"""
        # Verify owner exists
        owner = db.query(User).filter(User.id == repo_data.owner_id).first()
        if not owner:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Owner with id {repo_data.owner_id} not found"
            )
        
        # Check for duplicate name for this owner
        existing = db.query(Repository).filter(
            Repository.owner_id == repo_data.owner_id,
            Repository.name == repo_data.name
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Repository with this name already exists for this user"
            )
        
        repo = Repository(**repo_data.model_dump())
        db.add(repo)
        db.commit()
        db.refresh(repo)
        
        # Load the owner relationship
        db.refresh(repo, ['owner'])
        return repo
    
    @staticmethod
    def update(db: Session, repo_id: int, repo_data: RepositoryUpdate) -> Repository:
        """Update an existing repository"""
        repo = RepositoryController.get_by_id(db, repo_id)
        
        update_data = repo_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(repo, field, value)
        
        db.commit()
        db.refresh(repo)
        return repo
    
    @staticmethod
    def delete(db: Session, repo_id: int) -> bool:
        """Delete a repository"""
        repo = RepositoryController.get_by_id(db, repo_id)
        db.delete(repo)
        db.commit()
        return True
    
    @staticmethod
    def get_stars_count(db: Session, repo_id: int) -> int:
        """Get the star count for a repository"""
        return db.query(Star).filter(Star.repository_id == repo_id).count()
    
    @staticmethod
    def star(db: Session, user_id: int, repo_id: int) -> bool:
        """Star a repository"""
        # Verify repo exists
        RepositoryController.get_by_id(db, repo_id)
        
        # Check if already starred
        existing = db.query(Star).filter(
            Star.user_id == user_id,
            Star.repository_id == repo_id
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Repository already starred"
            )
        
        star = Star(user_id=user_id, repository_id=repo_id)
        db.add(star)
        db.commit()
        return True
    
    @staticmethod
    def unstar(db: Session, user_id: int, repo_id: int) -> bool:
        """Unstar a repository"""
        star = db.query(Star).filter(
            Star.user_id == user_id,
            Star.repository_id == repo_id
        ).first()
        
        if not star:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Star not found"
            )
        
        db.delete(star)
        db.commit()
        return True
    
    @staticmethod
    def get_starred_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> tuple[List[Repository], int]:
        """Get repositories starred by a user"""
        query = db.query(Repository).join(Star).filter(Star.user_id == user_id)
        total = query.count()
        repos = query.options(joinedload(Repository.owner)).offset(skip).limit(limit).all()
        return repos, total
