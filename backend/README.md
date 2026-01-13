# Backend - GitHub Clone API

FastAPI backend for the GitHub clone portfolio project.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file based on `.env.example` and configure your MySQL database connection.

3. Run database migrations:
```bash
alembic upgrade head
```

4. Start the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

- `app/models/` - SQLAlchemy database models
- `app/controllers/` - Business logic layer
- `app/views/` - API route handlers
- `app/schemas/` - Pydantic request/response schemas
- `app/utils/` - Utility functions
