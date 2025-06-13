import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review: "Absolutely stunning artwork! The quality and attention to detail are exceptional.",
  },
  {
    name: "Meera Kapoor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    review: "Beautiful pieces! The delivery was quick, and the painting exceeded my expectations.",
  },
  {
    name: "Rahul Verma",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 5,
    review: "Highly recommended! The colors are so vibrant, and the craftsmanship is top-notch.",
  },
  {
    name: "Simran Kaur",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    rating: 4,
    review: "Great experience! The artwork looks even better in real life than in the pictures.",
  },
  {
    name: "Vikram Patel",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 5,
    review: "Fantastic service and an amazing collection. Will definitely order again!",
  },
  {
    name: "Ananya Roy",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 5,
    review: "The painting is breathtaking! The colors and details are just perfect.",
  },
];

// Duplicate testimonials to create an infinite effect
const infiniteTestimonials = [...testimonials, ...testimonials];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          What Our Customers Say
        </h2>

        <motion.div
          className="flex space-x-6 w-max"
          animate={{ x: ["0%", "-100%"] }} // Move left continuously
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }} // Infinite smooth scrolling
        >
          {infiniteTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center min-w-[300px]"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-red-500"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <div className="flex my-2">
                {"★".repeat(testimonial.rating).padEnd(5, "☆").split("").map((star, i) => (
                  <span key={i} className="text-yellow-500 text-xl">{star}</span>
                ))}
              </div>
              <p className="text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
