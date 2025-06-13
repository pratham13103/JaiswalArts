import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  slug: string;
  image_url: string;
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
  rating: number;
  stock: number;
  specifications?: string[];
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Product Details
  useEffect(() => {
    let isMounted = true; // Prevent state update after unmounting
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/products/slug/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setProduct(data);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // Cleanup function to prevent state update
    };
  }, [slug]); // ✅ Re-fetch when `id` changes

  // ✅ Fetch Similar Products (Triggers after Product is Set)
  useEffect(() => {
    if (!product?.category) return;

    fetch(`http://localhost:8000/products`)
      .then((response) => response.json())
      .then((data: Product[]) => {
        const filteredProducts = data
          .filter((item) => item.category === product.category && item.id !== product.id)
          .slice(0, 3); // Limit to 3 similar products

        setSimilarProducts(filteredProducts);
      })
      .catch((err) => console.error("Error fetching similar products:", err));
  }, [product?.category, product?.id]); // ✅ Re-fetch when category or id changes

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 pt-32"> {/* Add pt-32 to prevent overlap with navbar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={`http://localhost:8000/${product.image_url}`}
          alt={product.name}
          className="w-full h-96 object-contain rounded-lg"
        />

        {/* Product Details */}
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-500 mt-2">{product.artist}</p>
          <p className="text-lg mt-4">{product.description}</p>
          <p className="mt-2 text-gray-600"><strong>Category:</strong> {product.category}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              {"★".repeat(product.rating).padEnd(5, "☆")}
            </span>
            <span className="text-gray-500 ml-2">({product.rating} out of 5)</span>
          </div>

          {/* Pricing */}
          <p className="mt-4">
            <span className="line-through text-gray-500 text-xl">₹{product.original_price}</span>{" "}
            <span className="text-red-600 text-2xl font-bold">₹{product.current_price}</span>
          </p>

          {/* Stock Availability */}
          {product.stock > 0 ? (
            <p className="mt-2 text-green-600 font-semibold">In Stock: {product.stock}</p>
          ) : (
            <p className="mt-2 text-red-600 font-semibold">Out of Stock</p>
          )}

          {/* Add to Cart Button */}
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Similar Products</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer p-2 border rounded-lg hover:shadow-md transition"
                onClick={() => navigate(`/products/${item.slug}`)} // ✅ Navigate on click
              >
                <img
                  src={`http://localhost:8000/${item.image_url}`}
                  alt={item.name}
                  className="w-full h-32 object-contain rounded"
                />
                <p className="text-center mt-2 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
