"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.views import (
    user_routes,
    repository_routes,
    commit_routes,
    issue_routes,
    search_routes,
    star_routes
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="A GitHub clone API for portfolio project"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router, prefix=settings.API_V1_PREFIX, tags=["users"])
app.include_router(repository_routes.router, prefix=settings.API_V1_PREFIX, tags=["repositories"])
app.include_router(commit_routes.router, prefix=settings.API_V1_PREFIX, tags=["commits"])
app.include_router(issue_routes.router, prefix=settings.API_V1_PREFIX, tags=["issues"])
app.include_router(search_routes.router, prefix=settings.API_V1_PREFIX, tags=["search"])
app.include_router(star_routes.router, prefix=settings.API_V1_PREFIX, tags=["stars"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "GitHub Clone API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
