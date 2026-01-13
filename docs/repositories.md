# Repositories Feature

## Overview

The Repositories feature allows users to create, view, update, and delete repositories. Each repository belongs to a user (owner) and can be public or private.

## Backend Implementation

### Models

**File**: `backend/app/models/repository.py`

- `id`: Primary key
- `name`: Repository name (unique per owner)
- `description`: Optional description
- `owner_id`: Foreign key to User
- `is_public`: Boolean flag for visibility
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Controllers

**File**: `backend/app/controllers/repository_controller.py`

- `get_repository(db, repo_id)`: Get repository by ID
- `get_repositories(db, skip, limit, owner_id)`: Get all repositories with optional owner filter
- `create_repository(db, repo)`: Create a new repository
- `update_repository(db, repo_id, repo_update)`: Update repository
- `delete_repository(db, repo_id)`: Delete repository

### API Endpoints

**File**: `backend/app/views/repository_routes.py`

- `POST /api/v1/repositories` - Create repository
- `GET /api/v1/repositories` - List repositories (optional `owner_id` query param)
- `GET /api/v1/repositories/{repo_id}` - Get repository by ID
- `PUT /api/v1/repositories/{repo_id}` - Update repository
- `DELETE /api/v1/repositories/{repo_id}` - Delete repository

### Schemas

**File**: `backend/app/schemas/repository_schema.py`

- `RepositoryCreate`: For creating repositories
- `RepositoryUpdate`: For updating repositories
- `RepositoryResponse`: Response model with owner information

## Frontend Implementation

### Components

**File**: `frontend/src/components/repository/RepositoryCard.tsx`

Displays a repository card with name, description, owner, and visibility badge.

**File**: `frontend/src/components/repository/RepositoryForm.tsx`

Form component for creating and editing repositories.

**File**: `frontend/src/components/repository/StarButton.tsx`

Button component for starring/unstarring repositories.

### Pages

**File**: `frontend/src/pages/Home.tsx`

Main page displaying all repositories with ability to create new ones.

**File**: `frontend/src/pages/Repository.tsx`

Repository detail page showing commits, issues, and repository information.

### Services

**File**: `frontend/src/services/repositoryService.ts`

Service layer for API communication:
- `getAll(skip, limit, ownerId?)`: Get all repositories
- `getById(id)`: Get repository by ID
- `create(repo)`: Create repository
- `update(id, repo)`: Update repository
- `delete(id)`: Delete repository

## Usage Examples

### Creating a Repository

```typescript
import { repositoryService } from '@/services/repositoryService';

const newRepo = await repositoryService.create({
  name: 'my-repo',
  description: 'My awesome repository',
  owner_id: 1,
  is_public: true
});
```

### Listing Repositories

```typescript
// Get all repositories
const repos = await repositoryService.getAll();

// Get repositories by owner
const userRepos = await repositoryService.getAll(0, 100, ownerId);
```

## Relationships

- A repository belongs to one User (owner)
- A repository has many Commits
- A repository has many Issues
- A repository has many Stars
