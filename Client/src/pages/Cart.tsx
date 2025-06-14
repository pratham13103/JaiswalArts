import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import axios from "axios";
import AuthModalManager from "../components/AuthModalManager"; // ✅ Import modal

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.currentPrice, 0);
  const isUserLoggedIn = !!localStorage.getItem("user_token");

  const handleCheckoutClick = () => {
    if (!isUserLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    handleCheckout();
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/payment/create-order`,
        {
          amount: Math.round(totalPrice * 100),
        }
      );

      const { id: order_id, amount, currency } = response.data;

      const options = {
        key: "rzp_test_3atWSJSG1w4ZSI",
        amount,
        currency,
        name: "Jaiswal Arts",
        description: "Artwork Purchase",
        order_id,
        handler: function () {
          alert("Payment Successful!");
        },
        prefill: {
          name: "Customer Name",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: { color: "#38a169" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment initiation failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h2 className="text-4xl font-bold mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-6 rounded-2xl shadow-lg flex items-center justify-between gap-6"
              >
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.name}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg"
                />
                <div className="flex-1 ml-6">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-lg text-gray-600">{item.artist}</p>
                  <p className="text-xl text-red-600 font-semibold mt-1">
                    ₹{item.currentPrice}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-7 h-7" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-right">
            <p className="text-2xl font-semibold">Total: ₹{totalPrice}</p>
            <button
              onClick={handleCheckoutClick}
              className="mt-4 px-8 py-3 text-xl bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showAuthModal && (
        <AuthModalManager
          trigger={<></>} // not needed here, optional
          onAuthSuccess={() => {
            setShowAuthModal(false);
            handleCheckout();
          }}
        />
      )}
    </div>
  );
};

export default Cart;
