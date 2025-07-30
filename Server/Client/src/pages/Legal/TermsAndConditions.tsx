import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>
      
      <p className="mb-4">
        Welcome to <strong>Jaiswal Arts</strong>. These terms and conditions outline the rules and regulations for the use of our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
      <p className="mb-4">By accessing this website, we assume you accept these terms and conditions. Do not continue to use Jaiswal Arts if you do not agree.</p>

      <h2 className="text-2xl font-semibold mt-6">2. Intellectual Property Rights</h2>
      <p className="mb-4">All artworks, designs, and content on this site are the property of Jaiswal Arts and protected by copyright laws.</p>

      <h2 className="text-2xl font-semibold mt-6">3. Prohibited Activities</h2>
      <p className="mb-4">Users are prohibited from using the site for unlawful activities, spreading malware, or unauthorized commercial use.</p>

      <h2 className="text-2xl font-semibold mt-6">4. Product Descriptions</h2>
      <p className="mb-4">We strive to be accurate, but we do not guarantee that product descriptions are error-free.</p>

      <h2 className="text-2xl font-semibold mt-6">5. Governing Law</h2>
      <p className="mb-4">These terms are governed by and construed under the laws of India.</p>

      <p className="mt-8">For any questions, please <a href="/contact" className="text-red-600 underline">contact us</a>.</p>
    </div>
  );
};

export default TermsAndConditions;
