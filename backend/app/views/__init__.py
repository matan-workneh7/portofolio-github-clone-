"""
Views (API routes) package
"""
from app.views.user_routes import router as user_router
from app.views.repository_routes import router as repository_router
from app.views.commit_routes import router as commit_router
from app.views.issue_routes import router as issue_router
from app.views.search_routes import router as search_router

__all__ = [
    "user_router",
    "repository_router",
    "commit_router",
    "issue_router",
    "search_router",
]
