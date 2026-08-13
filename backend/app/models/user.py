from sqlalchemy import Column, Integer, String

from app.database import Base

# TODO: define User model (id, email, hashed_password, created_at)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
