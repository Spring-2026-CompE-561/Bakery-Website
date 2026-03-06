from __future__ import annotations

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None


class UserCreate(UserBase):
    password: str  # Only used when creating/logging in


class User(UserBase):
    id: int

    class Config:
        from_attributes = True
