import React from 'react';
import { FaBowlFood, FaDumbbell, FaStethoscope, FaPaw } from 'react-icons/fa6';
import { MdSecurity, MdPets, MdFavorite } from 'react-icons/md';

const PetCareTips = () => {
  // Pet Care Tips Data (ডেটা অপরিবর্তিত রাখা হয়েছে)
  const careTips = [
    {
      title: 'Good Food',
      desc: 'Provide nutritious food for your pet.',
      icon: <FaBowlFood />,
      color: 'text-orange-400',
      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]',
    },
    {
      title: 'Regular Exercise',
      desc: 'Keep your pet active and healthy.',
      icon: <FaDumbbell />,
      color: 'text-purple-400',
      glow: 'shadow-[0_0_15px_rgba(192,132,252,0.3)]',
    },
    {
      title: 'Health Check',
      desc: 'Regular vet check is important.',
      icon: <FaStethoscope />,
      color: 'text-pink-400',
      glow: 'shadow-[0_0_15px_rgba(244,114,182,0.3)]',
    },
  ];

  // Shelter Partners Data (ডেটা অপরিবর্তিত রাখা হয়েছে)
  const partners = [
    {
      name: 'Happy Paws',
      type: 'Shelter',
      icon: <FaPaw />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      name: 'Safe Haven',
      type: 'Pet Rescue',
      icon: <MdSecurity />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      name: 'Paws & Claws',
      type: 'Foundation',
      icon: <MdPets />,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      name: 'Love Animals',
      type: 'Shelter',
      icon: <MdFavorite />,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  ];

  return (
    <section className="bg-[#050211] py-16 space-y-12">
      <div className="container mx-auto px-4 md:px-0">
        {/* --- Section 1: Pet Care Tips (ডার্ক গ্লাস কন্টেইনার) --- */}
        <div className="bg-[#120D26]/60 backdrop-blur-xl rounded-[40px] p-10 md:p-16 border border-white/5 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-16 text-center md:text-left">
            Pet Care Tips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
            {careTips.map((tip, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* আইকন বক্স ছবির মতো ডার্ক সার্কেল */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-black/40 border border-white/10 transition-all duration-500 group-hover:scale-110 ${tip.glow}`}
                >
                  <span
                    className={`${tip.color} text-3xl transition-transform group-hover:rotate-12`}
                  >
                    {tip.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] opacity-80">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Section 2: Shelter Partners (আলাদা গ্লাস কন্টেইনার) --- */}
        <div className="mt-12 bg-[#120D26]/40 backdrop-blur-md rounded-[40px] p-10 border border-white/5">
          <h2 className="text-xl md:text-3xl font-black text-white mb-12">
            Shelter Partners
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* লোগো সার্কেল */}
                <div
                  className={`${partner.bg} w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 border border-white/5 shadow-lg shadow-black/20`}
                >
                  <span
                    className={`${partner.color} text-4xl opacity-80 group-hover:opacity-100`}
                  >
                    {partner.icon}
                  </span>
                </div>

                <h3 className="text-gray-200 font-bold text-base md:text-lg mb-1 group-hover:text-purple-400 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  {partner.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
