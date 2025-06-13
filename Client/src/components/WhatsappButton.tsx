import React from "react";

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/919422745853?text=Hi"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <img
        src="/whatsapp-icon.png"
        alt="Chat on WhatsApp"
        className="w-16 h-16 hover:scale-110 transition-transform duration-200"
      />
    </a>
  );
};

export default WhatsAppButton;
