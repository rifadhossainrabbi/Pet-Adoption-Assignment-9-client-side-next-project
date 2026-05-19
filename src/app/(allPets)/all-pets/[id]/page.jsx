import PetDetails from '@/components/PetDetails';
import React from 'react';

const PetDetailsById = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/pets/${id}`);
  const singlePet = await res.json();
  console.log(singlePet);

  return (
    <div>
      <PetDetails singlePet={singlePet} />
    </div>
  );
};

export default PetDetailsById;
