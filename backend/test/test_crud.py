import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import user as user_model, product as product_model, order as order_model, order_item as order_item_model
from app.schemas import user as user_schema, product as product_schema, order as order_schema, order_item as order_item_schema
from app.crud import (
    create_user, get_user, update_user, delete_user,
    create_product, get_product, update_product, delete_product
)
from app.core.database import Base

# Setup in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

def test_create_and_get_user(db):
    user_in = user_schema.UserCreate(email="test@example.com", name="Test User", password="testpass")
    user_obj = create_user(db, user_in)
    assert user_obj.email == "test@example.com"
    fetched = get_user(db, user_obj.id)
    assert fetched.email == "test@example.com"

def test_update_and_delete_user(db):
    user_in = user_schema.UserCreate(email="update@example.com", name="Update User", password="pass")
    user_obj = create_user(db, user_in)
    update_in = user_schema.UserUpdate(email="updated@example.com")
    updated = update_user(db, user_obj.id, update_in)
    assert updated.email == "updated@example.com"
    deleted = delete_user(db, user_obj.id)
    assert deleted.id == user_obj.id
    assert get_user(db, user_obj.id) is None

def test_create_and_get_product(db):
    product_in = product_schema.ProductCreate(name="Bread", price=2.5)
    product_obj = create_product(db, product_in)
    assert product_obj.name == "Bread"
    fetched = get_product(db, product_obj.id)
    assert fetched.name == "Bread"

def test_update_and_delete_product(db):
    product_in = product_schema.ProductCreate(name="Cake", price=5.0)
    product_obj = create_product(db, product_in)
    update_in = product_schema.ProductUpdate(name="Cupcake")
    updated = update_product(db, product_obj.id, update_in)
    assert updated.name == "Cupcake"
    deleted = delete_product(db, product_obj.id)
    assert deleted.id == product_obj.id
    assert get_product(db, product_obj.id) is None
