from fastapi import APIRouter

from app.schemas.budget import BudgetCreate, BudgetRead

router = APIRouter()


@router.get("/", response_model=list[BudgetRead])
def list_budgets():
    # TODO: return all budgets for the authenticated user with overspend flags
    pass


@router.post("/", response_model=BudgetRead)
def create_budget(payload: BudgetCreate):
    # TODO: set a monthly budget per category for the authenticated user
    pass


@router.put("/{budget_id}", response_model=BudgetRead)
def update_budget(budget_id: int, payload: BudgetCreate):
    # TODO: update an existing budget owned by the authenticated user
    pass
