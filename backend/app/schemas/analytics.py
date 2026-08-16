from decimal import Decimal

from pydantic import BaseModel


class CategoryTotal(BaseModel):
    category_id: int
    category_name: str
    total: Decimal


class MonthTotal(BaseModel):
    month: str
    total: Decimal
