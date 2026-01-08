"""
Repository API routes
"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.controllers.repository_controller import RepositoryController
from app.schemas.repository_schema import (
    RepositoryCreate, 
    RepositoryUpdate, 
    RepositoryResponse, 
    RepositoryList
)

router = APIRouter(prefix="/repos", tags=["Repositories"])


@router.get("", response_model=RepositoryList)
def get_repositories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all public repositories with pagination"""
    repos, total = RepositoryController.get_all(db, skip=skip, limit=limit)
    
    # Add stars count to each repo
    repos_with_stars = []
    for repo in repos:
        repo_dict = {
            "id": repo.id,
            "name": repo.name,
            "description": repo.description,
            "owner_id": repo.owner_id,
            "owner": repo.owner,
            "is_public": repo.is_public,
            "created_at": repo.created_at,
            "updated_at": repo.updated_at,
            "stars_count": RepositoryController.get_stars_count(db, repo.id)
        }
        repos_with_stars.append(repo_dict)
    
    return {"repositories": repos_with_stars, "total": total}


@router.get("/{repo_id}", response_model=RepositoryResponse)
def get_repository(repo_id: int, db: Session = Depends(get_db)):
    """Get a repository by ID"""
    repo = RepositoryController.get_by_id(db, repo_id)
    return {
        "id": repo.id,
        "name": repo.name,
        "description": repo.description,
        "owner_id": repo.owner_id,
        "owner": repo.owner,
        "is_public": repo.is_public,
        "created_at": repo.created_at,
        "updated_at": repo.updated_at,
        "stars_count": RepositoryController.get_stars_count(db, repo.id)
    }


@router.get("/user/{user_id}", response_model=RepositoryList)
def get_user_repositories(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all repositories for a user"""
    repos, total = RepositoryController.get_by_user(db, user_id, skip=skip, limit=limit)
    
    repos_with_stars = []
    for repo in repos:
        repo_dict = {
            "id": repo.id,
            "name": repo.name,
            "description": repo.description,
            "owner_id": repo.owner_id,
            "owner": repo.owner,
            "is_public": repo.is_public,
            "created_at": repo.created_at,
            "updated_at": repo.updated_at,
            "stars_count": RepositoryController.get_stars_count(db, repo.id)
        }
        repos_with_stars.append(repo_dict)
    
    return {"repositories": repos_with_stars, "total": total}


@router.post("", response_model=RepositoryResponse, status_code=status.HTTP_201_CREATED)
def create_repository(repo_data: RepositoryCreate, db: Session = Depends(get_db)):
    """Create a new repository"""
    repo = RepositoryController.create(db, repo_data)
    return {
        "id": repo.id,
        "name": repo.name,
        "description": repo.description,
        "owner_id": repo.owner_id,
        "owner": repo.owner,
        "is_public": repo.is_public,
        "created_at": repo.created_at,
        "updated_at": repo.updated_at,
        "stars_count": 0
    }


@router.put("/{repo_id}", response_model=RepositoryResponse)
def update_repository(repo_id: int, repo_data: RepositoryUpdate, db: Session = Depends(get_db)):
    """Update an existing repository"""
    repo = RepositoryController.update(db, repo_id, repo_data)
    return {
        "id": repo.id,
        "name": repo.name,
        "description": repo.description,
        "owner_id": repo.owner_id,
        "owner": repo.owner,
        "is_public": repo.is_public,
        "created_at": repo.created_at,
        "updated_at": repo.updated_at,
        "stars_count": RepositoryController.get_stars_count(db, repo.id)
    }


@router.delete("/{repo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_repository(repo_id: int, db: Session = Depends(get_db)):
    """Delete a repository"""
    RepositoryController.delete(db, repo_id)
    return None


@router.post("/{repo_id}/star", status_code=status.HTTP_201_CREATED)
def star_repository(repo_id: int, user_id: int, db: Session = Depends(get_db)):
    """Star a repository"""
    RepositoryController.star(db, user_id, repo_id)
    return {"message": "Repository starred successfully"}


@router.delete("/{repo_id}/star", status_code=status.HTTP_204_NO_CONTENT)
def unstar_repository(repo_id: int, user_id: int, db: Session = Depends(get_db)):
    """Unstar a repository"""
    RepositoryController.unstar(db, user_id, repo_id)
    return None


@router.get("/user/{user_id}/starred", response_model=RepositoryList)
def get_starred_repositories(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get repositories starred by a user"""
    repos, total = RepositoryController.get_starred_by_user(db, user_id, skip=skip, limit=limit)
    
    repos_with_stars = []
    for repo in repos:
        repo_dict = {
            "id": repo.id,
            "name": repo.name,
            "description": repo.description,
            "owner_id": repo.owner_id,
            "owner": repo.owner,
            "is_public": repo.is_public,
            "created_at": repo.created_at,
            "updated_at": repo.updated_at,
            "stars_count": RepositoryController.get_stars_count(db, repo.id)
        }
        repos_with_stars.append(repo_dict)
    
    return {"repositories": repos_with_stars, "total": total}
