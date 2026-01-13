# Profiles Feature

## Overview

The Profiles feature allows users to view user profiles with their information, repositories, and activity.

## Backend Implementation

### Models

**File**: `backend/app/models/user.py`

- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `bio`: Optional biography
- `avatar_url`: Optional avatar image URL
- `created_at`: Timestamp

### Controllers

**File**: `backend/app/controllers/user_controller.py`

- `get_user(db, user_id)`: Get user by ID
- `get_user_by_username(db, username)`: Get user by username
- `get_users(db, skip, limit)`: Get all users with pagination
- `create_user(db, user)`: Create a new user
- `update_user(db, user_id, user_update)`: Update user
- `delete_user(db, user_id)`: Delete user

### API Endpoints

**File**: `backend/app/views/user_routes.py`

- `POST /api/v1/users` - Create user
- `GET /api/v1/users` - List users
- `GET /api/v1/users/{user_id}` - Get user by ID
- `GET /api/v1/users/username/{username}` - Get user by username
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

### Schemas

**File**: `backend/app/schemas/user_schema.py`

- `UserCreate`: For creating users
- `UserUpdate`: For updating users
- `UserResponse`: Response model

## Frontend Implementation

### Components

**File**: `frontend/src/components/profile/ProfileHeader.tsx`

Displays user profile header with avatar, username, email, and bio.

### Pages

**File**: `frontend/src/pages/Profile.tsx`

Profile page showing user information and their repositories.

### Services

**File**: `frontend/src/services/userService.ts`

Service layer for API communication:
- `getAll(skip, limit)`: Get all users
- `getById(id)`: Get user by ID
- `getByUsername(username)`: Get user by username
- `create(user)`: Create user
- `update(id, user)`: Update user
- `delete(id)`: Delete user

## Usage Examples

### Creating a User

```typescript
import { userService } from '@/services/userService';

const newUser = await userService.create({
  username: 'johndoe',
  email: 'john@example.com',
  bio: 'Software developer',
  avatar_url: 'https://example.com/avatar.jpg'
});
```

### Getting User Profile

```typescript
const user = await userService.getByUsername('johndoe');
```

### Getting User Repositories

```typescript
import { repositoryService } from '@/services/repositoryService';

const userRepos = await repositoryService.getAll(0, 100, userId);
```

## Relationships

- A user has many Repositories
- A user has many Commits (as author)
- A user has many Issues (as creator)
- A user has many Stars

## Notes

- No authentication system - users can be created directly
- Username and email must be unique
- Profile pages are accessible via `/users/{username}` route
