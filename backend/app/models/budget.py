from sqlalchemy import Column, ForeignKey, Integer, Numeric

from app.database import Base

# TODO: define Budget model (id, user_id, category_id, monthly_limit)


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    monthly_limit = Column(Numeric(10, 2), nullable=False)
