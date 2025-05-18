"use client"
import React, { useState } from 'react';

const images = [
  'https://www.google.com/imgres?q=tailwind%20carousel%203d&imgurl=https%3A%2F%2Fwww.codewithfaraz.com%2Fblog_img%2Ftailwind-carousel-3d.webp&imgrefurl=https%3A%2F%2Fwww.codewithfaraz.com%2Farticle%2F160%2F12-tailwind-carousel-slider-examples&docid=bluAuMv0Ug52GM&tbnid=4285BDvDv09f5M&vet=12ahUKEwjZoM7fv62NAxUEmK8BHQiKMjEQM3oECBgQAA..i&w=1183&h=362&hcb=2&ved=2ahUKEwjZoM7fv62NAxUEmK8BHQiKMjEQM3oECBgQAA',
  'https://source.unsplash.com/800x300/?technology',
  'https://source.unsplash.com/800x300/?nature',
  'https://source.unsplash.com/800x300/?city',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 py-6">
      <p className="text-white mb-4">This is our carousel Component:</p>
      <div className="relative w-[800px] h-[300px] overflow-visible flex items-center justify-center">
        {/* Images */}
        <div className="flex transition-transform duration-500 ease-in-out relative">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;

            return (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className={`
                  absolute rounded-lg transition-all duration-500 shadow-lg
                  ${isActive ? 'z-20 scale-100 opacity-100' : ''}
                  ${isPrev || isNext ? 'z-10 scale-90 opacity-50' : 'opacity-0'}
                  ${isPrev ? '-translate-x-1/2 left-0' : ''}
                  ${isNext ? 'translate-x-1/2 right-0' : ''}
                  ${isActive ? 'left-1/2 -translate-x-1/2' : ''}
                `}
                style={{ width: '600px', height: '300px' }}
              />
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 z-30 bg-white/80 hover:bg-white text-black rounded-full p-2"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 z-30 bg-white/80 hover:bg-white text-black rounded-full p-2"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
