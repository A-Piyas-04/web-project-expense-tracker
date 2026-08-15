from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class ExpenseCreate(BaseModel):
    category_id: int
    amount: Decimal
    description: str | None = None
    date: date


class ExpenseRead(BaseModel):
    id: int
    category_id: int
    amount: Decimal
    description: str | None
    date: date

    model_config = {"from_attributes": True}
