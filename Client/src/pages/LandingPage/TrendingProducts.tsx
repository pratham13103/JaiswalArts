import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ShoppingCart, MoveRight,} from "lucide-react";

const TrendingProducts: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const videoSources = [1, 2, 3, 4, 5];

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? videoSources.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === videoSources.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  const getIndex = (offset: number) => {
    if (selectedIndex === null) return 0;
    const length = videoSources.length;
    return (selectedIndex + offset + length) % length;
  };

  return (
    <div className="mt-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Trending Products
      </h2>

      {/* Horizontal Reel Display */}
      <div className="flex justify-center">
        <div className="flex gap-6 overflow-x-auto pb-6">
          {videoSources.map((num, index) => (
            <div
              key={num}
              className="relative w-[350px] h-[600px] rounded-2xl shadow-xl flex-shrink-0 group"
            >
              <video
                src={`/videos/${num}.mp4`}
                className="w-full h-full rounded-2xl object-cover cursor-pointer"
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setSelectedIndex(index)}
              />
              {/* View Details Button ON Video */}
              <button
                onClick={() => setSelectedIndex(index)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-orange-600 text-white font-medium rounded-md shadow hover:bg-orange-500 transition-all flex items-center gap-2"
              >
                View Details <MoveRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Explore All Products */}
      <div className="flex justify-center mt-10">
        <a
          href="/all-products"
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 rounded-full shadow-md transition-all"
        >
          Explore All Products
        </a>
      </div>

      {/* Overlay Reel Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#2a2a2a] flex items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 bg-white text-black rounded-full p-3 hover:bg-gray-200 z-20"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 bg-white text-black rounded-full p-3 hover:bg-gray-200 z-20"
          >
            <ChevronRight size={28} />
          </button>

          {/* Reel Display with Add to Cart */}
          <div className="flex flex-col items-center z-10">
            <div className="flex items-center gap-4 px-8 overflow-hidden">
              {[getIndex(-2), getIndex(-1)].map((idx) => (
                <video
                  key={`left-${idx}`}
                  src={`/videos/${videoSources[idx]}.mp4`}
                  className="w-[320px] h-[600px] rounded-xl blur-2xl opacity-25 pointer-events-none object-cover"
                  muted
                  playsInline
                />
              ))}

              <div className="relative">
                {/* Center Active Reel with Action Icons */}
                <div className="relative flex">
                  <video
                    src={`/videos/${videoSources[selectedIndex]}.mp4`}
                    className="w-[460px] h-[800px] rounded-xl border-4 border-white"
                    autoPlay
                    loop
                    controls
                    playsInline
                  />

                  {/* Icons to the Right */}
                  <div className="flex flex-col justify-center items-center gap-6 ml-4">
                    <button
                      onClick={() => alert("Added to Cart")}
                      className="bg-orange-200 text-orange-700 hover:bg-orange-300 p-3 rounded-full shadow-md transition"
                    >
                      <ShoppingCart size={24} />
                    </button>
                    <button
                      onClick={() => alert("Forward")}
                      className="bg-orange-200 text-orange-700 hover:bg-orange-300 p-3 rounded-full shadow-md transition"
                    >
                      <MoveRight size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {[getIndex(1), getIndex(2)].map((idx) => (
                <video
                  key={`right-${idx}`}
                  src={`/videos/${videoSources[idx]}.mp4`}
                  className="w-[320px] h-[600px] rounded-xl blur-2xl opacity-25 pointer-events-none object-cover"
                  muted
                  playsInline
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
