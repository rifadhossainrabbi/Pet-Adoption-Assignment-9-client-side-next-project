import React from 'react';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';
import Link from 'next/link';
import PetCard from './PetCard';

const FeaturedPets = async () => {
  const res = await fetch('http://localhost:5000/pets', { cache: 'no-store' });
  const allPets = await res.json();

  const displayPets = allPets.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <FaPaw className="text-orange-500" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Featured Pets
          </h2>
        </div>
        <Link href={'/all-pets'}>
          <button className="px-6 py-2.5 border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm">
            View All Pets
          </button>
        </Link>
      </div>

      {/* pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {displayPets.map(pet => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPets;
