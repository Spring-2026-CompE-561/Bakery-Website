from __future__ import annotations

from typing import Annotated

<<<<<<< HEAD
from app.core.dependencies import get_current_admin
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.product import Product, ProductCreate
from app.services.product_service import ProductService
=======
from ..core.dependencies import get_current_admin
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..models.user import User
from ..schemas.product import Product, ProductCreate
from ..services.product_service import ProductService
>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)

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
