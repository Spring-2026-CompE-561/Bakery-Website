from __future__ import annotations

from fastapi import APIRouter

from app.routes import order, product, user

api_router = APIRouter()


api_router.include_router(product.router, prefix="/products", tags=["Products"])
api_router.include_router(order.router, prefix="/orders", tags=["Orders"])
api_router.include_router(user.router, prefix="/users", tags=["Users"])
