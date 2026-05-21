'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
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
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    const privateRoutes = ['/add-pet', '/my-list', '/my-requests'];
    const isPrivateRoute =
      privateRoutes.includes(pathname) ||
      pathname.startsWith('/update-pet/') ||
      pathname.startsWith('/all-pets/');

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          if (isPrivateRoute) {
            router.push('/login');
          } else {
            router.refresh();
          }
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
    <nav className="sticky top-0 z-50 w-full bg-[#0F0821]/95 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform duration-300">
            <FaPaw size={24} />
          </div>
          <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
            PetNest
          </span>
        </Link>

        {/* Center: Desktop Links */}
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
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#C084FC] to-[#E879F9] transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Right Section: Profile & Hamburger */}
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
                <HiChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Card */}
              {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#1A0B40] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-white/5 mb-1">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                      Account
                    </p>
                    <p className="text-sm font-bold text-gray-200 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/my-requests"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-[#C084FC] font-bold transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="my-1 border-t border-white/5"></div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 font-black transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] text-white font-bold shadow-lg hover:shadow-pink-500/30 transition-all active:scale-95">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 h-screen w-[280px] bg-[#0F0821] shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-white/10`}
        >
          <div className="p-6 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              <FaPaw className="text-[#C084FC]" size={20} />
              <span className="font-black text-xl text-white">PetNest</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-white/5 rounded-lg text-white"
            >
              <HiX size={20} />
            </button>
          </div>

          <div className="flex flex-col p-4 gap-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-bold p-4 rounded-2xl transition-all ${isActive(link.href) ? 'bg-purple-500/10 text-[#C084FC]' : 'text-gray-300 hover:bg-white/5'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto p-6 border-t border-white/10">
            {!user ? (
              <Link href="/login">
                <button className="w-full py-4 bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20">
                  Login / Signup
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500">
                  {user.image ? (
                    <Image
                      src={user.image}
                      className="w-full h-full object-cover"
                      alt="user"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">
                      {user.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="text-sm font-bold text-gray-200 truncate">
                    {user.name}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-red-400 font-bold text-left hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
