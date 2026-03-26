# dependencies for admin

from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .auth import oauth2_scheme, verify_token
from .database import get_db
from ..models.user import User
from ..repository.user_repository import UserRepository

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_admin(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception

    email: str | None = payload.get("sub")
    if email is None:
        raise credentials_exception

    admin = UserRepository.get_by_email(db, email=email)
    if admin is None:
        raise credentials_exception

    return admin
