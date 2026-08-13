from fastapi import APIRouter

from app.schemas.expense import ExpenseCreate, ExpenseRead

router = APIRouter()


@router.get("/", response_model=list[ExpenseRead])
def list_expenses():
    # TODO: return all expenses for the authenticated user
    pass


@router.post("/", response_model=ExpenseRead)
def create_expense(payload: ExpenseCreate):
    # TODO: create a new expense for the authenticated user
    pass


@router.put("/{expense_id}", response_model=ExpenseRead)
def update_expense(expense_id: int, payload: ExpenseCreate):
    # TODO: update an existing expense owned by the authenticated user
    pass


@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    # TODO: delete an expense owned by the authenticated user
    pass
