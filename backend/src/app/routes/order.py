from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

<<<<<<< HEAD
from app.core.dependencies import get_current_admin
from app.models.user import User
from app.core.database import get_db
from app.schemas.order import Order, OrderCreate
from app.models.order import Order as OrderModel
from app.services.order_service import OrderService
=======
from ..core.dependencies import get_current_admin
from ..models.user import User
from ..core.database import get_db
from ..schemas.order import Order, OrderCreate
from ..models.order import Order as OrderModel
from ..services.order_service import OrderService
>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)

router = APIRouter()


@router.post("/")
def place_order(
    order_in: OrderCreate,
    db: Annotated[Session, Depends(get_db)],
) -> Order:
    return OrderService.create_customer_order(db, order_in)


@router.get("/")
def get_all_orders(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> list[Order]:
    """Only the admin can see the full order list."""
    return OrderService.list_all_orders(db)


@router.patch("/{order_id}/status")
def update_order_status(
    order_id: int,
    new_status: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    valid_statuses = ["PENDING", "PREPARING", "READY", "COMPLETED", "CANCELLED"]
    if new_status.upper() not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")

    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    db_order.status = new_status.upper()
    db.commit()
    db.refresh(db_order)
    return db_order
