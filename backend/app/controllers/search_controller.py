"""
Search controller - Business logic for search operations
"""
from typing import List, Literal
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_

from app.models.user import User
from app.models.repository import Repository


class SearchController:
    """Controller for search-related operations"""
    
    @staticmethod
    def search(
        db: Session,
        query: str,
        search_type: Literal["all", "users", "repositories"] = "all",
        skip: int = 0,
        limit: int = 20
    ) -> dict:
        """
        Search for users and/or repositories
        Returns a dict with 'users' and 'repositories' lists
        """
        results = {
            "users": [],
            "users_total": 0,
            "repositories": [],
            "repositories_total": 0
        }
        
        if not query:
            return results
        
        search_term = f"%{query}%"
        
        # Search users
        if search_type in ["all", "users"]:
            user_query = db.query(User).filter(
                or_(
                    User.username.ilike(search_term),
                    User.bio.ilike(search_term)
                )
            )
            results["users_total"] = user_query.count()
            results["users"] = user_query.offset(skip).limit(limit).all()
        
        # Search repositories
        if search_type in ["all", "repositories"]:
            repo_query = db.query(Repository).filter(
                Repository.is_public == True,
                or_(
                    Repository.name.ilike(search_term),
                    Repository.description.ilike(search_term)
                )
            )
            results["repositories_total"] = repo_query.count()
            results["repositories"] = repo_query.options(
                joinedload(Repository.owner)
            ).offset(skip).limit(limit).all()
        
        return results
