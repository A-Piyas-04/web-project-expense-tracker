from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

# TODO: configure SQLAlchemy engine and session factory for PostgreSQL
engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    # TODO: yield a database session and close it after the request
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
