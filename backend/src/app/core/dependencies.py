from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
<<<<<<< HEAD
from app.core.auth import oauth2_scheme, verify_token
from app.core.database import get_db
from app.models.user import User
from app.repository.user_repository import UserRepository
=======
from .auth import oauth2_scheme, verify_token
from .database import get_db
from ..models.user import User
from ..repository.user_repository import UserRepository
>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)

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
