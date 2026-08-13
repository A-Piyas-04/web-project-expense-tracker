from pydantic import BaseModel

# TODO: define CategoryCreate and CategoryRead schemas


class CategoryRead(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}
