import React from 'react';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className="relative w-full min-h-[400px] lg:h-[600px] flex items-center overflow-hidden bg-[#FFF9F8]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={'/assets/BannerImage2.png'}
          alt="Banner Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-end justify-between relative z-10 h-full">
        {/* Left Side: Content*/}
        <div className="w-full md:w-1/2 text-left py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A202C] leading-tight text-nowrap">
            Find Your New <br />
            <span className="text-[#FF7043]">Best Friend</span> Today
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-md leading-relaxed">
            Adopt a pet and give them a loving home. <br />
            They will love you forever!
          </p>

          <button className="mt-8 bg-[#FF7043] hover:bg-[#e65a2d] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all transform hover:scale-105 flex items-center gap-3">
            <span>🐾</span> Adopt Now
          </button>
        </div>

        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end items-end self-end">
          {/* Main Pet Image Dog & Cat */}
          <div className="relative z-20 w-[300px] md:w-[500px] lg:w-[600px] leading-[0] object-bottom">
            <Image
              src={'/assets/dogandCat.png'}
              alt="Happy Dog and Cat"
              width={700}
              height={600}
              className="object-contain object-bottom"
            />
          </div>

          {/* Animated elements */}
          <div className="absolute top-0 left-0 md:left-10 animate-bounce duration-[3000ms] opacity-60">
            <span className="text-4xl md:text-5xl text-[#FFB099]">🐾</span>
          </div>

          <div className="absolute top-10 right-0 md:right-5 bg-white p-3 rounded-full shadow-xl animate-pulse">
            <span className="text-2xl">❤️</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
