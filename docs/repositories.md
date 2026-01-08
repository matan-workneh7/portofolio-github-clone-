# Repositories Feature

## Overview
Repositories are the core entity of the application. Users can create, view, edit, and delete repositories.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/repos` | List all public repositories |
| GET | `/repos/{id}` | Get repository by ID |
| GET | `/repos/user/{user_id}` | Get repositories by user |
| POST | `/repos` | Create a new repository |
| PUT | `/repos/{id}` | Update a repository |
| DELETE | `/repos/{id}` | Delete a repository |

## Request/Response Examples

### Create Repository
```json
POST /repos
{
  "name": "my-project",
  "description": "A cool project",
  "owner_id": 1,
  "is_public": true
}
```

### Response
```json
{
  "id": 1,
  "name": "my-project",
  "description": "A cool project",
  "owner_id": 1,
  "owner": {
    "id": 1,
    "username": "johndoe",
    "avatar_url": null
  },
  "is_public": true,
  "created_at": "2024-01-08T12:00:00",
  "updated_at": "2024-01-08T12:00:00",
  "stars_count": 0
}
```

## Frontend Components

- `RepositoryCard` - Displays repository preview with owner info
- `RepositoryPage` - Full repository view with tabs (code, commits, issues)
- `NewRepository` - Form to create new repositories
