from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import User, UserCreate
from app.services.user_service import UserService

router = APIRouter()

@router.post("/", response_model=User)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    # This calls the service to hash the password and save the user
    return UserService.create_new_user(db, user_in)

@router.get("/me", response_model=User)
def get_current_user():
    # This will be used later for authentication
    pass