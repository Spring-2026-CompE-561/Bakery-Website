from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate


class OrderRepository:
    @staticmethod
    def create_order(db: Session, order_in: OrderCreate) -> Order:
        # 1. Create the main Order "Receipt"
        db_order = Order(
            customer_name=order_in.customer_name,
            customer_email=order_in.customer_email,
            total_price=order_in.total_price,
        )
        db.add(db_order)
        db.flush()

        # 2. Create the individual items
        for item in order_in.items:
            db_item = OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
            )
            db.add(db_item)

        db.commit()
        db.refresh(db_order)
        return db_order
