import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-[#111]  fixed top-0 text-white shadow-md border-b border-gray-800 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-semibold text-cyan-400">
        GradBot
      </h1>
      <p className="hidden sm:block text-gray-400 text-sm">
        Powered by Gemini AI ⚡
      </p>
    </div>
  );
}

export default Navbar;
