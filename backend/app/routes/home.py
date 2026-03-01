from fastapi import APIRouter

router = APIRouter()

@router.get("/") # route for home page
async def home():
    return {"message": "Welcome to the Bakery API!"}

