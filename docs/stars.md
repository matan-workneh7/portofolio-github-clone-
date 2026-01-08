# Stars Feature

## Overview
Stars allow users to bookmark repositories they find interesting.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/repos/{id}/star?user_id=1` | Star a repository |
| DELETE | `/repos/{id}/star?user_id=1` | Unstar a repository |
| GET | `/repos/user/{user_id}/starred` | Get starred repositories |

## Request/Response Examples

### Star Repository
```
POST /repos/1/star?user_id=1
```

### Get Starred Repositories
```
GET /repos/user/1/starred
```

### Response
```json
{
  "repositories": [
    {
      "id": 1,
      "name": "awesome-project",
      "description": "An awesome project",
      "owner_id": 2,
      "is_public": true,
      "stars_count": 10
    }
  ],
  "total": 1
}
```

## Frontend Components

- `StarButton` - Interactive star toggle with count
- Stars count displayed on `RepositoryCard`
- Starred tab on user `Profile` page
