from __future__ import annotations
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repository.order_repository import OrderRepository

# from app.repository.product_repository import ProductRepository
from app.models.product import Product
from app.schemas.order import Order, OrderCreate


class OrderService:
    @staticmethod
    def create_customer_order(db: Session, order_in: OrderCreate) -> Order:
        for item in order_in.items:
            product = db.query(Product).filter(Product.id == item.product_id).first()
            if not product:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product with ID {item.product_id} does not exist.",
                )

            if item.unit_price != product.price:
                item.unit_price = product.price

        return OrderRepository.create_order(db, order_in)

    @staticmethod
    def list_all_orders(db: Session) -> list[Order]:
        """Admin logic to see all orders."""
        return OrderRepository.get_all_orders(db)
