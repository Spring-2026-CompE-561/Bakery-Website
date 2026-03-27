# validation for placing product into database

from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..repository.product_repository import ProductRepository
from ..schemas.product import ProductCreate, ProductUpdate


class ProductService:
    @staticmethod
    def list_all_products(db: Session) -> list[ProductRepository]:
        return ProductRepository.get_all(db)

    @staticmethod
    def add_new_product(db: Session, product_in: ProductCreate) -> ProductRepository:
        if product_in.price < 0:
            msg = f"Invalid price {product_in.price}. Price must be non-negative."
            raise ValueError(msg)
        return ProductRepository.create(db, product_in)

    @staticmethod
    def patch_product(
        db: Session,
        product_id: int,
        product_in: ProductUpdate,
    ) -> ProductRepository:
        # PATCH updates only the fields explicitly sent by the caller.
        db_product = ProductRepository.get_by_id(db, product_id)
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        updates = product_in.model_dump(exclude_unset=True)
        if "price" in updates and updates["price"] is not None and updates["price"] < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Price must be non-negative",
            )

        if not updates:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields provided for update",
            )

        return ProductRepository.update(db, db_product, updates)
