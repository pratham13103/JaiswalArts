from sqlalchemy import Column, Integer, String, Float
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    original_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False)
    image_url = Column(String, nullable=False)
    rating = Column(Float, nullable=False, default=0.0) 
    stock = Column(Integer, nullable=False, default=0)
    slug = Column(String, nullable=False, unique=True)
    shape = Column(String, nullable=True)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)    

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)    
