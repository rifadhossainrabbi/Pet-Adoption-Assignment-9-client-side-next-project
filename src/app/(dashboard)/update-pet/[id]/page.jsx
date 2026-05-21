import UpdatePetForm from '@/components/UpdatePetForm';
import React from 'react';

const UpdatePet = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/pets/${id}`);
  const singlePet = await res.json();
  console.log(singlePet);

  return (
    <div>
      <UpdatePetForm singlePet={singlePet} />
    </div>
  );
};

export default UpdatePet;
