# Student Expense Tracker with Analytics

A full-stack web app for university students to log daily spending, set monthly budgets, receive overspend warnings, and view spending analytics.

| Field | Value |
|---|---|
| **Course** | SWE 4637 |
| **Team** | Team 17 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS, Recharts, Axios |
| **Backend** | Python, FastAPI, SQLAlchemy, Alembic |
| **Database** | PostgreSQL |
| **Auth** | JWT |

---

## Project Structure

```
web-project/
├── README.md
├── Docs/
│   ├── expense-tracker-dev-plan.md
│   └── expense-tracker-workflow-plan.md
├── frontend/
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   ├── client.js
│       │   ├── auth.js
│       │   ├── expenses.js
│       │   ├── categories.js
│       │   ├── budgets.js
│       │   └── analytics.js
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Layout.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── common/
│       │   │   ├── Button.jsx
│       │   │   ├── Input.jsx
│       │   │   ├── LoadingSpinner.jsx
│       │   │   └── OverspendBanner.jsx
│       │   ├── expenses/
│       │   │   ├── ExpenseForm.jsx
│       │   │   ├── ExpenseList.jsx
│       │   │   └── ExpenseItem.jsx
│       │   ├── budgets/
│       │   │   ├── BudgetForm.jsx
│       │   │   └── BudgetList.jsx
│       │   └── analytics/
│       │       ├── CategoryPieChart.jsx
│       │       ├── CategoryBarChart.jsx
│       │       └── MonthlyLineChart.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   └── useAuth.js
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── DashboardPage.jsx
│       │   └── ExpensesPage.jsx
│       ├── routes/
│       │   └── AppRoutes.jsx
│       └── utils/
│           ├── constants.js
│           └── formatters.js
└── backend/
    ├── .env.example
    ├── .gitignore
    ├── requirements.txt
    ├── alembic.ini
    ├── alembic/
    │   ├── env.py
    │   └── versions/
    └── app/
        ├── main.py
        ├── config.py
        ├── database.py
        ├── dependencies.py
        ├── models/
        │   ├── user.py
        │   ├── category.py
        │   ├── expense.py
        │   └── budget.py
        ├── schemas/
        │   ├── auth.py
        │   ├── user.py
        │   ├── category.py
        │   ├── expense.py
        │   ├── budget.py
        │   └── analytics.py
        ├── routers/
        │   ├── auth.py
        │   ├── expenses.py
        │   ├── categories.py
        │   ├── budgets.py
        │   └── analytics.py
        └── utils/
            ├── security.py
            └── seed.py
```

> `node_modules/`, `dist/`, `venv/`, and `.env` are gitignored and not shown above.

---

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **PostgreSQL** (for backend)

---

## Getting Started — Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

### Environment Variables

Copy `frontend/.env.example` to `frontend/.env` and adjust as needed:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

The frontend is currently a **scaffold with placeholders** — routes and components exist but business logic is not yet implemented.

---

## Getting Started — Backend

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API runs at [http://localhost:8000](http://localhost:8000). Interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs).

### Environment Variables

Copy `backend/.env.example` to `backend/.env` and adjust as needed:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/expense_tracker
SECRET_KEY=change-me-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173
```

### Database Migrations

```bash
# After models are finalized
alembic revision --autogenerate -m "initial migration"
alembic upgrade head
```

The backend is currently a **scaffold with placeholders** — routes, models, and schemas exist but business logic is not yet implemented.

---

## Documentation

- [Development Plan](Docs/expense-tracker-dev-plan.md) — hour-by-hour sprint timeline and team roles
- [Workflow Plan](Docs/expense-tracker-workflow-plan.md) — user stories, workflow, and demo checklist

---

## Team Roles

| Person | Role |
|---|---|
| **Ahnaf** | Backend & Database Lead |
| **Sameur** | Frontend Lead |
| **Irfan** | Auth, Analytics & Integration Lead |

---

*Team 17 — SWE 4637*
