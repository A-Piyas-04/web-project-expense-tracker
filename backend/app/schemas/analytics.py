from decimal import Decimal

from pydantic import BaseModel

# TODO: define analytics response schemas (totals by category, totals by month)


class CategoryTotal(BaseModel):
    category_id: int
    category_name: str
    total: Decimal


class MonthTotal(BaseModel):
    month: str
    total: Decimal
