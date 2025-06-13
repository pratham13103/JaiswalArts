from sqlalchemy.orm import Session
from models import Product, User, Admin
from security import get_password_hash
from schemas import ProductResponse, UserResponse, AdminResponse

# Product Functions
def create_product(db: Session, product_data: dict):
    db_product = Product(**product_data)
    db.add(db_product)
    
    try:
        db.commit()
        db.refresh(db_product)
        print("Product added successfully:", db_product)

        return ProductResponse(**db_product.__dict__)
    except Exception as e:
        db.rollback()
        print("Error inserting product:", e)
        raise e

def delete_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        return None  # Product not found
    
    db.delete(product)
    try:
        db.commit()
        print(f"Product ID {product_id} deleted successfully")
        return True  # Successfully deleted
    except Exception as e:
        db.rollback()
        print("Error deleting product:", e)
        raise e

def get_products(db: Session):
    products = db.query(Product).all()
    return [ProductResponse(**p.__dict__) for p in products]

def get_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        return ProductResponse(**product.__dict__) 
    return None


# User Functions
def create_user(db: Session, user_data: dict):
    hashed_password = get_password_hash(user_data["password"])
    db_user = User(
        email=user_data["email"],
        hashed_password=hashed_password,
        firstname=user_data["firstname"],
        lastname=user_data["lastname"]
    )
    db.add(db_user)

    try:
        db.commit()
        db.refresh(db_user)
        print("User added successfully:", db_user)
        return UserResponse(**db_user.__dict__)
    except Exception as e:
        db.rollback()
        print("Error inserting user:", e)
        raise e

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Admin Functions
def create_admin(db: Session, admin_data: dict):
    hashed_password = get_password_hash(admin_data["password"])
    db_admin = Admin(
        first_name=admin_data["first_name"],
        last_name=admin_data["last_name"],
        email=admin_data["email"],
        hashed_password=hashed_password
    )
    db.add(db_admin)
    
    try:
        db.commit()
        db.refresh(db_admin)
        print("Admin added successfully:", db_admin)
        return AdminResponse(**db_admin.__dict__)
    except Exception as e:
        db.rollback()
        print("Error inserting admin:", e)
        raise e

def get_admin_by_email(db: Session, email: str):
    return db.query(Admin).filter(Admin.email == email).first()

def get_admin(db: Session, admin_id: int):
    return db.query(Admin).filter(Admin.id == admin_id).first()