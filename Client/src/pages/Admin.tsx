import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; 

interface Product {
  id: number;
  image_url: string;
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products
  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:8000/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
        setLoading(false);
      });
  };

  // Delete product function
  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId)); 
      } else {
        console.error("Failed to delete product.");
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <button
        onClick={() => navigate("/add-product")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Add New Product
      </button>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="w-full p-6 border rounded-lg shadow-lg relative">
              {/* Delete Icon */}
              <button
                onClick={() => handleDelete(product.id)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>

              <img
                src={`http://localhost:8000/${product.image_url}`}
                alt={product.name}
                className="w-full h-60 object-contain rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-500">{product.artist}</p>
              <p className="text-sm mt-2">{product.description}</p>
              <p className="mt-3">
                <span className="line-through text-gray-500">₹{product.original_price}</span>{" "}
                <span className="text-red-600 font-bold">₹{product.current_price}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
