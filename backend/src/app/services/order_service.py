from __future__ import annotations

from sqlalchemy.orm import Session

from app.repository.order_repository import OrderRepository
from app.schemas.order import Order, OrderCreate


class OrderService:
    @staticmethod
    def create_customer_order(db: Session, order_in: OrderCreate) -> Order:
        return OrderRepository.create_order(db, order_in)
