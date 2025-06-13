from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from razorpay_client import client

router = APIRouter(prefix="/payment", tags=["Payment"])

class OrderRequest(BaseModel):
    amount: int
    currency: str = "INR"

@router.post("/create-order")
def create_order(order: OrderRequest):
    if order.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    try:
        data = {
            "amount": order.amount,  # already in paisa
            "currency": order.currency,
            "payment_capture": 1
        }
        order_response = client.order.create(data=data)
        print("Razorpay Order:", order_response)
        return order_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
