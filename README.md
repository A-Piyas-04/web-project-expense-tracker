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
| **Backend** | Python, FastAPI, SQLAlchemy, Alembic *(planned)* |
| **Database** | PostgreSQL *(planned)* |
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
└── backend/                # FastAPI app (not yet scaffolded)
```

> `node_modules/`, `dist/`, and `.env` are gitignored and not shown above.

---

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend, when added)
- **PostgreSQL** (for backend, when added)

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
