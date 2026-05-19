import DashBoardNavbar from '@/components/dashbordComponents/DashBoardNavbar';
import Navbar from '@/components/Navbar';
import React from 'react';

const DashBoardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-12 container mx-auto">
        <div className="col-span-2">
          <DashBoardNavbar />
        </div>
        <div className="col-span-10">{children}</div>
      </main>
    </>
  );
};

export default DashBoardLayout;
