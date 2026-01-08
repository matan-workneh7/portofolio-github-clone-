"""
User API routes
"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.controllers.user_controller import UserController
from app.schemas.user_schema import UserCreate, UserUpdate, UserResponse, UserList

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=UserList)
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all users with pagination"""
    users, total = UserController.get_all(db, skip=skip, limit=limit)
    return {"users": users, "total": total}


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a user by ID"""
    return UserController.get_by_id(db, user_id)


@router.get("/username/{username}", response_model=UserResponse)
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    """Get a user by username"""
    return UserController.get_by_username(db, username)


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    return UserController.create(db, user_data)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    """Update an existing user"""
    return UserController.update(db, user_id, user_data)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user"""
    UserController.delete(db, user_id)
    return None
