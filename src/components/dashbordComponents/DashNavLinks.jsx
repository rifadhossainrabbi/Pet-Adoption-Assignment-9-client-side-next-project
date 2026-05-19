'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashNavLinks = ({ item }) => {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
        isActive
          ? 'bg-white/20 text-white border-l-4 border-amber-500' 
          : 'hover:bg-white/10 text-gray-300' 
      }`}
    >
      <Image
        src={item.icon}
        alt={item.name}
        width={20}
        height={20}
        className={`${
          isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
        }`}
      />
      <span className="font-medium">{item.name}</span>
    </Link>
  );
};

export default DashNavLinks;
