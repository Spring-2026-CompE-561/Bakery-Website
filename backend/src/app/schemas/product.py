from __future__ import annotations

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    is_available: bool = True
    picture_url: str | None = None


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
