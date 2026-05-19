'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(session?.user);

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
    <nav className="bg-[#fae1d570] border-b border-gray-100 px-4 md:px-12 flex items-center justify-between sticky top-0 z-50 container mx-auto">
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
      {isPending ? (
        <span className="">Loading...</span>
      ) : user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-full transition-all focus:outline-none"
          >
            {/* User Image */}
            <div className="avatar">
              <div className="w-8 md:w-10 rounded-full ring ring-[#c6a635] flex items-center justify-center bg-[#c69335] text-white overflow-hidden">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold uppercase">
                    {user?.name?.[0]}
                  </span>
                )}
              </div>
            </div>

            <span className="text-gray-700 font-semibold hidden sm:inline-block">
              {user.name}
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
                href="/dashboard"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF7043] transition-colors"
              >
                Dashboard
              </Link>
              <div className="my-1 border-t border-gray-100"></div>
              <button
                className="w-full text-left block px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
                onClick={async () => authClient.signOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href={'/login'}>
          <button className="btn btn-sm md:btn-md border border-amber-600 bg-transparent text-amber-600  hover:bg-linear-to-r from-amber-300 to-amber-800 hover:text-white font-bold px-4 md:px-6">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
