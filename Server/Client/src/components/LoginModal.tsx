import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  switchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.detail
          ? Array.isArray(data.detail)
            ? data.detail.map((err: any) => err.msg).join(", ")
            : data.detail
          : "Invalid credentials.";
        setError(errorMessage);
        return;
      }

      localStorage.setItem("u_token", data.access_token);
      onSuccess?.(); // call parent callback
      onClose();     // close modal
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">✕</button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <span 
                onClick={switchToSignup}
                className="text-red-600 hover:underline cursor-pointer"
            >  
            Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
