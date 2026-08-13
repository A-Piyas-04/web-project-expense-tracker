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
├── Docs/                   # Planning and workflow documents
├── frontend/               # React app (scaffolded)
└── backend/                # FastAPI app (not yet scaffolded)
```

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

---

## Frontend Structure

```
frontend/src/
├── api/              # API client stubs
├── components/       # UI components (layout, expenses, budgets, analytics)
├── context/          # Auth context
├── hooks/            # Custom hooks
├── pages/            # Route pages (Login, Register, Dashboard, Expenses)
├── routes/           # Route definitions
└── utils/            # Constants and helpers
```

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
