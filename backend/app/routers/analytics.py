import csv
import io
from decimal import Decimal

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.category import Category
from app.models.expense import Expense
from app.models.user import User
from app.schemas.analytics import CategoryTotal, MonthTotal

router = APIRouter()


@router.get("/by-category", response_model=list[CategoryTotal])
def get_totals_by_category(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows = (
        db.query(Category.id, Category.name, func.sum(Expense.amount))
        .join(Expense, Expense.category_id == Category.id)
        .filter(Expense.user_id == current_user.id)
        .group_by(Category.id, Category.name)
        .order_by(func.sum(Expense.amount).desc())
        .all()
    )
    return [
        CategoryTotal(category_id=category_id, category_name=category_name, total=Decimal(total))
        for category_id, category_name, total in rows
    ]


@router.get("/by-month", response_model=list[MonthTotal])
def get_totals_by_month(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    year_expr = func.extract("year", Expense.date)
    month_expr = func.extract("month", Expense.date)

    rows = (
        db.query(year_expr, month_expr, func.sum(Expense.amount))
        .filter(Expense.user_id == current_user.id)
        .group_by(year_expr, month_expr)
        .order_by(year_expr, month_expr)
        .all()
    )
    return [
        MonthTotal(month=f"{int(year):04d}-{int(month):02d}", total=Decimal(total))
        for year, month, total in rows
    ]


@router.get("/export/csv")
def export_expenses_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows = (
        db.query(Expense, Category.name)
        .join(Category, Category.id == Expense.category_id)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.date.desc())
        .all()
    )

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["Date", "Category", "Description", "Amount"])
    for expense, category_name in rows:
        writer.writerow([expense.date.isoformat(), category_name, expense.description or "", str(expense.amount)])
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=expenses.csv"},
    )
