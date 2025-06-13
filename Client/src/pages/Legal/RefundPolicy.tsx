import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Refund Policy</h1>
      
      <p className="mb-4">
        At <strong>Jaiswal Arts</strong>, we value customer satisfaction and provide a hassle-free return & refund process under specific conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Returns Eligibility</h2>
      <p className="mb-4">Returns are only accepted within 7 days of delivery if the product is damaged or defective.</p>

      <h2 className="text-2xl font-semibold mt-6">2. Non-Refundable Items</h2>
      <p className="mb-4">Customized or commissioned artworks are non-refundable unless damaged in transit.</p>

      <h2 className="text-2xl font-semibold mt-6">3. Refund Process</h2>
      <p className="mb-4">Refunds will be processed within 5-7 business days after the returned product is inspected.</p>

      <h2 className="text-2xl font-semibold mt-6">4. Contact Us</h2>
      <p className="mb-4">For refund requests, please email us at <a href="mailto:support@jaiswalarts.com" className="text-red-600 underline">support@jaiswalarts.com</a>.</p>

      <p className="mt-8">For more details, visit our <a href="/contact" className="text-red-600 underline">Contact Page</a>.</p>
    </div>
  );
};

export default RefundPolicy;
