import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center relative">
      <div className="text-[120px] font-extrabold text-white flex items-center gap-4">
        <span>4</span>

        <div className="relative w-24 h-32 flex items-center justify-center animate-wiggle">
          <div className="absolute w-full h-full bg-white rounded-full rotate-12"></div>
          <div className="absolute w-14 h-14 bg-yellow-400 rounded-full shadow-md"></div>
        </div>

        <span>4</span>
      </div>

      <p className="text-white text-xl font-semibold mt-2">Oops! This link cracked 🍳</p>
      <p className="text-white opacity-80 mb-8">Looks like the recipe you're searching for isn't here.</p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#ff6f6f] hover:bg-[#ff5454] text-white font-medium rounded-full shadow-md transition-all"
      >
        GO HOME
      </Link>
    </div>
  );
}
