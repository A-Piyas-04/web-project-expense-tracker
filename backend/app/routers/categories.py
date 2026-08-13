from fastapi import APIRouter

from app.schemas.category import CategoryRead

router = APIRouter()


@router.get("/", response_model=list[CategoryRead])
def list_categories():
    # TODO: return all categories available to the authenticated user
    pass
