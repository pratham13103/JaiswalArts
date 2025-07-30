import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6 text-red-700">
        About Jaiswal Arts
      </h1>

      <p className="text-lg text-center mb-10">
        Jaiswal Arts is dedicated to showcasing unique and handcrafted artworks by talented artists from around the world. We believe in preserving the beauty of traditional and contemporary art forms, offering art lovers a platform to explore and purchase high-quality pieces.
      </p>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-red-600">Our Story</h2>
        <p className="text-lg">
          Founded with a passion for creativity and craftsmanship, Jaiswal Arts started as a small initiative to promote local artists. Over the years, we have grown into a trusted online art marketplace, connecting artists with collectors who appreciate the beauty of handmade and original artworks.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-red-600">Our Mission</h2>
        <p className="text-lg">
          Our mission is to bridge the gap between talented artists and art enthusiasts by providing a seamless platform for showcasing and selling artworks. We strive to make art accessible to everyone while ensuring fair compensation for artists.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-red-600">What We Offer</h2>
        <ul className="list-disc pl-6 text-lg">
          <li>Exclusive handmade artworks, including Mandala, Warli, and Sketches</li>
          <li>Custom orders for personalized art pieces</li>
          <li>Fair pricing with secure transactions</li>
          <li>A supportive platform for emerging and established artists</li>
        </ul>
      </section>

      {/* Meet the Artists */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-red-600">Meet the Artists</h2>
        <p className="text-lg">
          Jaiswal Arts collaborates with a diverse range of artists who bring unique styles and techniques to their work. Our platform is home to skilled painters, illustrators, and artisans who pour their creativity into each piece.
        </p>
      </section>

      {/* Contact Us */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-red-600">Get in Touch</h2>
        <p className="text-lg">We'd love to hear from you! If you have any inquiries, feel free to reach out to us.</p>
        <p className="text-lg mt-2 font-semibold">Email: support@jaiswalarts.com</p>
      </section>
    </div>
  );
};

export default About;