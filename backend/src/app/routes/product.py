from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.product import Product, ProductCreate
from app.services.product_service import ProductService

router = APIRouter()

@router.get("/", response_model=list[Product])
def get_products(db: Session = Depends(get_db)):
    return ProductService.list_all_products(db)

@router.post("/", response_model=Product)
def add_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    return ProductService.add_new_product(db, product_in)