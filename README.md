# GitHub Clone Portfolio Project

A full-stack GitHub clone built with FastAPI (Python) backend and React (TypeScript) frontend with shadcn/ui components.

## Features

- **Repositories**: Create, view, update, and delete repositories
- **Commits**: Create and view Git commits for repositories
- **Issues**: Create, view, update, and delete repository issues
- **Profiles**: View user profiles with repositories and activity
- **Search**: Search for repositories and users
- **Stars**: Star/unstar repositories

## Tech Stack

### Backend
- FastAPI - Modern Python web framework
- SQLAlchemy - ORM for database operations
- MySQL - Database
- Alembic - Database migrations
- Pydantic - Data validation

### Frontend
- React 18 - UI library
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- shadcn/ui - UI component library
- React Router - Routing
- Axios - HTTP client

## Project Structure

```
portofolio(github-clone)/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── models/      # SQLAlchemy models
│   │   ├── controllers/ # Business logic
│   │   ├── views/       # API routes
│   │   ├── schemas/     # Pydantic schemas
│   │   └── utils/       # Utilities
│   └── migrations/      # Database migrations
├── frontend/        # React frontend
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── lib/         # Utilities
└── docs/            # Feature documentation
```

## Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/github_clone
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

5. Run migrations:
```bash
alembic upgrade head
```

6. Start server:
```bash
uvicorn app.main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Feature Documentation

Each feature has its own documentation in the `docs/` folder:
- [Repositories](docs/repositories.md)
- [Commits](docs/commits.md)
- [Issues](docs/issues.md)
- [Profiles](docs/profiles.md)
- [Search](docs/search.md)
- [Stars](docs/stars.md)

## Development

### Backend Development

- Follow MVC pattern: Models → Controllers → Views
- Use Pydantic schemas for request/response validation
- Run migrations when model changes: `alembic revision --autogenerate -m "description"`

### Frontend Development

- Use TypeScript for type safety
- Follow component-based architecture
- Use shadcn/ui components for consistent UI
- Services handle all API communication

## Notes

- No authentication system - users can be created directly
- MySQL database required
- CORS configured for local development
- All features are fully functional and documented
