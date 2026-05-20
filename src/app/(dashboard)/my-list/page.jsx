import MyLIstCard from '@/components/MyLIstCard';
import React from 'react';

const MyListPage = async () => {
  const res = await fetch('http://localhost:5000/pets');
  const allPets = await res.json();

  return (
    <div>
      <MyLIstCard allPets={allPets} />
    </div>
  );
};

export default MyListPage;
