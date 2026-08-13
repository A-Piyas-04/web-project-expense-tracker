from decimal import Decimal

from pydantic import BaseModel

# TODO: define BudgetCreate, BudgetUpdate, and BudgetRead schemas (include overspend warning flag)


class BudgetCreate(BaseModel):
    category_id: int
    monthly_limit: Decimal


class BudgetRead(BaseModel):
    id: int
    category_id: int
    monthly_limit: Decimal

    model_config = {"from_attributes": True}
