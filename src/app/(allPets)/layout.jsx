import Navbar from '@/components/Navbar';
import React from 'react';

const AllPetsLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AllPetsLayout;
