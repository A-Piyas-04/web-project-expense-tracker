from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Text

from app.database import Base

# TODO: define Expense model (id, user_id, category_id, amount, description, date)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    description = Column(Text)
    date = Column(Date, nullable=False)
