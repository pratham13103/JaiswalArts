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
    shape: "",
    stock: "",
    image: null as File | null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const categories = ["Mandala Art", "Warli Art", "Sketches", "Paintings"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    formData.append("shape", product.shape);
    formData.append("stock", product.stock);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/add-product/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Product added successfully!");
        setProduct({
          name: "",
          artist: "",
          description: "",
          original_price: "",
          current_price: "",
          category: "",
          shape: "",
          stock: "",
          image: null,
        });
        navigate("/admin");
      } else {
        setMessage("Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="text"
            name="artist"
            value={product.artist}
            onChange={handleChange}
            placeholder="Artist Name"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 text-lg border rounded h-32"
            required
          />
          <input
            type="number"
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="number"
            name="current_price"
            value={product.current_price}
            onChange={handleChange}
            placeholder="Current Price"
            className="w-full p-3 text-lg border rounded"
            required
          />
        </div>

        <div className="space-y-4">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 text-lg border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="shape"
            value={product.shape}
            onChange={handleChange}
            placeholder="Shape (e.g., Square, Round)"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 text-lg border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg font-semibold rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
