import React, { useState } from "react";

const categories = ["Mandala Art", "Warli Art", "Sketch", "Painting", "Other"];

const CustomOrders: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Custom order submitted!");
    // You can send this data to the backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">
        Help Us Reach You with Customized Art
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Describe your idea, select the art type, and upload a reference image if needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block font-semibold mb-2">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block font-semibold mb-2">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-semibold mb-2">Art Category</label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description Box */}
        <div>
          <label className="block font-semibold mb-2">Describe Your Art Idea</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about the custom art you want..."
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Reference Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-md"
            onChange={handleFileChange}
          />
          {file && <p className="text-sm text-gray-500 mt-1">{file.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-orange-500 transition-all"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomOrders;
