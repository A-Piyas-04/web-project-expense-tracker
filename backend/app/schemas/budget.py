from decimal import Decimal

from pydantic import BaseModel


class BudgetCreate(BaseModel):
    category_id: int
    monthly_limit: Decimal


class BudgetRead(BaseModel):
    id: int
    category_id: int
    category_name: str
    monthly_limit: Decimal
    spent: Decimal
    is_over_budget: bool

    model_config = {"from_attributes": True}
