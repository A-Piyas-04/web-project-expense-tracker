from fastapi import APIRouter

from app.schemas.analytics import CategoryTotal, MonthTotal

router = APIRouter()


@router.get("/by-category", response_model=list[CategoryTotal])
def get_totals_by_category():
    # TODO: return spending totals grouped by category
    pass


@router.get("/by-month", response_model=list[MonthTotal])
def get_totals_by_month():
    # TODO: return spending totals grouped by month
    pass


@router.get("/export/csv")
def export_expenses_csv():
    # TODO: return expenses as a downloadable CSV file (nice-to-have)
    pass
