from sqlalchemy import Column, Integer, String

from app.database import Base

# TODO: define Category model (id, name, user_id or global defaults)


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
