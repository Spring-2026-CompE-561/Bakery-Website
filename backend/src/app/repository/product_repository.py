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
    def get_by_id(db: Session, product_id: int) -> Product | None:
        # Retrieve a single product by id for targeted updates.
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def create(db: Session, product_in: ProductCreate) -> Product:
        db_product = Product(**product_in.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product

    @staticmethod
    def update(db: Session, db_product: Product, updates: dict[str, object]) -> Product:
        # Apply only provided fields to preserve the rest of the record.
        for key, value in updates.items():
            setattr(db_product, key, value)

        db.commit()
        db.refresh(db_product)
        return db_product

    @staticmethod
    def delete(db: Session, db_product: Product) -> None:
        # Permanently remove the product row from the database.
        db.delete(db_product)
        db.commit()
