from datetime import date
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.budget import Budget
from app.models.category import Category
from app.models.expense import Expense
from app.models.user import User
from app.schemas.budget import BudgetCreate, BudgetRead

router = APIRouter()


def _spent_this_month(db: Session, user_id: int, category_id: int) -> Decimal:
    today = date.today()
    total = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == user_id,
            Expense.category_id == category_id,
            func.extract("year", Expense.date) == today.year,
            func.extract("month", Expense.date) == today.month,
        )
        .scalar()
    )
    return Decimal(total)


def _to_budget_read(db: Session, budget: Budget) -> BudgetRead:
    spent = _spent_this_month(db, budget.user_id, budget.category_id)
    category = db.get(Category, budget.category_id)
    return BudgetRead(
        id=budget.id,
        category_id=budget.category_id,
        category_name=category.name if category else "",
        monthly_limit=budget.monthly_limit,
        spent=spent,
        is_over_budget=spent > budget.monthly_limit,
    )


def _get_owned_budget(db: Session, budget_id: int, current_user: User) -> Budget:
    budget = db.get(Budget, budget_id)
    if budget is None or budget.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")
    return budget


def _assert_no_conflict(db: Session, current_user: User, category_id: int, exclude_budget_id: int | None = None) -> None:
    query = db.query(Budget).filter(Budget.user_id == current_user.id, Budget.category_id == category_id)
    if exclude_budget_id is not None:
        query = query.filter(Budget.id != exclude_budget_id)
    if query.first() is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A budget already exists for this category")


@router.get("/", response_model=list[BudgetRead])
def list_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    return [_to_budget_read(db, budget) for budget in budgets]


@router.post("/", response_model=BudgetRead, status_code=status.HTTP_201_CREATED)
def create_budget(
    payload: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if db.get(Category, payload.category_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category not found")
    _assert_no_conflict(db, current_user, payload.category_id)

    budget = Budget(user_id=current_user.id, category_id=payload.category_id, monthly_limit=payload.monthly_limit)
    db.add(budget)
    db.commit()
    db.refresh(budget)
    return _to_budget_read(db, budget)


@router.put("/{budget_id}", response_model=BudgetRead)
def update_budget(
    budget_id: int,
    payload: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    budget = _get_owned_budget(db, budget_id, current_user)
    if db.get(Category, payload.category_id) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category not found")
    if payload.category_id != budget.category_id:
        _assert_no_conflict(db, current_user, payload.category_id, exclude_budget_id=budget.id)

    budget.category_id = payload.category_id
    budget.monthly_limit = payload.monthly_limit
    db.commit()
    db.refresh(budget)
    return _to_budget_read(db, budget)


@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    budget = _get_owned_budget(db, budget_id, current_user)
    db.delete(budget)
    db.commit()
