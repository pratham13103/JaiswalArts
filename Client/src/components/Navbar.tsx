import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const categories = [
  "Mandala",
  "Warli",
  "Traditional",
  "Abstract",
  "Modern",
  "Landscape",
];

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false); // NEW
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setSearchBarOpen(false); // Close the bottom bar after click
    navigate(`/product-search?query=${category}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchBarOpen(false);
      navigate(`/product-search?query=${searchQuery}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Marquee */}
      <div className="bg-red-600 text-white py-2 text-lg font-semibold overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          <span className="mx-16">🎨 Get 20% OFF on your first order!</span>
          <span className="mx-16">🖌️ New Arrivals Just Dropped!</span>
          <span className="mx-16">🚚 Free Shipping on orders above ₹5000</span>
          <span className="mx-16">🎁 Custom Art Commissions Available – Contact us now!</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full flex items-center justify-between px-8 md:px-20 py-5 bg-white shadow-md/10 backdrop-blur-md shadow-md z-50 h-20">
        {/* Left: Website Title */}
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-red-700 to-orange-500 text-transparent bg-clip-text drop-shadow-md">
          Jaiswal Arts
        </h1>

        {/* Middle: Category Buttons (instead of search bar) */}
        <div className="hidden md:flex space-x-6 ml-10">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="text-lg font-semibold text-gray-700 hover:text-red-700 tracking-wide transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6 relative">
          {/* Search Icon */}
          <button
            onClick={() => setSearchBarOpen(!isSearchBarOpen)}
            className="text-gray-800 hover:text-red-600"
          >
            <Search className="h-8 w-8" />
          </button>

          {/* Profile Icon */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <User className="h-8 w-8 text-gray-800 hover:text-red-600" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Login
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => alert("Logged Out!")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-8 w-8 text-gray-800 hover:text-red-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Sidebar Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-800 hover:text-red-600 focus:outline-none"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-600 focus:outline-none"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="mt-16 flex flex-col space-y-6 px-6">
          <Link
            to="/about"
            className="text-lg text-gray-800 hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-800 hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/admin-login"
            className="text-lg text-gray-800 hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Search Bar Navbar below main nav */}
      {isSearchBarOpen && (
        <div className="w-full bg-white border-t border-b shadow-md py-6 px-8 md:px-20 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Search Input */}
          <form onSubmit={handleFormSubmit} className="flex w-full md:w-2/3 items-center border-2 border-red-600 rounded-lg px-4 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Search artwork..."
              className="w-full text-lg font-medium text-gray-700 bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Search className="h-6 w-6 text-red-600" />
            </button>
          </form>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-4 py-2 text-base font-semibold border border-red-500 text-red-700 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
