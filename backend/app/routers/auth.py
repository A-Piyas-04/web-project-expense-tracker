from fastapi import APIRouter

from app.schemas.auth import Token, UserLogin, UserRegister

router = APIRouter()


@router.post("/register")
def register(payload: UserRegister):
    # TODO: hash password, create user, return success response
    pass


@router.post("/login", response_model=Token)
def login(payload: UserLogin):
    # TODO: verify credentials and return JWT access token
    pass
