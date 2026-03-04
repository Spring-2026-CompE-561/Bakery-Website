from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str # Only used when creating/logging in

class User(UserBase):
    id: int

    class Config:
        from_attributes = True