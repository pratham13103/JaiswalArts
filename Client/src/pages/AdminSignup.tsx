import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          first_name: firstName,  // Change to match FastAPI schema
          last_name: lastName,    // Change to match FastAPI schema
          email, 
          password 
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.detail || "Signup failed. Try again.");
        return;
      }
  
      console.log("Admin signup successful!");
      navigate("/admin-login");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Admin Signup</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter your last name"
            />
          </div>

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

          <div>
            <label className="block text-xl text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-lg">
          Already have an account? 
          <a href="/admin-login" className="text-red-600 hover:underline ml-1">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;