from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import AdminCreate, AdminResponse, TokenData, AdminLogin
from crud import create_admin, get_admin_by_email
from security import verify_password
from fastapi_jwt_auth import AuthJWT

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/register/", response_model=AdminResponse)
def register_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existing_admin = get_admin_by_email(db, admin.email)
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin email already registered")

    return create_admin(db, admin.dict())  # For Pydantic v1

@router.post("/login/", response_model=TokenData)
def login_admin(admin: AdminLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    db_admin = get_admin_by_email(db, admin.email)
    if not db_admin or not verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = Authorize.create_access_token(subject=db_admin.email)
    return {"access_token": access_token, "token_type": "Bearer"}
