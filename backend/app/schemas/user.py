from pydantic import BaseModel, EmailStr

# TODO: define UserRead schema for API responses


class UserRead(BaseModel):
    id: int
    email: EmailStr

    model_config = {"from_attributes": True}
