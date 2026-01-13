"""Star API routes."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.repository_schema import RepositoryResponse
from app.controllers import star_controller

router = APIRouter()


@router.post("/users/{user_id}/stars/{repository_id}", status_code=201)
def star_repository(user_id: int, repository_id: int, db: Session = Depends(get_db)):
    """Star a repository."""
    star = star_controller.star_repository(db, user_id, repository_id)
    return {"message": "Repository starred successfully", "star_id": star.id}


@router.delete("/users/{user_id}/stars/{repository_id}", status_code=204)
def unstar_repository(user_id: int, repository_id: int, db: Session = Depends(get_db)):
    """Unstar a repository."""
    star_controller.unstar_repository(db, user_id, repository_id)
    return None


@router.get("/users/{user_id}/stars", response_model=List[RepositoryResponse])
def get_starred_repositories(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all repositories starred by a user."""
    return star_controller.get_starred_repositories(db, user_id, skip, limit)


@router.get("/repositories/{repository_id}/stars/count")
def get_repository_stars_count(repository_id: int, db: Session = Depends(get_db)):
    """Get the number of stars for a repository."""
    count = star_controller.get_repository_stars_count(db, repository_id)
    return {"repository_id": repository_id, "stars_count": count}


@router.get("/users/{user_id}/stars/{repository_id}/check")
def check_starred(user_id: int, repository_id: int, db: Session = Depends(get_db)):
    """Check if a repository is starred by a user."""
    is_starred = star_controller.is_starred(db, user_id, repository_id)
    return {"is_starred": is_starred}
