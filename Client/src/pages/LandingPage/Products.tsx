import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import TrendingProducts from "./TrendingProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  image_url: string;
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
  slug: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const PRODUCTS_PER_PAGE = 5;

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(products.length - PRODUCTS_PER_PAGE, 0) : prev - PRODUCTS_PER_PAGE
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + PRODUCTS_PER_PAGE >= products.length ? 0 : prev + PRODUCTS_PER_PAGE
    );
  };

  return (
    <div className="px-4 md:px-14 py-14 bg-gradient-to-br from-[#fefefc] to-[#f2e9e4]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Artworks</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-8">
            <button
              onClick={() => navigate("/all-products")}
              className="px-6 py-2 text-base font-semibold bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full hover:shadow-xl transition-all"
            >
              Explore All Products →
            </button>
          </div>

          {/* Mobile - Horizontal Scroll */}
          <div className="relative block lg:hidden">
            <div className="flex overflow-x-auto gap-6 no-scrollbar px-2">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="min-w-[80%] p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-md flex-shrink-0"
                  whileHover={{ scale: 1.03 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={`http://localhost:8000/${product.image_url}`}
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">{product.artist}</p>
                  <p className="text-sm mt-1 text-gray-600">{product.description}</p>
                  <p className="mt-2 text-base">
                    <span className="line-through text-gray-400 mr-2">₹{product.original_price}</span>
                    <span className="text-red-600 font-bold">₹{product.current_price}</span>
                  </p>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        artist: product.artist,
                        description: product.description,
                        image: product.image_url,
                        category: product.category,
                        originalPrice: product.original_price,
                        currentPrice: product.current_price,
                        quantity: 1,
                      })
                    }
                    className="mt-3 w-full py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop - Grid View with Navigation */}
          <div className="relative hidden lg:block">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-gray-300 p-3 rounded-full hover:bg-gray-100 z-10 shadow"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="grid grid-cols-5 gap-8 mx-12">
              {visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="p-5 rounded-2xl bg-white/60 border border-gray-200 shadow-md hover:shadow-lg backdrop-blur-md transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={`http://localhost:8000/${product.image_url}`}
                      alt={product.name}
                      className="w-full h-64 object-contain rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm">{product.artist}</p>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <p className="mt-3 text-lg">
                    <span className="line-through text-gray-400 mr-2">₹{product.original_price}</span>
                    <span className="text-red-600 font-bold">₹{product.current_price}</span>
                  </p>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        artist: product.artist,
                        description: product.description,
                        image: product.image_url,
                        category: product.category,
                        originalPrice: product.original_price,
                        currentPrice: product.current_price,
                        quantity: 1,
                      })
                    }
                    className="mt-4 w-full py-2 bg-blue-700 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-all"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-gray-300 p-3 rounded-full hover:bg-gray-100 z-10 shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      <TrendingProducts />
    </div>
  );
};

export default Products;
