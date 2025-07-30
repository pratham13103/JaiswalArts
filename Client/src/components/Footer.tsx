import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 text-white py-8 px-4 sm:px-8 w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        
        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center sm:justify-start flex-wrap gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-blue-700" />
            </a>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-base">
            <li><Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-base">
            <li><Link to="/custom-orders" className="hover:underline">Custom Art</Link></li>
            <li><Link to="/prints" className="hover:underline">Art Prints</Link></li>
            <li><Link to="/digital-art" className="hover:underline">Digital Art</Link></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-base">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/vision" className="hover:underline">Our Vision</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm sm:text-base">
        © {new Date().getFullYear()} Jaiswal Arts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
