from __future__ import annotations

from sqlalchemy.orm import Session

<<<<<<< HEAD
from app.models.user import User
from app.repository.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.core.auth import get_password_hash, verify_password
=======
from ..models.user import User
from ..repository.user_repository import UserRepository
from ..schemas.user import UserCreate
from ..core.auth import get_password_hash, verify_password
>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)


class UserService:
    @staticmethod
    def create_new_user(db: Session, user_in: UserCreate) -> User | None:
        existing_user = UserRepository.get_by_email(db, user_in.email)
        if existing_user:
            return None

        hashed_pw = get_password_hash(user_in.password)

        db_user = User(
            email=user_in.email,
            hashed_password=hashed_pw,
            name=user_in.full_name,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def authenticate(db: Session, email: str, password: str) -> User | None:
        user = UserRepository.get_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
