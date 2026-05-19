import AdoptionForm from '@/components/AdoptionForm';
import PetDetails from '@/components/PetDetails';
import React from 'react';

const PetDetailsById = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/pets/${id}`);
  const singlePet = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 h-full">
          <PetDetails singlePet={singlePet} />
        </div>

        <div className="lg:col-span-4 h-full">
          <AdoptionForm singlePet={singlePet} />
        </div>
      </div>
    </div>
  );
};

export default PetDetailsById;
