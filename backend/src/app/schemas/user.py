from __future__ import annotations

from pydantic import BaseModel, EmailStr
from typing import Optional
<<<<<<< HEAD
=======

>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)


class UserBase(BaseModel):
    email: EmailStr
    name: str



class UserCreate(UserBase):
    password: str
<<<<<<< HEAD
=======

>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


<<<<<<< HEAD
=======

# For updating user info (all fields optional)
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    password: Optional[str] = None


>>>>>>> 42ed432 (Implement and test CRUD logic for all models; align schemas and logic with models)
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
