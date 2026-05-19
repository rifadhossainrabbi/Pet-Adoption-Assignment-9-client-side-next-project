import Image from 'next/image';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaDog } from 'react-icons/fa6';

const PetDetails = ({ singlePet }) => {
  const {
    PetName,
    species,
    breed,
    age,
    gender,
    imageUrl,
    healthStatus,
    vaccinationStatus,
    location,
    adoptionFee,
    description,
  } = singlePet;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* left side pet image */}
        <div className="w-full md:w-[45%]">
          <div className="relative aspect-[5/5] w-full rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={imageUrl}
              alt={PetName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* pet info */}
        <div className="w-full md:w-[55%] space-y-8">
          {/* name and basic info */}
          <div>
            <h1 className="text-5xl font-black text-[#1A202C] mb-4">
              {PetName}
            </h1>
            <div className="flex items-center gap-3 text-gray-500 font-bold text-base">
              <span className="flex items-center gap-1.5">
                <FaDog className="text-orange-500" /> {species}
              </span>
              <span>•</span>
              <span>{age} Years</span>
              <span>•</span>
              <span>{gender}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 mt-3 text-sm font-bold">
              <IoLocationOutline size={20} className="text-orange-500" />
              <span>{location}</span>
            </div>
          </div>

          {/* speciess halthy and Vaccina*/}
          <div className="space-y-4 pt-4">
            <p className="text-gray-700 text-lg">
              <span className="font-extrabold text-[#1A202C]">Breed:</span>{' '}
              {breed}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-extrabold text-[#1A202C]">Health:</span>{' '}
              {healthStatus || 'Healthy'}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-extrabold text-[#1A202C]">Vaccinated:</span>{' '}
              {vaccinationStatus || 'Yes'}
            </p>
            <div className="pt-2">
              <p className="text-gray-700 text-lg font-extrabold">
                Adoption Fee:{' '}
                <span className="text-[#F36531] text-3xl ml-1 font-black">
                  ${adoptionFee}
                </span>
              </p>
            </div>
          </div>

          {/* Description part */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-2xl font-black text-[#1A202C] mb-3">
              About {PetName}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base font-medium">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
