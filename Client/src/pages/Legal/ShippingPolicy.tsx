import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Shipping Policy</h1>
      
      <p className="mb-4">
        We at <strong>Jaiswal Arts</strong> are committed to delivering your artwork safely and on time.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Processing Time</h2>
      <p className="mb-4">
        Orders are processed within 2-3 business days. Custom artwork may take longer.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. Shipping Rates</h2>
      <p className="mb-4">
        We offer free shipping on orders above ₹5000. Shipping charges for other orders vary based on location.
      </p>

      <h2 className="text-2xl font-semibold mt-6">3. Estimated Delivery Time</h2>
      <p className="mb-4">
        - Standard Shipping: 5-7 business days<br />
        - Express Shipping: 2-3 business days
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Tracking Orders</h2>
      <p className="mb-4">
        Once shipped, you will receive a tracking number via email.
      </p>

      <h2 className="text-2xl font-semibold mt-6">5. Contact Us</h2>
      <p className="mb-4">
        For shipping inquiries, email us at <a href="mailto:shipping@jaiswalarts.com" className="text-red-600 underline">shipping@jaiswalarts.com</a>.
      </p>

      <p className="mt-8">
        For more details, visit our <a href="/contact" className="text-red-600 underline">Contact Page</a>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
