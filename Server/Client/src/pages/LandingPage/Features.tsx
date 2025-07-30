import React from "react";
import { Paintbrush, ShieldCheck, CreditCard, Truck, Sparkles, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: <Paintbrush className="h-10 w-10 text-red-600" />,
    title: "Unique Artwork",
    description: "Explore a curated collection of exclusive and original artworks.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-red-600" />,
    title: "Verified Artists",
    description: "Buy from professional and verified artists with guaranteed authenticity.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-red-600" />,
    title: "Secure Payments",
    description: "Fast, easy, and secure transactions with multiple payment options.",
  },
  {
    icon: <Truck className="h-10 w-10 text-red-600" />,
    title: "Fast Delivery",
    description: "Get your favorite artwork delivered safely and on time.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-red-600" />,
    title: "Customization Available",
    description: "Request personalized artwork tailored to your needs.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-red-600" />,
    title: "Customer Support",
    description: "Dedicated 24/7 customer support to assist you with any queries.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Jaiswal Arts?</h2>
        <p className="text-lg text-gray-700 mb-12">Experience the best in fine arts with top-tier features.</p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
