
from sqlalchemy.orm import Session
from .models import user, product, order, order_item
from .schemas import user as user_schema, product as product_schema, order as order_schema, order_item as order_item_schema
from sqlalchemy.exc import NoResultFound
from app.core.auth import password_hash

# User CRUD


def create_user(db: Session, user_in: user_schema.UserCreate):
    hashed_password = password_hash.hash(user_in.password)
    db_user = user.User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(user.User).filter(user.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(user.User).filter(user.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user.User).offset(skip).limit(limit).all()


def update_user(db: Session, user_id: int, user_in: user_schema.UserUpdate):
    db_user = db.query(user.User).filter(user.User.id == user_id).first()
    if not db_user:
        return None
    update_data = user_in.model_dump(exclude_unset=True)
    if 'password' in update_data:
        db_user.hashed_password = password_hash.hash(update_data.pop('password'))
    for key, value in update_data.items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(user.User).filter(user.User.id == user_id).first()
    if not db_user:
        return None
    db.delete(db_user)
    db.commit()
    return db_user

# Product CRUD

def create_product(db: Session, product_in: product_schema.ProductCreate):
    db_product = product.Product(**product_in.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: int):
    return db.query(product.Product).filter(product.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(product.Product).offset(skip).limit(limit).all()

def update_product(db: Session, product_id: int, product_in: product_schema.ProductUpdate):
    db_product = db.query(product.Product).filter(product.Product.id == product_id).first()
    if not db_product:
        return None
    for key, value in product_in.model_dump(exclude_unset=True).items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(product.Product).filter(product.Product.id == product_id).first()
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product

# Order CRUD

def create_order(db: Session, order_in: order_schema.OrderCreate):
    db_order = order.Order(**order_in.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_order(db: Session, order_id: int):
    return db.query(order.Order).filter(order.Order.id == order_id).first()

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(order.Order).offset(skip).limit(limit).all()

def update_order(db: Session, order_id: int, order_in: order_schema.OrderUpdate):
    db_order = db.query(order.Order).filter(order.Order.id == order_id).first()
    if not db_order:
        return None
    for key, value in order_in.dict(exclude_unset=True).items():
        setattr(db_order, key, value)
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    db_order = db.query(order.Order).filter(order.Order.id == order_id).first()
    if not db_order:
        return None
    db.delete(db_order)
    db.commit()
    return db_order

# OrderItem CRUD

def create_order_item(db: Session, order_item_in: order_item_schema.OrderItemCreate):
    db_order_item = order_item.OrderItem(**order_item_in.dict())
    db.add(db_order_item)
    db.commit()
    db.refresh(db_order_item)
    return db_order_item

def get_order_item(db: Session, order_item_id: int):
    return db.query(order_item.OrderItem).filter(order_item.OrderItem.id == order_item_id).first()

def get_order_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(order_item.OrderItem).offset(skip).limit(limit).all()

def update_order_item(db: Session, order_item_id: int, order_item_in: order_item_schema.OrderItemUpdate):
    db_order_item = db.query(order_item.OrderItem).filter(order_item.OrderItem.id == order_item_id).first()
    if not db_order_item:
        return None
    for key, value in order_item_in.dict(exclude_unset=True).items():
        setattr(db_order_item, key, value)
    db.commit()
    db.refresh(db_order_item)
    return db_order_item

def delete_order_item(db: Session, order_item_id: int):
    db_order_item = db.query(order_item.OrderItem).filter(order_item.OrderItem.id == order_item_id).first()
    if not db_order_item:
        return None
    db.delete(db_order_item)
    db.commit()
    return db_order_item
