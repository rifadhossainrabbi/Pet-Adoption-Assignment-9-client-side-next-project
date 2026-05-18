import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white px-6 text-center relative overflow-hidden">
      {/* Pet icon */}
      <div className="relative mb-6">
        <div className="text-[130px] md:text-[180px] leading-none select-none">
          😿
        </div>
        {/* bubble */}
        <div className="absolute -top-4 -right-4 bg-[#FF7043] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full rotate-12 shadow-lg animate-pulse">
          Woof! I'm lost...
        </div>
      </div>

      {/* Main Content */}
      <h1 className="text-7xl md:text-9xl font-black text-gray-100 mb-2">
        404
      </h1>

      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
        The page you are looking for has wandered off like a curious puppy.
        Don't worry, we can help you find your way back to your furry friends!
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10">
        <Link
          href="/"
          className="bg-[#FF7043] hover:bg-[#e65a2d] text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
        >
          <span>🏠</span> Back to Home
        </Link>

        <Link
          href="/all-pets"
          className="border-2 border-gray-200 hover:border-[#FF7043] hover:text-[#FF7043] text-gray-600 px-10 py-4 rounded-full font-bold text-lg transition-all"
        >
          Browse All Pets 🐾
        </Link>
      </div>

      {/* Background Decorative Paw Prints */}
      <div className="absolute bottom-10 left-10 opacity-[0.03] hidden lg:block rotate-12 pointer-events-none">
        <span className="text-[200px]">🐾</span>
      </div>
      <div className="absolute top-20 right-10 opacity-[0.03] hidden lg:block -rotate-12 pointer-events-none">
        <span className="text-[150px]">🐾</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
