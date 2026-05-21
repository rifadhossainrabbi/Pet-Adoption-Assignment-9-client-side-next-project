import React from 'react';
import Image from 'next/image';

const WhyAdoptPage = () => {
  return (
    <section className="bg-[#050211] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* main container */}
        <div className="relative overflow-hidden bg-[#120D26]/60 backdrop-blur-xl rounded-[40px] md:rounded-[60px] border border-white/5 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          {/* background */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

          {/* left side */}
          <div className="relative z-20 w-full md:w-1/2 px-8 md:pl-20 py-16 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              Why Adopt <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
                Pets?
              </span>
            </h2>

            <div className="space-y-6 mb-12 max-w-md mx-auto md:mx-0">
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed opacity-90">
                Every year, thousands of pets are left homeless. By adopting,
                you aren&apos;t just giving them a home—you&apos;re giving them
                a second chance at life.
              </p>

              {/* optional checklist */}
              <div className="flex flex-col gap-3 items-center md:items-start text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF4D8D]">✦</span>
                  <span className="text-sm font-semibold">
                    Save a life and find a best friend
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF4D8D]">✦</span>
                  <span className="text-sm font-semibold">
                    Unconditional love guaranteed
                  </span>
                </div>
              </div>
            </div>


            <button className="bg-gradient-to-r from-[#FF4D8D] to-[#F27121] hover:opacity-90 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-pink-500/20 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wide">
              Learn More
            </button>
          </div>


          <div className="relative z-10 w-full md:w-1/2 h-full flex items-end justify-center md:justify-end mt-10 md:mt-0 px-4 md:px-0">

            <div className="absolute bottom-0 right-0 w-[100%] h-[80%] bg-orange-500/10 blur-[100px] rounded-full"></div>

            <div className="relative w-[400px] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-square flex items-end">
              <Image
                src="/assets/dogAndCat-removebg-preview.png"
                alt="Cute Dog"
                width={800}
                height={800}
                className="object-contain object-bottom drop-shadow-[0_10px_50px_rgba(0,0,0,0.3)]"
                priority
              />

              <div className="absolute top-[20%] left-[-10%] animate-bounce duration-[4000ms] hidden lg:block">
                <span className="text-4xl opacity-30 rotate-[-15deg] inline-block">
                  ✨
                </span>
              </div>
              <div className="absolute bottom-20 left-0 animate-pulse hidden lg:block">
                <span className="text-3xl opacity-20 rotate-[20deg] inline-block text-pink-400">
                  🐾
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptPage;
