'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaPaw } from 'react-icons/fa6';
import Image from 'next/image';

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    const privateRoutes = ['/add-pet', '/my-list', '/my-requests'];
    const isPrivate =
      privateRoutes.includes(pathname) ||
      pathname.startsWith('/update-pet/') ||
      pathname.startsWith('/all-pets/');

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsOpen(false);
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
    { name: 'My Listings', href: '/my-list' },
  ];

  const isActive = path => pathname === path;

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#0F0821]/95 backdrop-blur-md border-b border-white/5 h-20">
      <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white">
            <FaPaw size={24} />
          </div>
          <span className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
            PetNest
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm lg:text-base font-bold transition-all relative group ${
                isActive(link.href)
                  ? 'text-[#C084FC]'
                  : 'text-gray-300 hover:text-[#E879F9]'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#C084FC] to-[#E879F9] transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-10 w-24 bg-white/10 animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pr-2 md:pr-3 hover:bg-white/5 rounded-full transition-all border border-white/10 group"
              >
                <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user?.name?.[0]}
                    </div>
                  )}
                </div>
                <span className="hidden lg:inline-block font-bold text-gray-200">
                  {user?.name.split(' ')[0]}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1A1038] border border-white/10 rounded-xl shadow-xl py-3 z-50">
                  <Link
                    href="/my-requests"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-200 font-semibold hover:bg-white/10"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-400 font-semibold hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white rounded-full font-bold"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200 text-3xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#0F0821] border-t border-white/10 flex flex-col gap-4 p-6 md:hidden">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-semibold ${
                  isActive(link.href) ? 'text-[#C084FC]' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-gray-300"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-left text-lg font-semibold text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
