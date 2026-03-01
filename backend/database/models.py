from pydantic import BaseModel, EmailStr

class Admin(BaseModel):
    id: int
    name: str
    email: EmailStr
    password: str

# TODO: implement the other data models
