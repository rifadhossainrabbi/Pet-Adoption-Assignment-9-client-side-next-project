'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { FaPaw } from 'react-icons/fa6';
import MyNavLinks from './MyNavLinks';

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  // Logic States
  const [open, setOpen] = useState(false); // Mobile Sidebar Toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile Dropdown Toggle
  const dropdownRef = useRef(null);

  // Close menus when changing pages
  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const privateRoutes = ['/add-pet', '/my-list', '/my-requests'];
    const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          setDropdownOpen(false);
          isPrivate ? router.push('/login') : router.refresh();
        },
      },
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Pets', href: '/all-pets' },
    { name: 'My Requests', href: '/my-requests' },
    { name: 'Add Pet', href: '/add-pet' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 bg-[#0F0821]/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white">
              <FaPaw size={24} />
            </div>
            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              PetNest
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-8 items-center">
            {navLinks.map(link => (
              <li key={link.href}>
                <MyNavLinks href={link.href}>{link.name}</MyNavLinks>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="h-10 w-24 bg-white/10 animate-pulse rounded-full"></div>
            ) : user ? (
              /* Desktop Dropdown */
              <div className="relative hidden lg:block md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full border border-white/10 transition-all"
                >
                  <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-purple-500/50 relative">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-purple-600 flex items-center justify-center text-white text-xs">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-gray-200 text-sm">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Box */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#1A1038] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden">
                    <Link
                      href="/my-requests"
                      className="block px-4 py-2 text-gray-200 font-semibold hover:bg-white/10 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <hr className="border-white/5 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-400 font-semibold hover:bg-white/10 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block px-6 py-2 bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white rounded-full font-bold"
              >
                Login
              </Link>
            )}

            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-3xl text-[#C084FC] cursor-pointer"
            >
              <HiOutlineMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}

      {/* Overlay blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-[110] ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-[#0F0821] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-[120] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setOpen(false)}
              className="text-3xl text-gray-400"
            >
              <HiX />
            </button>
          </div>

          {user && (
            <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500 shrink-0">
                  {user?.image ? (
                    <Image src={user.image} alt="User" width={48} height={48} />
                  ) : (
                    <div className="h-full w-full bg-purple-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden text-sm">
                  <p className="text-white font-bold truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/my-requests"
                onClick={() => setOpen(false)}
                className="block text-center py-2 bg-white/10 rounded-lg text-sm font-bold text-white hover:bg-white/20"
              >
                Dashboard
              </Link>
            </div>
          )}

          <ul className="flex flex-col gap-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <MyNavLinks href={link.href} onClick={() => setOpen(false)}>
                  {link.name}
                </MyNavLinks>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-xl border border-red-500/50 text-red-400 font-bold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
