# Search Feature

## Overview

The Search feature allows users to search for repositories and users by name, description, username, or email.

## Backend Implementation

### Controllers

**File**: `backend/app/controllers/search_controller.py`

- `search_users(db, query, skip, limit)`: Search users by username or email
- `search_repositories(db, query, skip, limit)`: Search repositories by name or description

### API Endpoints

**File**: `backend/app/views/search_routes.py`

- `GET /api/v1/search/users?q={query}` - Search users
- `GET /api/v1/search/repositories?q={query}` - Search repositories

### Search Logic

- Uses SQL `ILIKE` for case-insensitive pattern matching
- Searches across multiple fields:
  - Users: username and email
  - Repositories: name and description
- Supports pagination with `skip` and `limit` parameters

## Frontend Implementation

### Components

**File**: `frontend/src/components/search/SearchBar.tsx`

Search input component with submit button.

### Pages

**File**: `frontend/src/pages/Search.tsx`

Search page displaying results for both repositories and users.

### Services

**File**: `frontend/src/services/searchService.ts`

Service layer for API communication:
- `searchUsers(query, skip, limit)`: Search users
- `searchRepositories(query, skip, limit)`: Search repositories

## Usage Examples

### Searching Users

```typescript
import { searchService } from '@/services/searchService';

const users = await searchService.searchUsers('john', 0, 20);
```

### Searching Repositories

```typescript
const repos = await searchService.searchRepositories('react', 0, 20);
```

### Combined Search

```typescript
const [repos, users] = await Promise.all([
  searchService.searchRepositories(query),
  searchService.searchUsers(query)
]);
```

## Search Behavior

- Case-insensitive matching
- Partial string matching (uses `%query%` pattern)
- Returns results from multiple fields
- Results are paginated

## Notes

- Search is performed on the backend using SQL queries
- No full-text search indexing (can be added for production)
- Search results are limited to 20 items by default
