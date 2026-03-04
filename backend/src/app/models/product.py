from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    ingredients = Column(Text, nullable=True)
    allergens = Column(Text, nullable=True)
    calories = Column(Integer, nullable=True)
    price = Column(Float, nullable=False)
    is_available = Column(Boolean, default=True)
    picture_url = Column(String, nullable=True)