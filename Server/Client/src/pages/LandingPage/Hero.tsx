import React from "react";
import ArtistSpotlight from "./ArtistSpotlight";
import Features from "./Features";
import Products from "./Products";
import Testimonials from "./Testimonials";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Unique & Handcrafted Artworks
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Elevate your space with exclusive creations from passionate artists.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="mt-8 flex space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link
              to="/all-products"
              className="px-6 py-3 text-lg font-semibold bg-red-600 hover:bg-orange-500 text-white rounded-lg transition-all"
            >
              Explore Artworks
            </Link>

            <Link
              to="/custom-orders"
              className="px-6 py-3 text-lg font-semibold border border-white hover:bg-white hover:text-black rounded-lg transition-all"
            >
              Custom Orders
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <Products />

      {/* Features Section */}
      <Features />

      {/* ArtistSpotlight Section */}
      <ArtistSpotlight />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Hero;
