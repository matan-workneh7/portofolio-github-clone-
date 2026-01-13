# Database Setup Guide

## Current Status

The database is **NOT set up yet**. The code is ready, but you need to:

1. Create the MySQL database
2. Configure the connection
3. Run migrations to create tables

## Step-by-Step Setup

### 1. Create MySQL Database

Connect to MySQL and create the database:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE github_clone CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 2. Configure Database Connection

Edit `backend/.env` file (create it if it doesn't exist):

```env
DATABASE_URL=mysql+pymysql://your_username:your_password@localhost/github_clone
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000","http://127.0.0.1:5173"]
API_V1_PREFIX=/api/v1
PROJECT_NAME=GitHub Clone API
VERSION=1.0.0
```

Replace:
- `your_username` with your MySQL username
- `your_password` with your MySQL password

### 3. Install Backend Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run Migrations

```bash
cd backend
alembic upgrade head
```

This will create all the tables:
- `users`
- `repositories`
- `commits`
- `issues`
- `stars`

### 5. Verify Database Setup

You can verify the tables were created:

```bash
mysql -u root -p github_clone
```

```sql
SHOW TABLES;
```

You should see:
- commits
- issues
- repositories
- stars
- users

## Alternative: Use SQLAlchemy to Create Tables

If you prefer not to use migrations, you can also create tables directly:

```python
from app.database import engine, Base
from app.models import User, Repository, Commit, Issue, Star

Base.metadata.create_all(bind=engine)
```

However, using Alembic migrations is recommended for version control.

## Troubleshooting

### Connection Error
- Verify MySQL is running: `sudo systemctl status mysql`
- Check username/password in DATABASE_URL
- Ensure database exists

### Migration Errors
- Make sure all dependencies are installed
- Check that DATABASE_URL is correct
- Verify MySQL user has CREATE TABLE permissions

### Import Errors
- Activate virtual environment
- Install requirements: `pip install -r requirements.txt`

## Next Steps

After database setup:
1. Start backend: `uvicorn app.main:app --reload`
2. Start frontend: `npm run dev` (in frontend directory)
3. Visit http://localhost:8000/docs to see API documentation
