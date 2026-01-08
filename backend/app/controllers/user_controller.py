"""
User controller - Business logic for user operations
"""
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate


class UserController:
    """Controller for user-related operations"""
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> tuple[List[User], int]:
        """Get all users with pagination"""
        total = db.query(User).count()
        users = db.query(User).offset(skip).limit(limit).all()
        return users, total
    
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User:
        """Get a user by ID"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id {user_id} not found"
            )
        return user
    
    @staticmethod
    def get_by_username(db: Session, username: str) -> User:
        """Get a user by username"""
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with username '{username}' not found"
            )
        return user
    
    @staticmethod
    def create(db: Session, user_data: UserCreate) -> User:
        """Create a new user"""
        # Check for existing username or email
        existing = db.query(User).filter(
            (User.username == user_data.username) | (User.email == user_data.email)
        ).first()
        
        if existing:
            if existing.username == user_data.username:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already exists"
                )
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )
        
        user = User(**user_data.model_dump())
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def update(db: Session, user_id: int, user_data: UserUpdate) -> User:
        """Update an existing user"""
        user = UserController.get_by_id(db, user_id)
        
        update_data = user_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        
        try:
            db.commit()
            db.refresh(user)
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already exists"
            )
        
        return user
    
    @staticmethod
    def delete(db: Session, user_id: int) -> bool:
        """Delete a user"""
        user = UserController.get_by_id(db, user_id)
        db.delete(user)
        db.commit()
        return True
