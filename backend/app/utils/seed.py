from sqlalchemy.orm import Session

from app.models.category import Category

DEFAULT_CATEGORIES = ["Food", "Transport", "Books", "Entertainment", "Utilities", "Other"]


def seed_default_categories(db: Session) -> None:
    existing = {name for (name,) in db.query(Category.name).all()}
    for name in DEFAULT_CATEGORIES:
        if name not in existing:
            db.add(Category(name=name))
    db.commit()
