# Search Feature

## Overview
Search allows finding users and repositories by name or description.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search` | Search users and repositories |

## Query Parameters
- `q` (required) - Search query
- `type` - Filter: `all`, `users`, or `repositories`
- `skip` - Pagination offset
- `limit` - Results per page

## Request/Response Examples

### Search Request
```
GET /search?q=react&type=all
```

### Response
```json
{
  "users": [
    {
      "id": 1,
      "username": "reactdev",
      "email": "react@example.com",
      "bio": "React specialist",
      "avatar_url": null,
      "created_at": "2024-01-08T12:00:00"
    }
  ],
  "users_total": 1,
  "repositories": [
    {
      "id": 1,
      "name": "react-app",
      "description": "A React application",
      "owner_id": 1,
      "is_public": true,
      "stars_count": 5
    }
  ],
  "repositories_total": 1
}
```

## Frontend Components

- `SearchBar` - Input with type filter dropdown
- `Search` page - Displays user and repository results
