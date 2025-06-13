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
        "from_attributes": True
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

    model_config = {
        "from_attributes": True
    }

# JWT settings
class Settings(BaseModel):
    authjwt_secret_key: str = "pratham123"

settings = Settings()

# Admin Schemas
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

    model_config = {
        "from_attributes": True
    }
