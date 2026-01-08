# Commits Feature

## Overview
Commits track changes within a repository. Each commit has an author, message, and unique hash.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/repos/{id}/commits` | List commits for a repository |
| GET | `/repos/{id}/commits/{commit_id}` | Get commit by ID |
| POST | `/repos/{id}/commits` | Create a new commit |

## Request/Response Examples

### Create Commit
```json
POST /repos/1/commits
{
  "author_id": 1,
  "message": "feat: add new feature"
}
```

### Response
```json
{
  "id": 1,
  "repository_id": 1,
  "author_id": 1,
  "author": {
    "id": 1,
    "username": "johndoe",
    "avatar_url": null
  },
  "message": "feat: add new feature",
  "hash": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  "created_at": "2024-01-08T12:00:00"
}
```

## Frontend Components

- `CommitCard` - Displays commit with author and relative time
- Commit list integrated in `RepositoryPage` tabs
