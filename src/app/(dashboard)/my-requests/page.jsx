import ReqestCard from '@/components/ReqestCard';
import React from 'react';

const MyRequestsPage = async () => {
  const res = await fetch('http://localhost:5000/request');
  const clientRequest = await res.json();

  return (
    <div>
      <ReqestCard clientRequest={clientRequest} />
    </div>
  );
};

export default MyRequestsPage;
