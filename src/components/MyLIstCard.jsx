'use client';

import { authClient } from '@/lib/auth-client';
import React from 'react';
import MyListPetCard from './MyListPetCard';

const MyListCard = ({ allPets, clientRequests }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const filterData =
    allPets?.filter(item => item.ownerEmail === user?.email) || [];

  const totalListings = filterData.length;
  const adoptedCount = filterData.filter(
    pet => pet.status === 'adopted',
  ).length;
  const availableCount = totalListings - adoptedCount;

  if (isPending) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        My Listings
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
          <p className="text-blue-600 font-bold uppercase text-xs tracking-wider">
            Total Listings
          </p>
          <h2 className="text-4xl font-black text-blue-800">{totalListings}</h2>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm text-center">
          <p className="text-green-600 font-bold uppercase text-xs tracking-wider">
            Available
          </p>
          <h2 className="text-4xl font-black text-green-800">
            {availableCount}
          </h2>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 shadow-sm text-center">
          <p className="text-orange-600 font-bold uppercase text-xs tracking-wider">
            Adopted
          </p>
          <h2 className="text-4xl font-black text-orange-800">
            {adoptedCount}
          </h2>
        </div>
      </div>

      {/* my list pet card */}
      {filterData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterData.map(pet => (
            <MyListPetCard
              key={pet._id}
              pet={pet}
              clientRequests={clientRequests}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-lg font-medium">
            You haven't listed any pets yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyListCard;
