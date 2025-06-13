import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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

const ProductSearch: React.FC = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Get the query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    }

    // Fetch products from the backend
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
  }, [location]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-5 py-10 mt-32"> {/* Added mt-32 to offset the fixed navbar */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for: {searchQuery}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="p-4 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={`http://localhost:8000/${product.image_url}`}
                    alt={product.name}
                    className="w-full h-72 object-contain rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                </Link>

                <p className="text-gray-500">{product.artist}</p>
                <p className="text-sm mt-2">{product.description}</p>
                <p className="mt-2">
                  <span className="line-through text-gray-500">
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
                    })
                  }
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default ProductSearch;
