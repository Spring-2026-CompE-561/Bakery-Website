from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.product import Product, ProductCreate
from app.services.product_service import ProductService

router = APIRouter()


@router.get("/")
def get_products(db: Annotated[Session, Depends(get_db)]) -> list[Product]:
    return ProductService.list_all_products(db)


@router.post("/")
def add_product(
    product_in: ProductCreate,
    db: Annotated[Session, Depends(get_db)],
) -> Product:
    return ProductService.add_new_product(db, product_in)
