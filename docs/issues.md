# Issues Feature

## Overview

The Issues feature allows users to create, view, update, and delete issues for repositories. Issues can be in "open" or "closed" status.

## Backend Implementation

### Models

**File**: `backend/app/models/issue.py`

- `id`: Primary key
- `repository_id`: Foreign key to Repository
- `creator_id`: Foreign key to User
- `title`: Issue title
- `description`: Optional issue description
- `status`: Enum (OPEN or CLOSED)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Controllers

**File**: `backend/app/controllers/issue_controller.py`

- `get_issue(db, issue_id)`: Get issue by ID
- `get_issues_by_repository(db, repo_id, skip, limit, status)`: Get issues for a repository with optional status filter
- `create_issue(db, issue)`: Create a new issue
- `update_issue(db, issue_id, issue_update)`: Update issue
- `delete_issue(db, issue_id)`: Delete issue

### API Endpoints

**File**: `backend/app/views/issue_routes.py`

- `POST /api/v1/issues` - Create issue
- `GET /api/v1/issues/{issue_id}` - Get issue by ID
- `GET /api/v1/repositories/{repo_id}/issues` - Get issues for a repository (optional `status` query param)
- `PUT /api/v1/issues/{issue_id}` - Update issue
- `DELETE /api/v1/issues/{issue_id}` - Delete issue

### Schemas

**File**: `backend/app/schemas/issue_schema.py`

- `IssueCreate`: For creating issues
- `IssueUpdate`: For updating issues
- `IssueResponse`: Response model with creator information

## Frontend Implementation

### Components

**File**: `frontend/src/components/issue/IssueCard.tsx`

Displays an issue card with title, description, status badge, and creator.

**File**: `frontend/src/components/issue/IssueForm.tsx`

Form component for creating and editing issues.

### Pages

**File**: `frontend/src/pages/Repository.tsx`

Shows issues list for a repository with ability to create new issues.

**File**: `frontend/src/pages/Issue.tsx`

Issue detail page showing full issue information and edit capability.

### Services

**File**: `frontend/src/services/issueService.ts`

Service layer for API communication:
- `getById(id)`: Get issue by ID
- `getByRepository(repoId, skip, limit, status?)`: Get issues for a repository
- `create(issue)`: Create issue
- `update(id, issue)`: Update issue
- `delete(id)`: Delete issue

## Usage Examples

### Creating an Issue

```typescript
import { issueService } from '@/services/issueService';

const newIssue = await issueService.create({
  repository_id: 1,
  creator_id: 1,
  title: 'Bug in login',
  description: 'The login button is not working',
  status: 'open'
});
```

### Getting Repository Issues

```typescript
// Get all issues
const issues = await issueService.getByRepository(repoId);

// Get only open issues
const openIssues = await issueService.getByRepository(repoId, 0, 100, 'open');
```

### Updating Issue Status

```typescript
await issueService.update(issueId, {
  status: 'closed'
});
```

## Relationships

- An issue belongs to one Repository
- An issue belongs to one User (creator)

## Status Values

- `open`: Issue is open and active
- `closed`: Issue has been resolved or closed
