from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.order import Order, OrderCreate
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/")
def place_order(
    order_in: OrderCreate,
    db: Annotated[Session, Depends(get_db)],
) -> Order:
    return OrderService.create_customer_order(db, order_in)
