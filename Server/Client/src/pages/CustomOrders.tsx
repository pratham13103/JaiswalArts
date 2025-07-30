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
    <div className="max-w-4xl mx-auto p-8 mt-24 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold text-center mb-4">
        Help Us Reach You with Customized Art
      </h2>
      <p className="text-lg text-gray-600 text-center mb-6">
        Describe your idea, select the art type, and upload a reference image if needed.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        {/* Name Input */}
        <div>
          <label className="block font-semibold mb-1">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block font-semibold mb-1">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-semibold mb-1">Art Category</label>
          <select
            className="w-full px-4 py-2 border rounded-md text-base"
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

        {/* File Upload */}
        <div>
          <label className="block font-semibold mb-1">
            Upload Reference Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-md text-base"
            onChange={handleFileChange}
          />
          {file && <p className="text-sm text-gray-500 mt-1">{file.name}</p>}
        </div>

        {/* Description Box (Full Width) */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Describe Your Art Idea</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md text-base"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about the custom art you want..."
            required
          ></textarea>
        </div>

        {/* Submit Button (Full Width) */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-orange-500 transition-all text-lg"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrders;
