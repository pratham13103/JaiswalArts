import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/login"); // Redirect to login after registration
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Registration failed.");
      }
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
          Create an Account
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">
              First Name
            </label>
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
            <label className="block text-xl text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
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
            {loading ? "Creating Account..." : "Create an Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-lg text-red-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
