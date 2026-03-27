# api calls for admin

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from ..core.database import get_db
from ..schemas.user import Token
from ..core.auth import create_access_token
from ..services.user_service import UserService

# router setup
router = APIRouter(prefix="/users", tags=["Users"])

# login route
@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    """Admin Login: Returns a JWT token."""
    user = UserService.authenticate(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# get current user route
@router.get("/me", response_model=UserOut)
def get_current_user_info(
    current_user=Depends(get_current_user),
):
    """Get the current authenticated user (admin)"""
    return current_user


# register user route
@router.post("/register", response_model=UserOut)
def register_user(
    user_data: UserCreate,
    db: Annotated[Session, Depends(get_db)],
):
    """Register (post/create) a new user"""

    #check if user already exists
    existing_user = UserService.get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # create user
    new_user = UserService.create_user(db, user_data)
    return new_user
