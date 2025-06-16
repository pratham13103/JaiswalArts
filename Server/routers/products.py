import os
import re
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from schemas import ProductResponse
from crud import create_product, get_products, get_product, delete_product, update_product
from models import Product

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/slug/{slug}", response_model=ProductResponse)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(404, "Product not found")
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
    stock: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Save image
    image_path = f"{UPLOAD_DIR}/{image.filename}"
    with open(image_path, "wb") as buf:
        buf.write(image.file.read())

    slug = slugify(name)
    data = {
        "name": name,
        "artist": artist,
        "description": description,
        "original_price": original_price,
        "current_price": current_price,
        "category": category,
        "shape": shape,
        "stock": stock,
        "image_url": image_path,
        "slug": slug,
    }
    return create_product(db, data)


@router.get("/", response_model=list[ProductResponse])
def fetch_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def fetch_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product_route(
    product_id: int,
    payload: ProductResponse,
    db: Session = Depends(get_db),
):
    updated = update_product(db, product_id, payload.dict())
    if not updated:
        raise HTTPException(404, "Product not found")
    return updated


@router.delete("/{product_id}")
def delete_product_route(product_id: int, db: Session = Depends(get_db)):
    success = delete_product(db, product_id)
    if success is None:
        raise HTTPException(404, "Product not found")
    return {"message": "Product deleted successfully"}


@router.post("/{product_id}/upload-image")
async def upload_image(product_id: int, file: UploadFile = File(...)):
    """Save a new image file and return its path."""
    dest = f"{UPLOAD_DIR}/{file.filename}"
    with open(dest, "wb") as buf:
        buf.write(file.file.read())
    # In a real app you'd update DB; return new URL
    return {"image_url": dest}


@router.delete("/{product_id}/delete-image")
async def delete_image(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(404, "Product not found")

    image_path = product.image_url

    if image_path and os.path.exists(image_path):
        os.remove(image_path)
        # Optional: Clear the image_url in the DB
        product.image_url = None
        db.commit()
        return {"message": "Image deleted"}
    
    raise HTTPException(404, "Image file not found")

@router.get("/search", response_model=list[ProductResponse])
def search_products(
    query: str = "", 
    category: str = "", 
    db: Session = Depends(get_db)
):
    filters = []
    if query:
        filters.append(Product.name.ilike(f"%{query}%"))
    if category:
        filters.append(Product.category == category)
    return db.query(Product).filter(*filters).all()
