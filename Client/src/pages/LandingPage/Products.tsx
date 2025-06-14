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
    <div className="px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Artworks</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/all-products")}
              className="px-8 py-3 text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md transition-all"
            >
              Explore All Products →
            </button>
          </div>

          <div className="relative">
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-gray-200 shadow"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mx-14">
              {visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="p-5 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform bg-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={`http://localhost:8000/${product.image_url}`}
                      alt={product.name}
                      className="w-full h-80 object-contain rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mt-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-base">{product.artist}</p>
                  <p className="text-sm mt-2">{product.description}</p>
                  <p className="mt-3 text-lg">
                    <span className="line-through text-gray-400 mr-2">
                      ₹{product.original_price}
                    </span>{" "}
                    <span className="text-red-600 font-bold">
                      ₹{product.current_price}
                    </span>
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
                        quantity:1  
                      })
                    }
                    className="mt-4 px-5 py-2 bg-blue-700 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-all"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-gray-200 shadow"
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
