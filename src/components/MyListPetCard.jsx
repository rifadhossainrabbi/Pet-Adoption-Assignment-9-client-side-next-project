import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaRegEye, FaRegHeart, FaTrashAlt, FaUsers } from 'react-icons/fa';

const MyListPetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={pet.imageUrl}
                alt={pet.PetName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
            {pet.PetName}
          </h3>
          <span className="text-orange-600 font-black text-lg">
            ${pet.adoptionFee}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          {pet.species} • {pet.breed}
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* Requests Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95">
            <FaUsers size={14} />
            <span>Requests</span>
          </button>

          {/* Edit Button */}
          <Link
            href={`/dashboard/update-pet/${pet._id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95 text-center"
          >
            <FaEdit size={14} />
            <span>Edit</span>
          </Link>

          {/* View Button */}
          <Link
            href={`/all-pets/${pet._id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95 text-center"
          >
            <FaRegEye size={14} />
            <span>View</span>
          </Link>

          {/* Delete Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95">
            <FaTrashAlt size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListPetCard;
