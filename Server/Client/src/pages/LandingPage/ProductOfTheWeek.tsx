import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  current_price: number;
}

const ProductOfTheWeek: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/products/slug/mandala-7")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !product) return null;

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          🌟 Product of the Week
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Hand-picked masterpiece that's capturing hearts this week.
        </p>

        <Link to={`/products/${product.slug}`}>
          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
            {/* Left: Product Image */}
            <img
              src={`http://localhost:8000/${product.image_url}`}
              alt={product.name}
              className="w-full lg:w-[400px] h-[400px] object-cover rounded-xl"
            />

            {/* Right: Product Info */}
            <div className="text-left space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h3>
              <p className="text-lg text-gray-700">{product.description}</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{product.current_price}
              </p>
              <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                View Product
              </button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ProductOfTheWeek;
