# Stars Feature

## Overview

The Stars feature allows users to star (bookmark) repositories they find interesting. Users can star/unstar repositories and view their starred repositories.

## Backend Implementation

### Models

**File**: `backend/app/models/star.py`

- `id`: Primary key
- `user_id`: Foreign key to User
- `repository_id`: Foreign key to Repository
- `created_at`: Timestamp
- Unique constraint on `(user_id, repository_id)` to prevent duplicate stars

### Controllers

**File**: `backend/app/controllers/star_controller.py`

- `star_repository(db, user_id, repository_id)`: Star a repository
- `unstar_repository(db, user_id, repository_id)`: Unstar a repository
- `is_starred(db, user_id, repository_id)`: Check if repository is starred
- `get_starred_repositories(db, user_id, skip, limit)`: Get all repositories starred by a user
- `get_repository_stars_count(db, repository_id)`: Get star count for a repository

### API Endpoints

**File**: `backend/app/views/star_routes.py`

- `POST /api/v1/users/{user_id}/stars/{repository_id}` - Star a repository
- `DELETE /api/v1/users/{user_id}/stars/{repository_id}` - Unstar a repository
- `GET /api/v1/users/{user_id}/stars` - Get starred repositories
- `GET /api/v1/repositories/{repository_id}/stars/count` - Get star count
- `GET /api/v1/users/{user_id}/stars/{repository_id}/check` - Check if starred

### Schemas

Uses existing `RepositoryResponse` schema for starred repositories list.

## Frontend Implementation

### Components

**File**: `frontend/src/components/repository/StarButton.tsx`

Interactive button component that:
- Shows current star status
- Allows toggling star/unstar
- Updates UI immediately on click

### Services

**File**: `frontend/src/services/starService.ts`

Service layer for API communication:
- `star(userId, repositoryId)`: Star a repository
- `unstar(userId, repositoryId)`: Unstar a repository
- `getStarred(userId, skip, limit)`: Get starred repositories
- `getStarsCount(repositoryId)`: Get star count
- `isStarred(userId, repositoryId)`: Check if starred

## Usage Examples

### Starring a Repository

```typescript
import { starService } from '@/services/starService';

await starService.star(userId, repositoryId);
```

### Unstarring a Repository

```typescript
await starService.unstar(userId, repositoryId);
```

### Getting Starred Repositories

```typescript
const starred = await starService.getStarred(userId, 0, 100);
```

### Checking Star Status

```typescript
const isStarred = await starService.isStarred(userId, repositoryId);
```

### Getting Star Count

```typescript
const count = await starService.getStarsCount(repositoryId);
```

## Relationships

- A star belongs to one User
- A star belongs to one Repository
- Many-to-many relationship between Users and Repositories through Stars

## Notes

- Each user can only star a repository once (enforced by unique constraint)
- Star button automatically checks and updates star status
- Star count can be displayed on repository cards
- Starred repositories can be viewed on user profile pages
