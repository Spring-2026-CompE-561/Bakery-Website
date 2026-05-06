# database format for products

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    is_available: bool = True
    is_active: bool = True
    picture_url: str | None = None
    badge: str | None = None


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# For updating product info (all fields optional)
from typing import Optional
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    is_available: Optional[bool] = None
    is_active: Optional[bool] = None
    picture_url: Optional[str] = None
    badge: Optional[str] = None
