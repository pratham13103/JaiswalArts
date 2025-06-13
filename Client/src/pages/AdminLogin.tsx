import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/login/`, {
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

      localStorage.setItem("admin_token", data.access_token);
      console.log("Admin login successful!");
      navigate("/admin");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter your admin email"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/admin-signup" className="text-lg text-red-600 hover:underline">
            Don’t have an account? Sign up as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
