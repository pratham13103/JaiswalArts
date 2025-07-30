import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <p className="mb-4">
        At <strong>Jaiswal Arts</strong>, we respect your privacy and are committed to protecting your personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="mb-4">
        We collect personal information such as your name, email, and shipping address when you make a purchase or sign up.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your data to process orders, provide customer support, and send promotional offers (if opted-in).
      </p>

      <h2 className="text-2xl font-semibold mt-6">3. Data Security</h2>
      <p className="mb-4">
        Your personal data is stored securely and is not shared with third parties except for order processing.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to improve user experience. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6">5. Contact Us</h2>
      <p className="mb-4">
        For any privacy concerns, email us at <a href="mailto:privacy@jaiswalarts.com" className="text-red-600 underline">privacy@jaiswalarts.com</a>.
      </p>

      <p className="mt-8">
        For more details, visit our <a href="/contact" className="text-red-600 underline">Contact Page</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
