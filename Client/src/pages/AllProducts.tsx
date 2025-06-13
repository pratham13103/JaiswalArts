import React, { useEffect, useState } from "react";
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

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-28 px-6 min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">All Products</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-5 border rounded-2xl shadow-md text-center bg-white hover:shadow-xl transition-transform hover:scale-105"
            >
              <Link to={`/products/${product.slug}`}>
                <img
                  src={`http://localhost:8000/${product.image_url}`}
                  alt={product.name}
                  className="w-full h-72 object-contain rounded-xl mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              </Link>
              <p className="text-gray-500 text-sm">{product.artist}</p>
              <p className="text-sm mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg">
                <span className="line-through text-gray-400 text-sm">₹{product.original_price}</span>{" "}
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
                  })
                }
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
