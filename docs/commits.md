# Commits Feature

## Overview

The Commits feature allows users to create and view Git commits for repositories. Each commit is associated with a repository and an author.

## Backend Implementation

### Models

**File**: `backend/app/models/commit.py`

- `id`: Primary key
- `repository_id`: Foreign key to Repository
- `author_id`: Foreign key to User
- `message`: Commit message
- `hash`: Unique commit hash (40 characters)
- `created_at`: Timestamp

### Controllers

**File**: `backend/app/controllers/commit_controller.py`

- `get_commit(db, commit_id)`: Get commit by ID
- `get_commits_by_repository(db, repo_id, skip, limit)`: Get all commits for a repository
- `create_commit(db, commit)`: Create a new commit (generates unique hash)

### API Endpoints

**File**: `backend/app/views/commit_routes.py`

- `POST /api/v1/commits` - Create commit
- `GET /api/v1/commits/{commit_id}` - Get commit by ID
- `GET /api/v1/repositories/{repo_id}/commits` - Get commits for a repository

### Schemas

**File**: `backend/app/schemas/commit_schema.py`

- `CommitCreate`: For creating commits
- `CommitResponse`: Response model with author information

## Frontend Implementation

### Components

**File**: `frontend/src/components/commit/CommitCard.tsx`

Displays a commit card with hash, message, author, and timestamp.

### Pages

**File**: `frontend/src/pages/Repository.tsx`

Shows commit history for a repository.

### Services

**File**: `frontend/src/services/commitService.ts`

Service layer for API communication:
- `getById(id)`: Get commit by ID
- `getByRepository(repoId, skip, limit)`: Get commits for a repository
- `create(commit)`: Create a new commit

## Usage Examples

### Creating a Commit

```typescript
import { commitService } from '@/services/commitService';

const newCommit = await commitService.create({
  repository_id: 1,
  author_id: 1,
  message: 'Initial commit'
});
```

### Getting Repository Commits

```typescript
const commits = await commitService.getByRepository(repoId, 0, 100);
```

## Relationships

- A commit belongs to one Repository
- A commit belongs to one User (author)

## Notes

- Commit hashes are automatically generated using a secure random generator
- Commits are ordered by creation date (newest first) when listing
