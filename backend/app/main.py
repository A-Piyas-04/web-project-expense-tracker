from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import analytics, auth, budgets, categories, expenses

app = FastAPI(title="Expense Tracker API", version="0.1.0")

# TODO: configure CORS origins from settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(expenses.router, prefix="/expenses", tags=["expenses"])
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(budgets.router, prefix="/budgets", tags=["budgets"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
