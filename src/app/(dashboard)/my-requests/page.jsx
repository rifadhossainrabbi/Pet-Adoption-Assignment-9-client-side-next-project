import React from 'react';

const MyRequestsPage = async() => {
   const res = await fetch('http://localhost:5000/request');
  const clientRequest = await res.json();
  console.log(clientRequest);
  return (
    <div>
      <h1>My Requests!</h1>
    </div>
  );
};

export default MyRequestsPage;
