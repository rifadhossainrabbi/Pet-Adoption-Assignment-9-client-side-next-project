import React from 'react';
import { FaHeart, FaPiggyBank, FaSmile, FaStethoscope } from 'react-icons/fa';

const SaveLife = () => {
  const features = [
    {
      title: 'Save a Life',
      description: 'Give a pet a second chance at happiness.',
      icon: <FaHeart className="text-[#4ADE80] text-2xl" />, // Green
      glow: 'shadow-[0_0_20px_rgba(74,222,128,0.2)] border-green-500/20',
    },
    {
      title: 'Healthy Companion',
      description: 'Adopted pets are often healthier & happier.',
      icon: <FaStethoscope className="text-[#FB923C] text-2xl" />, // Orange
      glow: 'shadow-[0_0_20px_rgba(251,146,60,0.2)] border-orange-500/20',
    },
    {
      title: 'Save Money',
      description: 'Adoption is less expensive than buying.',
      icon: <FaPiggyBank className="text-[#FACC15] text-2xl" />, // Yellow
      glow: 'shadow-[0_0_20px_rgba(250,204,21,0.2)] border-yellow-500/20',
    },
    {
      title: 'Spread Love',
      description: 'Get unconditional love from your pet.',
      icon: <FaSmile className="text-[#F87171] text-2xl" />, // Red
      glow: 'shadow-[0_0_20px_rgba(248,113,113,0.2)] border-red-500/20',
    },
  ];

  return (
    <section className="bg-[#050211] py-10">
      <div className="container mx-auto px-4">
        {/* main card */}
        <div className="bg-[#120D26]/60 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl">
          {/* child section grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-5 group">
                {/* icon */}
                <div
                  className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center bg-white/5 border transition-all duration-500 group-hover:scale-110 ${item.glow}`}
                >
                  {item.icon}
                </div>

                {/* text content */}
                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[180px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveLife;
