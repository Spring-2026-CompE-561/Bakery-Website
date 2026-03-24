from sqlalchemy.orm import Session, joinedload
from datetime import datetime
from ..models.order import Order
from ..models.order_item import OrderItem
from ..models.product import Product
from ..schemas.order import OrderCreate


class OrderRepository:
    @staticmethod
    def create_order(db: Session, order_in: OrderCreate) -> Order:
        try:
            date_obj = datetime.strptime(order_in.pickup_date, "%Y-%m-%d").date()
        except ValueError:
            date_obj = datetime.now().date()

        try:
            #  (e.g., "10:30 AM")
            time_obj = datetime.strptime(order_in.pickup_time, "%I:%M %p").time()
        except ValueError:
            try:
                time_obj = datetime.strptime(order_in.pickup_time, "%H:%M").time()
            except ValueError:
                time_obj = datetime.now().time()

        db_order = Order(
            customer_name=order_in.customer_name,
            customer_email=order_in.customer_email,
            customer_phone=getattr(order_in, "customer_phone", None),
            total_price=0.0,
            pickup_date=date_obj,
            pickup_time=time_obj,  #
            status="PENDING",
        )
        db.add(db_order)
        db.flush()

        running_total = 0.0

        for item in order_in.items:
            product = db.query(Product).filter(Product.id == item.product_id).first()

            if product:
                item_price = product.price
                line_total = item_price * item.quantity
                running_total += line_total

                db_item = OrderItem(
                    order_id=db_order.id,
                    product_id=item.product_id,
                    quantity=item.quantity,
                    unit_price=item_price,
                )
                db.add(db_item)
            else:
                continue

        db_order.total_price = running_total
        db.commit()
        db.refresh(db_order)
        return db_order

    @staticmethod
    def get_all_orders(db: Session) -> list[Order]:
        """
        Retrieves all orders. We use joinedload to fetch the
        associated items in a single query for efficiency.
        """
        return db.query(Order).options(joinedload(Order.items)).all()
