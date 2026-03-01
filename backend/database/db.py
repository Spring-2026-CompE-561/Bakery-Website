from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from ..app.settings import settings

engine = create_engine(settings.DATABASE_URL) # establish connection to database

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # create session for database interactions

Base = declarative_base() # base class for database models