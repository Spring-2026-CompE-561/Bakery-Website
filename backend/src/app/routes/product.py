# api calls for products

from __future__ import annotations

from typing import Annotated

from ..core.dependencies import get_current_admin
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..models.user import User
from ..schemas.product import Product, ProductCreate, ProductUpdate
from ..services.product_service import ProductService

router = APIRouter()


@router.get("/")
def get_products(db: Annotated[Session, Depends(get_db)]) -> list[Product]:
    return ProductService.list_all_products(db)


@router.post("/")
def add_product(
    product_in: ProductCreate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> Product:
    return ProductService.add_new_product(db, product_in)


@router.patch("/{product_id}")
def patch_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> Product:
    # Partial update route for product fields.
    return ProductService.patch_product(db, product_id, product_in)


@router.put("/{product_id}")
def put_product(
    product_id: int,
    product_in: ProductCreate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> Product:
    # Full update route for replacing product fields.
    return ProductService.replace_product(db, product_id, product_in)
