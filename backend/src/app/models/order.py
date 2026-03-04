from sqlalchemy import Column, Integer, String, Float, DateTime, Date, Time
from sqlalchemy.orm import relationship
from datetime import datetime, UTC
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=True)
    status = Column(String, default="PENDING") # PENDING, CONFIRMED, COMPLETED, CANCELLED
    total_price = Column(Float, nullable=False)
    pickup_date = Column(Date, nullable=False)
    pickup_time = Column(Time, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

    items = relationship("OrderItem", back_populates="order")