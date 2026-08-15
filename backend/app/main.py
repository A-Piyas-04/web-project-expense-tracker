from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 - ensures all models are registered before mappers configure
from app.config import settings
from app.database import SessionLocal
from app.routers import analytics, auth, budgets, categories, expenses
from app.utils.seed import seed_default_categories

app = FastAPI(title="Expense Tracker API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    db = SessionLocal()
    try:
        seed_default_categories(db)
    finally:
        db.close()


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(expenses.router, prefix="/expenses", tags=["expenses"])
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(budgets.router, prefix="/budgets", tags=["budgets"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
