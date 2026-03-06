from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.schemas.order_item import OrderItem


class OrderBase(BaseModel):
    customer_name: str
    customer_email: EmailStr  # Ensures it's a real email format
    total_price: float
    status: str = "pending"


class OrderCreate(OrderBase):
    items: list[OrderItem]  # When creating, we include the list of items


class Order(OrderBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
