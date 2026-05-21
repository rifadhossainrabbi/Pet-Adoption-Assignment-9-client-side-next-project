'use client';
import React from 'react';
import { FaSearch, FaClipboardList, FaUserCheck, FaHome } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const AdoptionProcess = () => {
  const steps = [
    {
      title: 'Browse Pets',
      icon: <FaSearch />,
      color: 'text-blue-400',
      glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    },
    {
      title: 'Submit Request',
      icon: <FaClipboardList />,
      color: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(251,146,60,0.3)]',
    },
    {
      title: 'Approval',
      icon: <FaUserCheck />,
      color: 'text-green-400',
      glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]',
    },
    {
      title: 'Bring Home',
      icon: <FaHome />,
      color: 'text-purple-400',
      glow: 'shadow-[0_0_20px_rgba(192,132,252,0.3)]',
    },
  ];

  return (
    <section className="bg-[#050211] py-16">
      <div className="container mx-auto px-4 md:px-0">
        {/* main container */}
        <div className="bg-[#120D26]/60 backdrop-blur-xl rounded-[40px] p-10 md:p-16 border border-white/5 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center md:text-left">
            Adoption{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              Process
            </span>
          </h2>

          {/* steps */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* each step */}
                <div className="flex flex-col items-center text-center group w-full md:w-auto">

                  <div
                    className={`relative w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${step.glow}`}
                  >
                    {/* backgorund */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>

                    <div
                      className={`relative z-10 text-3xl ${step.color} transition-transform duration-500 group-hover:scale-110`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="text-gray-200 font-bold text-lg md:text-xl whitespace-nowrap group-hover:text-purple-400 transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* desktop arrow */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block text-purple-500/30 text-4xl mb-12 animate-pulse">
                    <HiOutlineArrowNarrowRight />
                  </div>
                )}

                {/* mobile arrow */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden text-purple-500/30 text-3xl rotate-90 my-2 animate-pulse">
                    <HiOutlineArrowNarrowRight />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;
