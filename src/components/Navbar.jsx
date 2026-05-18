'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 px-4 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Left side er Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/LogoLightMood-removebg-preview.png"
          alt="Logo"
          width={150}
          height={50}
        />
      </Link>

      {/* Middle side er  Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-semibold">
        <Link href="/" className="hover:text-[#FF7043] transition-colors">
          Home
        </Link>
        <Link
          href="/all-pets"
          className="hover:text-[#FF7043] transition-colors"
        >
          All Pets
        </Link>
        <Link
          href="/my-requests"
          className="hover:text-[#FF7043] transition-colors"
        >
          My Requests
        </Link>
        <Link
          href="/add-pet"
          className="hover:text-[#FF7043] transition-colors"
        >
          Add Pet
        </Link>
      </div>

      {/* Right side er Profile and Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-full transition-all focus:outline-none"
        >
          {/* User Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200">
            <Image
              src="/"
              alt="User Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-gray-700 font-semibold hidden sm:inline-block">
            Hi, Mahir
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
            <Link
              href="/profile"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF7043] transition-colors"
            >
              Dashboard
            </Link>
            <div className="my-1 border-t border-gray-100"></div>
            <button
              className="w-full text-left block px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
              onClick={() => console.log('Logout clicked')}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
