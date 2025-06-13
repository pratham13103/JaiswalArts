import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    artist: "",
    description: "",
    original_price: "",
    current_price: "",
    category: "",
    image: null as File | null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const categories = ["Mandala Art", "Warli Art", "Sketches", "Paintings"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("artist", product.artist);
    formData.append("description", product.description);
    formData.append("original_price", product.original_price);
    formData.append("current_price", product.current_price);
    formData.append("category", product.category);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch("http://localhost:8000/products/add-product/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Product added successfully!");
        setProduct({
          name: "",
          artist: "",
          description: "",
          original_price: "",
          current_price: "",
          category: "",
          image: null,
        });
        navigate("/admin"); // Redirect back to Admin page
      } else {
        setMessage("Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      {message && <p className="text-center text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
        <input type="text" name="artist" value={product.artist} onChange={handleChange} placeholder="Artist Name" className="w-full p-2 border rounded" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input type="number" name="original_price" value={product.original_price} onChange={handleChange} placeholder="Original Price" className="w-full p-2 border rounded" required />
        <input type="number" name="current_price" value={product.current_price} onChange={handleChange} placeholder="Current Price" className="w-full p-2 border rounded" required />
        
        <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
