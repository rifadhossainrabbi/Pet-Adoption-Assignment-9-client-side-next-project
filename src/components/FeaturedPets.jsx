import React from 'react';
import { FaPaw } from 'react-icons/fa';
import Link from 'next/link';
import PetCard from './PetCard';

const FeaturedPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets`, { cache: 'no-store' });
  const allPets = await res.json();
  const displayPets = allPets.slice(0, 6);

  return (
    <div className="bg-[#050211] py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <FaPaw className="text-[#C084FC] text-3xl" />
            <h2 className="text-2xl md:text-4xl font-black text-white">
              Featured Pets
            </h2>
          </div>
          <Link href={'/all-pets'}>
            <button className="px-6 py-2 border border-white/10 text-gray-300 font-bold rounded-full hover:bg-white/10 transition-all">
              View All Pets
            </button>
          </Link>
        </div>

        {/* Pets Grid - Updated to 6 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {displayPets.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPets;
