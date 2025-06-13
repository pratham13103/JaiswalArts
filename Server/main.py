from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # Import StaticFiles
from database import engine, Base
import models
from routers import products
from routers import users
from routers import admin
from fastapi_jwt_auth import AuthJWT 
from schemas import Settings
import os
from dotenv import load_dotenv
from routers import payment

app = FastAPI()

load_dotenv()
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

@AuthJWT.load_config
def get_config():
    return Settings()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Serve images from the uploads directory
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include product routes
app.include_router(products.router)
app.include_router(users.router)
app.include_router(admin.router)
app.include_router(payment.router)

@app.get("/")
def root():
    return {"message": "Welcome to JaiswalArts API"}
