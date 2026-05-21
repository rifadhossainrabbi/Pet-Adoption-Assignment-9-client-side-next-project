'use client';
import React from 'react';
import Image from 'next/image';
import { FaPaw, FaPlayCircle } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const Banner = () => {
  return (
    <section className="relative w-full bg-[#0F0821] overflow-hidden min-h-[600px] sm:min-h-[700px] lg:min-h-[850px] flex items-center">
      {/* ১. ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট এবং ডেকোরেশন */}
      <div className="absolute inset-0 z-0">
        {/* মেইন ডার্ক গ্রেডিয়েন্ট */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0821] via-[#1A0B40] to-[#3D1472]"></div>

        {/* নিওন গ্লো ইফেক্টস (সফট ডেকোরেশন) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 py-12 lg:py-0">
          {/* ২. বাম দিকের কন্টেন্ট (Text Content) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            {/* ট্যাগ */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6 mx-auto lg:mx-0">
              <FaPaw className="text-[#C084FC] animate-pulse" />
              <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest">
                Adopt. Love. Repeat.
              </span>
            </div>

            {/* হেডিং */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Find Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#E879F9] to-[#FF4D8D]">
                Companion
              </span>{' '}
              Today
            </h1>

            {/* প্যারাগ্রাফ */}
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80">
              Thousands of adorable pets are waiting for a loving home like
              yours. Start your journey of unconditional love today!
            </p>

            {/* বাটন গ্রুপ */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-pink-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                Adopt Now <HiArrowRight />
              </button>

              <button className="w-full sm:w-auto group flex items-center justify-center gap-3 text-white font-bold text-lg px-8 py-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-all">
                <FaPlayCircle className="text-2xl text-[#C084FC] group-hover:text-white transition-colors" />
                How It Works
              </button>
            </div>
          </div>

          {/* ৩. ডান দিকের ইমেজ (Pet Image & Floating Cards) */}
          {/* ৩. ডান দিকের ইমেজ (Pet Image & Floating Cards) */}
          {/* ৩. ডান দিকের ইমেজ (Pet Image & Floating Cards) */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* কার্ড কন্টেইনার */}
            <div className="relative w-[300px] sm:w-[420px] lg:w-[480px] xl:w-[520px]">
              {/* গ্লো ইফেক্ট (কার্ডের পেছনে) */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/10 blur-2xl rounded-3xl scale-110"></div>

              {/* মেইন কার্ড */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/50">
                {/* কার্ডের ভেতরের গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-pink-900/30"></div>

                {/* ইমেজ */}
                <Image
                  src="/assets/DogAndCatImage-removebg-preview.png"
                  alt="Happy Pets"
                  width={800}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain px-4 pt-6 pb-0"
                  priority
                />

                {/* কার্ডের নিচে সফট ফেড */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A0B40]/60 to-transparent z-20"></div>
              </div>

              {/* ফ্লোটিং কার্ড: ১০০০+ হ্যাপি ফ্যামিলি */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 z-30 bg-black/60 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex items-center gap-4 shadow-2xl animate-bounce duration-[4000ms]">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#C084FC] overflow-hidden bg-gray-800 shadow-lg"
                    >
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 15}`}
                        alt="user"
                        className="w-full h-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-black text-base sm:text-xl leading-none">
                    1000+
                  </h4>
                  <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-tighter mt-1">
                    Happy Families
                  </p>
                </div>
              </div>

              {/* ফ্লোটিং হার্ট আইকন */}
              <div className="absolute top-[15%] -left-4 sm:-left-6 z-30 bg-gradient-to-tr from-purple-500 to-pink-500 p-3 sm:p-4 rounded-full shadow-lg shadow-pink-500/30 animate-pulse">
                <span className="text-xl sm:text-2xl">❤️</span>
              </div>

              {/* ফ্লোটিং প-প্রিন্ট আইকন */}
              <div className="absolute top-[-12px] right-[15%] z-30 bg-[#F27121] p-3 sm:p-4 rounded-full shadow-lg shadow-orange-500/30 animate-bounce hidden sm:block">
                <FaPaw className="text-xl sm:text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
