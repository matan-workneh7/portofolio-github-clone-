# Frontend - GitHub Clone

React + Vite frontend for the GitHub clone portfolio project.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

- `src/components/` - React components
  - `ui/` - shadcn/ui components
  - `layout/` - Layout components
  - `repository/` - Repository-related components
  - `issue/` - Issue-related components
  - `profile/` - Profile-related components
  - `search/` - Search-related components
- `src/pages/` - Page components
- `src/services/` - API service layer
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions

## Technologies

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
