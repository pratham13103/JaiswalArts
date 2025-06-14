import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

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
  quantity: number;
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Fetch Product Details
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/products/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Fetch Similar Products
  useEffect(() => {
    if (!product?.category) return;

    fetch(`http://localhost:8000/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data
          .filter(
            (item) =>
              item.category === product.category && item.id !== product.id
          )
          .slice(0, 3);
        setSimilarProducts(filtered);
      })
      .catch((err) => console.error("Error fetching similar products:", err));
  }, [product?.category, product?.id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product)
    return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="p-4 mt-12">
      {" "}
      {/* spacing below navbar */}
      {/* Product & Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Image + Details */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 h-[500px]">
            {/* Image Left */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center">
              <img
                src={`http://localhost:8000/${product.image_url}`}
                alt={product.name}
                className="h-80 object-contain rounded-lg"
              />
            </div>

            {/* Details Right */}
            <div className="flex flex-col justify-between w-full overflow-y-auto">
              <div>
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <p className="text-gray-500 mt-1">{product.artist}</p>
                <p className="text-lg mt-3">{product.description}</p>
                <p className="mt-2 text-gray-600">
                  <strong>Category:</strong> {product.category}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-lg">
                    {"★".repeat(product.rating).padEnd(5, "☆")}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">
                    ({product.rating} out of 5)
                  </span>
                </div>

                {/* Price */}
                <p className="mt-4">
                  <span className="line-through text-gray-500 text-xl">
                    ₹{product.original_price}
                  </span>{" "}
                  <span className="text-red-600 text-2xl font-bold">
                    ₹{product.current_price}
                  </span>
                </p>

                {/* Stock */}
                {product.stock > 0 ? (
                  <p className="mt-2 text-green-600 font-semibold">
                    In Stock: {product.stock}
                  </p>
                ) : (
                  <p className="mt-2 text-red-600 font-semibold">
                    Out of Stock
                  </p>
                )}
              </div>

              {/* Quantity and Buttons */}
              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-4 mt-4 flex-wrap">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    disabled={product.stock === 0}
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
                        quantity,
                      })
                    }
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      {/* Similar Products: Below full-width */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer p-2 border rounded-lg hover:shadow-md transition"
                onClick={() => navigate(`/products/${item.slug}`)}
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
