from fastapi import FastAPI # backend
from .routes.home import router as home_router # home page route
from .routes.products import router as products_router # products page route

app = FastAPI(title="Bakery API")

# routes
app.include_router(home_router)
app.include_router(products_router)