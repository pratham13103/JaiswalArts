import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import axios from "axios";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.currentPrice, 0);
  
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/payment/create-order", {
        amount: Math.round(totalPrice * 100),
        
      });

      const { id: order_id, amount, currency } = response.data;

      const options = {
        key: "rzp_test_3atWSJSG1w4ZSI", // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "Jaiswal Arts",
        description: "Artwork Purchase",
        order_id: order_id,
        handler: function (response: any) {
          console.log("Payment Success", response);
          alert("Payment Successful!");
        },
        prefill: {
          name: "Customer Name",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#38a169",
        },
      };

      const rzp = new (window as any).Razorpay(options); // ✅ Fixes the Razorpay type error
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-4 rounded-lg shadow-md flex items-center justify-between">
                <img src={`http://localhost:8000/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.artist}</p>
                  <p className="text-red-600 font-bold">₹{item.currentPrice}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-6 h-6" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
            <button onClick={handleCheckout} className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
