# Profiles Feature

## Overview
User profiles display user information, their repositories, and starred repositories.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/{id}` | Get user by ID |
| GET | `/users/username/{username}` | Get user by username |
| POST | `/users` | Create a new user |
| PUT | `/users/{id}` | Update a user |
| DELETE | `/users/{id}` | Delete a user |

## Request/Response Examples

### Create User
```json
POST /users
{
  "username": "johndoe",
  "email": "john@example.com",
  "bio": "Full-stack developer",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

### Response
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "bio": "Full-stack developer",
  "avatar_url": "https://example.com/avatar.jpg",
  "created_at": "2024-01-08T12:00:00"
}
```

## Frontend Components

- `ProfileHeader` - Gradient banner with avatar and stats
- `Profile` page - Tabs for repositories and starred repos
