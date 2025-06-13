from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import UserCreate, UserResponse, TokenData ,UserLogin
from crud import create_user, get_user_by_email
from security import verify_password
from fastapi_jwt_auth import AuthJWT

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register/", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user(db, user.model_dump())

@router.post("/login/", response_model=TokenData)
def login_user(user: UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = Authorize.create_access_token(subject=db_user.email)
    return {"access_token": access_token, "token_type": "Bearer"}

