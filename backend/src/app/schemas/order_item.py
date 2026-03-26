# database format for order items

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: int
    order_id: int

    model_config = ConfigDict(from_attributes=True)


# For updating order item info (all fields optional)
from typing import Optional
class OrderItemUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
