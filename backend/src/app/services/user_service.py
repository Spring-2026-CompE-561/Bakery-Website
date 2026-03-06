from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.user import User
from app.repository.user_repository import UserRepository
from app.schemas.user import UserCreate

# We will add password hashing here later once we do 'core/auth.py'


class UserService:
    @staticmethod
    def create_new_user(db: Session, user_in: UserCreate) -> User | None:
        # Logic: Check if email is already taken
        existing_user = UserRepository.get_by_email(db, user_in.email)
        if existing_user:
            return None  # Or raise an error

        # For now, we save plain text (we will fix this in the Auth step!)
        db_user = User(
            email=user_in.email,
            hashed_password=user_in.password,  # Temporary!
            full_name=user_in.full_name,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
