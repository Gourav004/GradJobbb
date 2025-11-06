import React from "react";
import { motion } from "framer-motion";
// import { HiArrowUpRight } from "react-icons/hi"; // Removed this failing import

// --- Framer Motion Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- Button Animation ---
const buttonHover = {
  scale: 1.05,
  boxShadow: "0px 0px 20px rgba(6, 182, 212, 0.4)",
  transition: { type: "spring", stiffness: 200, damping: 10 },
};

const secondaryButtonHover = {
  scale: 1.05,
  boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
  transition: { type: "spring", stiffness: 200, damping: 10 },
};

const buttonTap = { scale: 0.97 };

// --- Floating Glow Animation ---
const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.6, 1, 0.6],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

// --- Floating Data Point Component ---
const FloatingPoint = ({ top, left, right, bottom, name, value, delay }) => {
  const positionClass = `
    ${top ? "top-1/4" : ""}
    ${left ? "left-3" : ""}
    ${right ? "right-3" : ""}
    ${bottom ? "bottom-16" : ""}
  `;

  return (
    <motion.div
      // Added `hidden sm:flex` to hide on mobile and show on larger screens
      className={`absolute text-white/50 text-xs sm:text-sm hidden sm:flex flex-col items-start p-2 cursor-pointer hover:text-white transition-colors duration-300 ${positionClass} z-10`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...pulseGlow,
        x: [0, 15 * (delay % 2 === 0 ? 1 : -1), 0],
        y: [0, 8 * (delay % 2 === 0 ? -1 : 1), 0],
      }}
      transition={{
        duration: 1,
        delay: 1 + delay * 0.2,
        x: { repeat: Infinity, duration: 7 + delay, ease: "easeInOut" },
        y: { repeat: Infinity, duration: 7 + delay, ease: "easeInOut" },
        ...pulseGlow.transition,
      }}
    >
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
        <span className="text-[10px] sm:text-xs">{name}</span>
      </div>
      <span className="text-[12px] sm:text-sm font-semibold ml-3">{value}</span>
    </motion.div>
  );
};

// --- Main Hero Component ---
export default function Hero() {
  return (
    <>
      {/* This style tag imports the fonts and adds the blob animation.
        In a real app, you'd put this in your index.html or global CSS file.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@300;600;700;800&display=swap');

        /* Keyframes for the 'animate-blob' class */
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
      `}</style>

      <div className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-['Inter',sans-serif]">
        {/* Background Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-full blur-3xl opacity-40 animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-400/40 to-transparent rounded-full blur-3xl opacity-40 animate-blob" />
        </div>

        <div className="relative z-10">
          {/* Navbar */}
          <nav className="flex justify-between items-center px-6 mt-5 sm:px-8 py-4 relative">
            {/* Left - Logo */}
            <div className="text-xl sm:text-2xl font-bold">
              Grad<span className="text-cyan-400">Job</span>
            </div>
            {/* Center - Glass Navigation Tabs */}
            <div
              className="
        absolute left-1/2 -translate-x-1/2 
        flex items-center gap-6 
        px-6 py-2 rounded-full 
        backdrop-blur-md bg-white/5 border border-white/10 
        text-gray-300 text-sm shadow-[0_0_12px_rgba(255,255,255,0.1)]
      "
            >
              <a
                href="#"
                className="text-white font-medium flex items-center gap-1 hover:scale-105  duration-150"
              >
                <span className="text-cyan-400 text-[10px]">●</span> Home
              </a>
              <a
                href="/admin"
                className="hover:text-white transition hover:scale-105  duration-150"
              >
                Admin
              </a>
              <a
                href="#"
                className="hover:text-white transition hover:scale-105  duration-150"
              >
                Showcase
              </a>
            </div>
            {/* Right - Login Button */}hover:scale-105 duration-150
            <motion.a
              href="/login"
              className="bg-cyan-500 text-white font-medium px-4 py-1 rounded-lg sm:text-base shadow-lg shadow-cyan-500/20"
              whileHover={buttonHover}
              whileTap={buttonTap}
              style={{ fontWeight: 500 }}
            >
              Login
            </motion.a>
          </nav>
          {/* Hero Section */}
          <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4 sm:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-3xl sm:max-w-5xl"
            >
              <motion.p
                variants={textItem}
                className="text-[10px] sm:text-sm text-cyan-400 font-medium mb-2 uppercase tracking-widest"
              >
                <span className="inline-block mr-2 animate-bounce">✨</span>
                The first step to your career.
              </motion.p>

              <motion.h1
                variants={textItem}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="text-3xl sm:text-5xl md:text-6xl font-light block">
                  Start your
                </span>
                <span className="text-cyan-400 text-5xl sm:text-7xl md:text-8xl block">
                  Job Journey
                </span>
              </motion.h1>

              <motion.p
                variants={textItem}
                className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-md sm:max-w-3xl mx-auto"
              >
                Explore curated graduate opportunities where innovation meets
                career growth. That starts here.
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
            >
              <motion.a
                href="/login"
                className="bg-white text-black  px-6 py-[10px] rounded-full font-medium text-sm sm:text-base transform-gpu select-none hover:border-white transition-all"
                whileHover={secondaryButtonHover}
                whileTap={buttonTap}
                style={{ fontWeight: 500 }}
              >
                Get Started
              </motion.a>
              <motion.a
                href="/explore"
                className="text-white flex items-center justify-center gap-3 border-2 border-white/50 px-2 py-1 sm:px-6 sm:py-2 rounded-full font-medium text-sm sm:text-base transform-gpu select-none hover:border-white transition-all"
                whileHover={secondaryButtonHover}
                whileTap={buttonTap}
                style={{ fontWeight: 500 }}
              >
                Learn More
                {/* <HiArrowUpRight className="ml-1" /> */}
                {/* Replaced the icon component with an inline SVG to fix the compile error */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
          {/* Floating Points */}
          <FloatingPoint top left name="Students" value="20,945" delay={1} />
          <FloatingPoint top right name="Colleges" value="2,345" delay={2} />
          <FloatingPoint bottom left name="Jobs" value="19,345" delay={3} />
          <FloatingPoint bottom right name="Recruiters" value="440" delay={4} />
        </div>
      </div>
    </>
  );
}
