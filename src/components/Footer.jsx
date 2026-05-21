'use client';
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

const socialLinks = [
  { Icon: FaFacebookF, color: 'hover:bg-blue-600', href: '#' },
  { Icon: FaInstagram, color: 'hover:bg-pink-600', href: '#' },
  { Icon: FaTwitter, color: 'hover:bg-sky-500', href: '#' },
  { Icon: FaYoutube, color: 'hover:bg-red-600', href: '#' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Pets', href: '/all-pets' },
  { label: 'My Requests', href: '/my-requests' },
  { label: 'Add Pet', href: '/add-pet' },
];

const contactInfo = [
  { Icon: FaMapMarkerAlt, text: 'Dhaka, Bangladesh', size: 14 },
  { Icon: FaPhoneAlt, text: '+880 1234-567890', size: 12 },
  { Icon: FaEnvelope, text: 'info@petnest.com', size: 14 },
];

const supportLinks = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const Footer = () => {
  return (
    <footer className="bg-[#050211] text-gray-400 py-12 md:py-16 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-transform group-hover:rotate-12">
                <FaPaw size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
                PetNest
              </span>
            </Link>
            <div className="text-sm leading-relaxed opacity-80">
              <p>Bringing pets and people together.</p>
              <p>Adopt. Love. Repeat.</p>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white ${item.color}`}
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C084FC] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="text-purple-500 bg-purple-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform shrink-0 mt-0.5">
                    <item.Icon size={item.size} />
                  </div>
                  <span className="truncate text-xs sm:text-sm">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">
              Support
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {supportLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C084FC] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5 flex justify-center items-center">
          <p className="text-xs md:text-sm font-medium opacity-60 text-center">
            &copy; {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
