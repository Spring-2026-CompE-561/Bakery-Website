# database interactions for products

from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.product import Product
from ..schemas.product import ProductCreate


class ProductRepository:
    @staticmethod
    def get_all(db: Session) -> list[Product]:
        return db.query(Product).all()

    @staticmethod
    def create(db: Session, product_in: ProductCreate) -> Product:
        db_product = Product(**product_in.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
