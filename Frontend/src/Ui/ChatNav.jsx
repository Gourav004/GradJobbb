import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-[#111]  fixed top-0 text-white shadow-md border-b border-gray-800 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">
        <span className="text-white">Grad</span>Bot
      </h1>

      <a href="/dashboard" className="inline-block cursor-pointer group mr-6">
        <button className="flex items-center gap-2 bg-[#0d0d0d] border border-cyan-500/30 px-5 py-2.5 rounded-full font-semibold text-cyan-300 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] hover:border-cyan-400 hover:-translate-x-1 active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="text-sm">Back</span>
        </button>
      </a>
    </div>
  );
}

export default Navbar;
