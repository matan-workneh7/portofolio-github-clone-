# Issues Feature

## Overview
Issues allow tracking bugs, features, and discussions within a repository. Issues have open/closed status.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/repos/{id}/issues` | List issues (optional status filter) |
| GET | `/repos/{id}/issues/{issue_id}` | Get issue by ID |
| POST | `/repos/{id}/issues` | Create a new issue |
| PUT | `/repos/{id}/issues/{issue_id}` | Update an issue |
| DELETE | `/repos/{id}/issues/{issue_id}` | Delete an issue |

## Query Parameters
- `status` - Filter by `open` or `closed`

## Request/Response Examples

### Create Issue
```json
POST /repos/1/issues
{
  "creator_id": 1,
  "title": "Bug: Login not working",
  "description": "Cannot login with correct credentials"
}
```

### Update Status
```json
PUT /repos/1/issues/1
{
  "status": "closed"
}
```

## Frontend Components

- `IssueCard` - Displays issue with status badge
- `IssuePage` - Full issue view with status toggle
