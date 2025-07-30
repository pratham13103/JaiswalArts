// src/pages/UnderDevelopment.tsx
import React from "react";

const UnderDevelopment: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[60vh] mt-20 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Page Under Development
        </h1>
        <p className="text-lg text-gray-600">
          We’re working hard to bring this page to life. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
