from __future__ import annotations

from pydantic import BaseModel


class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: int

    class Config:
        from_attributes = True
