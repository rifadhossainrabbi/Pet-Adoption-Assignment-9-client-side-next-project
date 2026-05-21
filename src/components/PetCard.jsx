'use client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const PetCard = ({ pet }) => {
  return (
    <div className="bg-[#120D26] rounded-[24px] border border-white/5 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden p-2">
        <div className="relative h-full w-full overflow-hidden rounded-[20px]">
          <Image
            src={pet.imageUrl}
            alt={pet.PetName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Heart Icon Overlay */}
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
              <FaHeart className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Pet info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-purple-400 transition-colors">
            {pet.PetName}
          </h3>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
              pet.sotck === 'Available'
                ? 'border-green-500/50 text-green-400 bg-green-500/10'
                : 'border-red-500/50 text-red-400 bg-red-500/10'
            }`}
          >
            {pet.sotck === 'Available' ? 'Available' : 'Adopted'}
          </span>
        </div>

        <p className="text-xs font-medium text-gray-400 mb-3 flex items-center gap-1">
          <span className="text-purple-400">{pet.species}</span>
          <span className="text-gray-600">•</span>
          <span>{pet.age} Years</span>
        </p>

        <div className="flex items-center gap-1 text-gray-500 text-[11px] mb-4 mt-auto">
          <IoLocationOutline size={14} className="text-purple-400" />
          <span className="truncate">{pet.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            Fee
          </span>
          <div className="text-[#FF4D8D] font-black text-xl">
            ${pet.adoptionFee}
          </div>
        </div>
      </div>

      {/* New Improved Buttons Design */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link href={`/all-pets/${pet._id}`}>
          <Button
            fullWidth
            size="sm"
            className="font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            Details
          </Button>
        </Link>
        <Link href={`/all-pets/${pet._id}`}>
          <Button
            fullWidth
            size="sm"
            className="font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            Adopt
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
