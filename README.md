# GitHub Clone Portfolio

A full-stack GitHub-like portfolio application demonstrating modern web development practices.

## 🚀 Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - ORM for database operations
- **MySQL** - Relational database
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation

## 📁 Project Structure

```
portofolio(github-clone)/
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── models/    # SQLAlchemy models
│   │   ├── controllers/ # Business logic
│   │   ├── views/     # API routes
│   │   └── schemas/   # Pydantic schemas
│   └── requirements.txt
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/     # Page views
│   │   └── services/  # API layer
│   └── package.json
└── docs/              # Feature documentation
```

## 🛠️ Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL 8+

### Database Setup
```bash
mysql -u root -p
CREATE DATABASE github_clone;
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Update .env with your database credentials
# Start the server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints

| Resource | Endpoints |
|----------|-----------|
| Users | `GET/POST /users`, `GET/PUT/DELETE /users/{id}` |
| Repositories | `GET/POST /repos`, `GET/PUT/DELETE /repos/{id}` |
| Commits | `GET/POST /repos/{id}/commits` |
| Issues | `GET/POST /repos/{id}/issues`, `PUT/DELETE /repos/{id}/issues/{id}` |
| Search | `GET /search?q=query&type=all|users|repositories` |
| Stars | `POST/DELETE /repos/{id}/star` |

## 📖 Features

- **Repositories** - Create, view, edit, and delete repositories
- **Commits** - Track repository commits with author info
- **Issues** - Open/close issues with status tracking
- **Profiles** - User profiles with repo listings
- **Search** - Search users and repositories
- **Stars** - Star/unstar repositories

## 📝 License

MIT
