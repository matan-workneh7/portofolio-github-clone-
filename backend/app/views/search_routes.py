"""
Search API routes
"""
from typing import Literal, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.controllers.search_controller import SearchController
from app.schemas.user_schema import UserResponse
from app.schemas.repository_schema import RepositoryResponse

router = APIRouter(prefix="/search", tags=["Search"])


class SearchResults(BaseModel):
    """Search results response model"""
    users: List[UserResponse]
    users_total: int
    repositories: List[RepositoryResponse]
    repositories_total: int


@router.get("", response_model=SearchResults)
def search(
    q: str = Query(..., description="Search query", min_length=1),
    type: Literal["all", "users", "repositories"] = Query("all", description="Type of search"),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Search for users and repositories"""
    results = SearchController.search(db, q, search_type=type, skip=skip, limit=limit)
    
    # Format repositories with stars count
    repos_with_stars = []
    for repo in results["repositories"]:
        from app.controllers.repository_controller import RepositoryController
        repos_with_stars.append({
            "id": repo.id,
            "name": repo.name,
            "description": repo.description,
            "owner_id": repo.owner_id,
            "owner": repo.owner,
            "is_public": repo.is_public,
            "created_at": repo.created_at,
            "updated_at": repo.updated_at,
            "stars_count": RepositoryController.get_stars_count(db, repo.id)
        })
    
    return {
        "users": results["users"],
        "users_total": results["users_total"],
        "repositories": repos_with_stars,
        "repositories_total": results["repositories_total"]
    }
