import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const PetCard = ({ pet }) => {
  return (
    <div
      key={pet._id}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full"
    >
      {/* image container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.PetName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Heart Icon */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-md hover:bg-red-50 text-orange-500 hover:text-red-500 transition-all active:scale-90">
          <FaRegHeart size={18} />
        </button>
      </div>

      {/* Pet info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1 group-hover:text-orange-600 transition-colors">
          {pet.PetName}
        </h3>

        <p className="text-xs font-medium text-gray-500 mb-3 flex items-center gap-1">
          <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md">
            {pet.species}
          </span>
          <span>•</span>
          <span>{pet.age} Years</span>
        </p>

        <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-4 mt-auto">
          <IoLocationOutline size={14} className="text-orange-400" />
          <span className="truncate">{pet.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <span className="text-xs text-gray-400 font-medium">
            Adoption Fee
          </span>
          <div className="text-orange-600 font-black text-lg">
            ${Number(pet.adoptionFee)}
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Link href={`/all-pets/${pet._id}`}>
          <Button
            fullWidth
            variant="flat"
            color="warning"
            className="font-bold text-white bg-orange-400 hover:bg-orange-600 hover:text-white transition-colors duration-300"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
