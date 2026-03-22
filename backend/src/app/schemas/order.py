from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: float


class OrderItem(OrderItemCreate):
    id: int
    order_id: int

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    total_price: float
    pickup_date: str
    pickup_time: str
    items: List[OrderItemCreate]


class Order(BaseModel):
    id: int
    customer_name: str
    customer_email: str
    total_price: float
    status: str
    created_at: datetime
    items: List[OrderItem]

    class Config:
        from_attributes = True
