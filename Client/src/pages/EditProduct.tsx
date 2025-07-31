import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  slug: string;
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  image_url: string;
  category: string;
  rating: number;
  stock: number;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!product) return;
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]:
        name === "rating" || name === "stock" || name.includes("price")
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    // setSelectedImage(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/products/${product.id}/upload-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      setProduct({ ...product, image_url: data.image_url });
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleImageDelete = async () => {
    if (!product) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/products/${product.id}/delete-image`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      setProduct({ ...product, image_url: "" });
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to update");

      navigate("/admin");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  if (loading) return <p className="mt-20 text-center">Loading product...</p>;
  if (!product)
    return <p className="mt-20 text-center text-red-500">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-white rounded-xl shadow flex flex-col md:flex-row gap-6">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2">
        {product.image_url ? (
          <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg border">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${product.image_url}`}
              alt="Product"
              className="max-h-full max-w-full object-contain"
            />
            <button
              onClick={handleImageDelete}
              type="button"
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-300 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center border h-96 flex items-center justify-center rounded">
            No image
          </p>
        )}
        <div className="mt-3">
          <label className="block mb-1 font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full"
          />
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold mb-2">Edit Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          value={product.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="artist"
          value={product.artist}
          onChange={handleChange}
          placeholder="Artist"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="original_price"
          value={product.original_price}
          onChange={handleChange}
          placeholder="Original Price"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="current_price"
          value={product.current_price}
          onChange={handleChange}
          placeholder="Current Price"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
