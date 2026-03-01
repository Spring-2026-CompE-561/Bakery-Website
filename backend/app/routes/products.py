from fastapi import APIRouter

router = APIRouter()

@router.get("/products") # route for products page
async def home():
    return {"message": "Welcome to the Bakery Products API!"}