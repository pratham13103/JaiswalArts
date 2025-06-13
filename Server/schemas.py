from pydantic import BaseModel

# User Schemas
class UserBase(BaseModel):
    firstname: str
    lastname: str
    email: str

class UserLogin(BaseModel):
    email: str
    password: str
    
class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    model_config = {
        "from_attributes": True  # Pydantic v2 style
    }

class TokenData(BaseModel):
    access_token: str
    token_type: str

# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str

class ProductCreate(ProductBase):
    pass

class ProductResponse(BaseModel):
    id: int
    name: str
    artist: str
    description: str
    image_url: str
    original_price: float
    current_price: float
    category: str
    rating: float 
    stock: int  
    slug: str
    
    class Config:
        orm_mode = True

    model_config = {
        "from_attributes": True  # Enable SQLAlchemy ORM compatibility
    }

class Settings(BaseModel):
    authjwt_secret_key: str = "pratham123"  # Set your own secure key

settings = Settings()    

class AdminCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str

    class Config:
        from_attributes = True