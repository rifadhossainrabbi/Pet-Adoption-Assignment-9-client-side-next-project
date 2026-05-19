'use client';
import React from 'react';
import Image from 'next/image';
import DashNavLinks from './DashNavLinks';

const DashBoardNavbar = () => {
  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '/assets/dashboard.png',
    },
    {
      name: 'My Requests',
      href: '/my-requests',
      icon: '/assets/businessman.png',
    },
    {
      name: 'Add Pet',
      href: '/add-pet',
      icon: '/assets/paw-print.png',
    },
    {
      name: 'My Listings',
      href: '/my-list',
      icon: '/assets/candidate.png',
    },
  ];

  const logOutIcon = '/assets/logout.png';

  return (
    <div className="w-64 min-h-screen bg-[#0d1b2a] text-white flex flex-col p-6 rounded-r-3xl">
      <nav className="">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.name}>
              <DashNavLinks item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-2">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-red-400 hover:text-red-500 transition-colors font-medium hover:cursor-pointer">
          <Image src={logOutIcon} alt="logout" width={20} height={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
