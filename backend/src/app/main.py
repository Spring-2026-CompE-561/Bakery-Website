from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from .api.v1.routes import api_router
from .core.database import Base, engine
from .core.settings import settings
from . import models  # noqa: F401 - Ensure models are registered with SQLAlchemy
# Create database tables
# If the tables don't exist, create them


print(f"Tables found in Base: {Base.metadata.tables.keys()}")
Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")
  

app = FastAPI(
    title=settings.app_name,
    description="An API for a Filipino bakery, allowing customers to browse products and place orders, while providing an admin interface for managing inventory and orders.",
    version=settings.app_version,
)

app.include_router(api_router, prefix="/api/v1")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
