"""Search API routes."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.user_schema import UserResponse
from app.schemas.repository_schema import RepositoryResponse
from app.controllers import search_controller

router = APIRouter()


@router.get("/search/users", response_model=List[UserResponse])
def search_users(
    q: str = Query(..., description="Search query"),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Search users by username or email."""
    return search_controller.search_users(db, q, skip, limit)


@router.get("/search/repositories", response_model=List[RepositoryResponse])
def search_repositories(
    q: str = Query(..., description="Search query"),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Search repositories by name or description."""
    return search_controller.search_repositories(db, q, skip, limit)
