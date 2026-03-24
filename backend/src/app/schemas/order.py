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
<<<<<<< HEAD

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
=======
>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)

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


# For updating order info (all fields optional)
from typing import Optional
class OrderUpdate(BaseModel):
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    total_price: Optional[float] = None
    pickup_date: Optional[str] = None
    pickup_time: Optional[str] = None
    status: Optional[str] = None
    items: Optional[List[OrderItemCreate]] = None
