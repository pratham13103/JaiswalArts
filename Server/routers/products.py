import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from schemas import ProductResponse
from crud import create_product, get_products, get_product, delete_product
from models import Product
import re

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)  # remove non-word characters
    text = re.sub(r'[\s_-]+', '-', text)  # replace spaces and underscores with hyphens
    text = re.sub(r'^-+|-+$', '', text)   # strip leading/trailing hyphens
    return text

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure upload folder exists

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/slug/{slug}", response_model=ProductResponse)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product

@router.post("/add-product/", response_model=ProductResponse)
def add_product(
    name: str = Form(...),
    artist: str = Form(...),
    description: str = Form(...),
    original_price: float = Form(...),
    current_price: float = Form(...),
    category: str = Form(...),
    shape: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Save image to uploads directory
    image_path = f"{UPLOAD_DIR}/{image.filename}"
    with open(image_path, "wb") as buffer:
        buffer.write(image.file.read())

    slug = slugify(name)

    # Create product entry in DB
    product_data = {
        "name": name,
        "artist": artist,
        "description": description,
        "original_price": original_price,
        "current_price": current_price,
        "category": category,
        "shape": shape,
        "image_url": image_path,
        "slug": slug,  
    }
    
    return create_product(db, product_data)

@router.get("/", response_model=list[ProductResponse])
def fetch_products(db: Session = Depends(get_db)):
    return get_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def fetch_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "id": product.id,
        "name": product.name,
        "artist": product.artist,
        "description": product.description,
        "original_price": product.original_price,
        "current_price": product.current_price,
        "category": product.category,
        "image_url": product.image_url,
        "rating": product.rating,  
        "stock": product.stock,    
        "slug": product.slug, 
    }


@router.delete("/{product_id}")
def delete_product_route(product_id: int, db: Session = Depends(get_db)):
    success = delete_product(db, product_id)
    
    if success is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}

@router.get("/search", response_model=list[ProductResponse])
def search_products(
    query: str = "", 
    category: str = "", 
    db: Session = Depends(get_db)
):
    # Build the filter condition
    filters = []
    if query:
        filters.append(Product.name.ilike(f"%{query}%"))  # Searching by product name
    if category:
        filters.append(Product.category == category)  # Filtering by category
    
    # Fetch products from the DB based on the filters
    products = db.query(Product).filter(*filters).all()

    return products
