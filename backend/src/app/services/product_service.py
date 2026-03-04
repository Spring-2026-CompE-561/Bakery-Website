from sqlalchemy.orm import Session
from app.repository.product_repository import ProductRepository
from app.schemas.product import ProductCreate

class ProductService:
    @staticmethod
    def list_all_products(db: Session):
        
        return ProductRepository.get_all(db)

    @staticmethod
    def add_new_product(db: Session, product_in: ProductCreate):
        
        if product_in.price < 0:
            raise ValueError("Price cannot be negative")
        return ProductRepository.create(db, product_in)