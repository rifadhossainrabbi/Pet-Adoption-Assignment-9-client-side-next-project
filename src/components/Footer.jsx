import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaw,
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0a192f] text-gray-300 py-12 px-6 md:px-16 relative overflow-hidden container mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/Paw__1_-removebg-preview.png"
              alt="Logo"
              width={200}
              height={100}
              priority
            />
          </Link>
          <div className="text-sm space-y-1">
            <p>Bringing pets and people together.</p>
            <p>Adopt. Love. Repeat.</p>
          </div>
        </div>

        {/*Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-pets"
                className="hover:text-white transition-colors"
              >
                All Pets
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">
            Contact Info
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt size={18} className="text-orange-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt size={16} className="text-orange-400" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope size={18} className="text-orange-400" />
              <span>pawfind@email.com</span>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all text-white"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-all text-white"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-all text-white"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-all text-white"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; 2024 PawFind. All rights reserved.</p>
      </div>

      {/* Floating Paw Button (Bottom Right) */}
      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center shadow-lg border border-slate-600 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
          <FaPaw size={24} className="text-white opacity-80" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
