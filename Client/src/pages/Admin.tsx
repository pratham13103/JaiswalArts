import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";

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
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 mt-16">
      <h2 className="text-2xl font-bold mb-4">Admin - Product List</h2>
      <button
        onClick={() => navigate("/add-product")}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 text-lg mb-6"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-6 shadow-lg min-h-[500px] flex flex-col"
          >
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${product.image_url}`}
              alt={product.name}
              className="w-full h-64 object-contain mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-1">{product.name}</h3>
            <p className="text-lg">{product.artist}</p>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-xl text-red-500 font-bold mt-2">
              ₹{product.current_price}
            </p>
            <p className="text-sm line-through text-gray-400">
              ₹{product.original_price}
            </p>
            <p className="text-sm">Rating: {product.rating}/5</p>
            <p className="text-sm mb-4">Stock: {product.stock}</p>
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-1"
              >
                <Pencil size={18} /> Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-1"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
