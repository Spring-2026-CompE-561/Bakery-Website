from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate

class ProductRepository:
    @staticmethod
    def get_all(db: Session):
        return db.query(Product).all()

    @staticmethod
    def create(db: Session, product_in: ProductCreate):
        db_product = Product(**product_in.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product