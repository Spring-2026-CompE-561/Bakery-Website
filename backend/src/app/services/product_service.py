from __future__ import annotations

from sqlalchemy.orm import Session

from ..repository.product_repository import ProductRepository
from ..schemas.product import ProductCreate


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
