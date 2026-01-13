"""Repository API routes."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.repository_schema import RepositoryCreate, RepositoryUpdate, RepositoryResponse
from app.controllers import repository_controller

router = APIRouter()


@router.post("/repositories", response_model=RepositoryResponse, status_code=201)
def create_repository(repo: RepositoryCreate, db: Session = Depends(get_db)):
    """Create a new repository."""
    return repository_controller.create_repository(db, repo)


@router.get("/repositories", response_model=List[RepositoryResponse])
def get_repositories(
    skip: int = 0,
    limit: int = 100,
    owner_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """Get all repositories, optionally filtered by owner."""
    return repository_controller.get_repositories(db, skip, limit, owner_id)


@router.get("/repositories/{repo_id}", response_model=RepositoryResponse)
def get_repository(repo_id: int, db: Session = Depends(get_db)):
    """Get a repository by ID."""
    return repository_controller.get_repository(db, repo_id)


@router.put("/repositories/{repo_id}", response_model=RepositoryResponse)
def update_repository(repo_id: int, repo: RepositoryUpdate, db: Session = Depends(get_db)):
    """Update a repository."""
    return repository_controller.update_repository(db, repo_id, repo)


@router.delete("/repositories/{repo_id}", status_code=204)
def delete_repository(repo_id: int, db: Session = Depends(get_db)):
    """Delete a repository."""
    repository_controller.delete_repository(db, repo_id)
    return None
