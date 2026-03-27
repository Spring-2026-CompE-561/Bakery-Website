# database format for admin

from __future__ import annotations

from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional

# base user schema (email and name)
class UserBase(BaseModel):
    email: EmailStr
    name: str

# inherits email and name from UserBase
class UserCreate(UserBase):
    password: str # plain text password to be hashed before storing) 

# user response model sent to frontend
class UserOut(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# user response model internal (same as frontend) 
class User(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# UPDATE SCHEMA - For updating user info (all fields optional)
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    password: Optional[str] = None

# LOGIN SCHEMA
class UserLogin(BaseModel):
   email: EmailStr
   password: str

# JWT Token Response 
class Token(BaseModel):
    access_token: str
    token_type: str

# Token payload data
class TokenData(BaseModel):
    email: Optional[str] = None
