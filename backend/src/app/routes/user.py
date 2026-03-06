from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import User, UserCreate
from app.services.user_service import UserService

router = APIRouter()


@router.post("/")  # REMOVED response_model=User
def create_user(
    user_in: UserCreate,
    db: Annotated[Session, Depends(get_db)],
) -> User:
    return UserService.create_new_user(db, user_in)


@router.get("/me", response_model=User)
def get_current_user() -> any:
    # This will be used later for authentication
    pass
