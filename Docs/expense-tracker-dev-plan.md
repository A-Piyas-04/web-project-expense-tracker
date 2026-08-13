# One-Day Development Plan

**Student Expense Tracker with Analytics**

| Field | Value |
|---|---|
| **Course** | SWE 4637 |
| **Team** | Team 17 |
| **Document Type** | One-Day Development Plan |
| **Estimated Build Window** | ~11 hours (single-day sprint, 9:00 AM start) |

---

## Table of Contents

1. [Golden Rules Before You Start](#golden-rules-before-you-start)
2. [Team Roles](#team-roles)
3. [Scope: MVP vs Nice-to-Have](#scope-mvp-vs-nice-to-have)
4. [Hour-by-Hour Timeline](#hour-by-hour-timeline)
5. [The Cut List](#the-cut-list)
6. [Team Sync Points](#team-sync-points)

---

## Golden Rules Before You Start

These principles keep the team aligned and prevent wasted effort during a compressed build day.

1. **Build the smallest working version first (MVP).** Add extra polish only if time remains.
2. **Agree on the API contract** (URLs, request/response fields) in the first 30 minutes, before anyone writes real code. This is the **#1 way to avoid wasted hours**.
3. **Each person works on their own files/folders** to avoid Git conflicts. Push and pull often (every 30–45 min).
4. **Test each small piece as you build it.** Do not wait until the end to test everything together.
5. **If a feature is taking too long, cut it.** Follow the [Cut List](#the-cut-list) at the end of this plan.

---

## Team Roles

Each area has **one clear owner**. Swap names or roles if someone is stronger in a different area — what matters is single ownership, not the specific assignment.

| Person | Role | Owns |
|---|---|---|
| **Person A (Ahnaf)** | Backend & Database Lead | FastAPI setup, PostgreSQL + SQLAlchemy models, CRUD APIs for expenses, categories, and budgets |
| **Person B (Sameur)** | Frontend Lead | ReactJS + Tailwind setup, pages, routing, forms, expense list/UI, dashboard layout |
| **Person C (Irfan)** | Auth, Analytics & Integration Lead | JWT login/register, Recharts analytics, CSV export, connecting frontend to backend, end-to-end testing |

---

## Scope: MVP vs Nice-to-Have

Build **must-have** features first, in the order listed. Only move to nice-to-have items after the MVP is fully working end-to-end.

### Must-Have (MVP)

Build these first, in order:

- [ ] Register / Login (JWT)
- [ ] Add, edit, delete an expense (with category)
- [ ] View list of expenses
- [ ] Add a monthly budget per category + simple overspend warning
- [ ] One working chart (e.g., pie chart of spending by category)
- [ ] Basic responsive layout (does not need to be fancy)

### Nice-to-Have

Only if time remains after MVP is complete:

- [ ] Bar chart + line chart (in addition to pie chart)
- [ ] CSV export
- [ ] Filtering / searching expenses
- [ ] Polished UI animations, dark mode, etc.

---

## Hour-by-Hour Timeline

Times assume an **~11-hour day starting at 9:00 AM**. Adjust clock times to whenever you actually start — what matters is the **order** and the **relative length** of each block.

---

### Sprint 0: Kickoff & Setup

**9:00 – 9:30 AM** · 30 min · **All together**

**Goal:** Everyone agrees on the plan before splitting up.

| Person A | Person B | Person C |
|---|---|---|
| Create GitHub repo, invite teammates | Confirm API contract | Confirm API contract |
| Create `backend/` and `frontend/` folders | List all pages/screens needed | Confirm JWT flow (token format, header format) |
| Draft the API contract together (endpoints + fields) | Agree on Tailwind color/theme basics | Set up shared doc/Trello for tracking tasks |

---

### Sprint 1: Core Foundations

**9:30 – 11:30 AM** · 2 hours

**Goal:** Get the skeleton of backend and frontend running and talking to a database.

| Person A | Person B | Person C |
|---|---|---|
| Set up FastAPI project structure | Set up React app (Vite) + Tailwind | Build register & login endpoints (JWT) |
| Set up PostgreSQL + SQLAlchemy connection | Set up React Router with page stubs: Login, Register, Dashboard, Expenses | Build password hashing (bcrypt/passlib) |
| Create models: `users`, `categories`, `expenses`, `budgets` | Build basic layout/navbar | Write a simple Postman/Thunder Client collection to test endpoints |
| Set up Alembic migrations, run first migration | | |

---

### Sprint 2: Core CRUD Features

**11:30 AM – 1:30 PM** · 2 hours

**Goal:** The main features start working end-to-end for expenses.

| Person A | Person B | Person C |
|---|---|---|
| Build CRUD endpoints: `/expenses` (create, read, update, delete) | Build Login/Register forms, connect to backend auth | Build JWT middleware to protect routes |
| Build CRUD endpoints: `/categories` | Build **Add Expense** form (amount, category, description, date) | Connect frontend axios/fetch calls to auth endpoints |
| Add basic input validation (Pydantic schemas) | Build Expense List view (table/cards) | Store JWT in frontend (context or localStorage) and attach to requests |

---

### Lunch / Short Break

**1:30 – 2:15 PM** · 45 min

**Goal:** Rest. Quickly re-sync on blockers before continuing.

| Person A | Person B | Person C |
|---|---|---|
| Push your code before break | Push your code before break | Push your code before break |

---

### Sprint 3: Budgets, Alerts & Feature Completion

**2:15 – 4:15 PM** · 2 hours

**Goal:** Finish the remaining must-have backend logic and connect it to the UI.

| Person A | Person B | Person C |
|---|---|---|
| Build CRUD endpoints: `/budgets` | Build Expense edit/delete actions in the UI | Connect Expense List/Form to backend CRUD |
| Add overspend-check logic (compare expenses vs `monthly_limit`) | Build **Set Budget** form + budget list view | Connect Budget form to backend |
| Add filtering: expenses by category/date range | Show overspend warning banner/badge in UI | Test full flow: login ? add expense ? set budget ? see warning |

---

### Sprint 4: Analytics Dashboard

**4:15 – 6:00 PM** · 1 hr 45 min

**Goal:** Add the charts — this is the **Analytics** part of the project.

| Person A | Person B | Person C |
|---|---|---|
| Build `/analytics` endpoint(s): totals by category, totals by month | Build Dashboard page layout | Connect Dashboard to `/analytics` endpoint |
| Optimize queries if slow | Integrate Recharts: **Pie chart** (spend by category) — **MUST HAVE** | Build CSV export button (nice-to-have) calling backend export endpoint |
| Help debug integration issues | If time: Bar chart (by category) and Line chart (by month) | Cross-browser / responsive check |

---

### Sprint 5: Integration Testing & Bug Fixing

**6:00 – 7:15 PM** · 1 hr 15 min · **All together**

**Goal:** Everyone stops building new features. Test the whole app together as a real user would.

| Person A | Person B | Person C |
|---|---|---|
| Fix backend bugs found during testing | Fix UI bugs, loading states, empty states | Run through every user flow start to finish |
| Double-check error handling (bad input, expired token) | Make sure forms show validation errors clearly | Keep a running bug list, assign fixes |

---

### Sprint 6: Final Polish & Demo Prep

**7:15 – 8:00 PM** · 45 min

**Goal:** Make it presentable.

| Person A | Person B | Person C |
|---|---|---|
| Clean up unused code / print statements | Quick visual polish (spacing, colors, consistency) | Prepare a 3–5 min demo script |
| Make sure DB seed/demo data exists | Make sure app doesn't crash on empty states | Take screenshots for the report/slides |

---

## The Cut List

Cut items in this order (top of the list goes first). **Never cut anything from the MVP list** unless truly desperate.

| Priority | Feature to cut |
|---|---|
| 1 | CSV export |
| 2 | Bar chart and line chart (keep only the pie chart) |
| 3 | Filtering/searching expenses |
| 4 | Edit budget (keep only create budget) |
| 5 | UI polish (animations, icons, extra styling) |
| 6 | Category management UI (hardcode 5–6 default categories instead) |

---

## Team Sync Points

- **Every 2 hours:** quick 5-minute stand-up — what's done, what's blocked, what's next.
- **Push to Git** after every completed task, not just at the end of a sprint.
- **If Person A finishes backend endpoints early,** they should help Person C with integration or Person B with data-related bugs.
- **Communicate immediately** if an endpoint's fields change — this breaks the other side silently otherwise.

---

*Team 17 · SWE 4637 · Student Expense Tracker with Analytics*
