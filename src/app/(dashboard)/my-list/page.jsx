import MyLIstCard from '@/components/MyLIstCard';
import React from 'react';

const MyListPage = async () => {
  const resPets = await fetch('http://localhost:5000/pets', {
    cache: 'no-store',
  });
  const allPets = await resPets.json();

  const resReq = await fetch('http://localhost:5000/request', {
    cache: 'no-store',
  });
  const clientRequests = await resReq.json();

  return (
    <div>
      <MyLIstCard allPets={allPets} clientRequests={clientRequests} />
    </div>
  );
};

export default MyListPage;
