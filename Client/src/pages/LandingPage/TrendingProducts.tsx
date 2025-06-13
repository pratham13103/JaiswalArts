import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

      {/* Horizontal Reels Display */}
      <div className="flex justify-center">
        <div className="flex gap-6 overflow-x-auto pb-6">
          {videoSources.map((num, index) => (
            <video
              key={num}
              src={`/videos/${num}.mp4`}
              className="w-[320px] h-[600px] rounded-2xl shadow-xl object-cover flex-shrink-0 cursor-pointer"
              autoPlay
              loop
              muted
              playsInline
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Overlay Reel Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#2a2a2a] flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 bg-black rounded-full p-3 hover:bg-gray-700 text-white z-20"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 bg-black rounded-full p-3 hover:bg-gray-700 text-white z-20"
          >
            <ChevronRight size={28} />
          </button>

          {/* Reel Display with 5 total: 2 blurred left, 1 center, 2 blurred right */}
          <div className="flex items-center gap-4 z-10 px-8 overflow-hidden">
            {/* Left 2 blurred reels */}
            {[getIndex(-2), getIndex(-1)].map((idx) => (
              <video
                key={`left-${idx}`}
                src={`/videos/${videoSources[idx]}.mp4`}
                className="w-[320px] h-[600px] rounded-xl blur-2xl opacity-25 pointer-events-none object-cover"
                muted
                playsInline
              />
            ))}

            {/* Center Active Reel */}
            <video
              src={`/videos/${videoSources[selectedIndex]}.mp4`}
              className="w-[460px] h-[800px] rounded-xl border-4 border-white"
              autoPlay
              loop
              controls
              playsInline
            />

            {/* Right 2 blurred reels */}
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
      )}
    </div>
  );
};

export default TrendingProducts;
