import Image from 'next/image';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDog, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';

const PetDetails = ({ singlePet }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 h-full shadow-sm flex flex-col">
      {/* image and info */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* pet iamge */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm border border-gray-50">
            <Image
              src={singlePet.imageUrl}
              alt={singlePet.PetName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* pet text right side of image */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            {singlePet.PetName}
          </h1>

          <div className="flex items-center gap-1 text-gray-400 font-bold text-sm mb-4">
            <IoLocationOutline className="text-orange-500" size={18} />
            {singlePet.location}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 font-semibold">
              <FaDog className="text-orange-400" />
              <span>Species: {singlePet.species}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-semibold">
              <FaCalendarAlt className="text-orange-400" />
              <span>Age: {singlePet.age} Years</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-semibold">
              <FaVenusMars className="text-orange-400" />
              <span>Gender: {singlePet.gender}</span>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Adoption Fee
            </p>
            <p className="text-3xl font-black text-[#F36531]">
              ${singlePet.adoptionFee}
            </p>
          </div>
        </div>
      </div>

      {/* pet info botton */}
      <div className="mt-8 pt-8 border-t border-gray-100 flex-grow">
        <h3 className="text-xl font-black text-gray-800 mb-3">
          About {singlePet.PetName}
        </h3>
        <p className="text-gray-600 leading-relaxed font-medium">
          {singlePet.description}
        </p>

        {/* About pet */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs font-bold text-gray-400 uppercase">Health</p>
            <p className="font-bold text-gray-700">
              {singlePet.healthStatus || 'Healthy'}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Vaccination
            </p>
            <p className="font-bold text-gray-700">
              {singlePet.vaccinationStatus || 'Yes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
