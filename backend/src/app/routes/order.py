from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.order import Order, OrderCreate
from app.services.order_service import OrderService

router = APIRouter()

@router.post("/", response_model=Order)
def place_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    return OrderService.create_customer_order(db, order_in)