import React from "react";
import { motion } from "framer-motion";

// --- Framer Motion Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

// --- Floating Data Point Component (Enhanced) ---
const FloatingPoint = ({ top, left, right, bottom, name, value, delay }) => {
  // Positioning logic
  const positionStyle = {};
  if (top) positionStyle.top = "20%";
  if (bottom) positionStyle.bottom = "15%";
  if (left) positionStyle.left = "5%";
  if (right) positionStyle.right = "5%";

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl z-20"
      style={positionStyle}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5, delay: 1 + delay * 0.2 },
        scale: { type: "spring", stiffness: 100, delay: 1 + delay * 0.2 },
      }}
    >
      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
        <div className="h-4 w-4 rounded-full bg-white animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-semibold">
          {name}
        </span>
        <span className="text-lg font-bold text-white leading-none">
          {value}
        </span>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Outfit:wght@300;400;600;800&display=swap');

        :root {
          --font-primary: 'Inter', sans-serif;
          --font-heading: 'Outfit', sans-serif;
        }

        /* Subtle Grid Background */
        .bg-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        
        /* Ambient light moving around */
        @keyframes move-light {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.4; }
          50% { transform: translate(50px, 30px) scale(1.1); opacity: 0.6; }
        }
        .animate-light { animation: move-light 8s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-['Inter',sans-serif] selection:bg-cyan-500/30">
        {/* --- ENHANCED BACKGROUND --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          {/* Main Spotlight */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-cyan-500/20 blur-[120px] rounded-full animate-light" />
          {/* Secondary Blobs */}
          <div
            className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full animate-pulse"
            style={{ animationDuration: "12s" }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-cyan-400/10 blur-[100px] rounded-full animate-pulse"
            style={{ animationDuration: "15s" }}
          />
        </div>

        <div className="relative z-10">
          {/* --- NAVBAR --- */}
          <nav className="flex justify-between items-center px-6 mt-6 sm:px-10 py-4">
            {/* Left - Logo */}
            <div
              className="text-2xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              
              Grad<span className="text-cyan-400">Job</span>
            </div>

            {/* Center - Glass Navigation Tabs (KEPT EXACTLY AS REQUESTED) */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-lg shadow-black/5">
              <a
                href="#"
                className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium flex items-center gap-2 transition-all hover:bg-white/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                Home
              </a>
              <a
                href="/admin"
                className="px-5 py-2 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/5"
              >
                Admin
              </a>
              <a
                href="#"
                className="px-5 py-2 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/5"
              >
                Showcase
              </a>
            </div>

            {/* Right - Login Button */}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            >
              Login
            </motion.a>
            {/* Mobile menu placeholder if needed */}
            <button className="sm:hidden text-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </nav>

          {/* --- HERO SECTION --- */}
          <div className="flex flex-col justify-center items-center min-h-[85vh] text-center px-4 relative">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-5xl mx-auto flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-300 text-sm font-medium mb-8"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                #1 Platform for Graduate Hiring
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="block text-white drop-shadow-2xl">
                  Kickstart your
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  Dream Career
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-3xl leading-relaxed"
              >
                Connect with top-tier companies, showcase your skills, and land
                your dream job. The future belongs to those who build it start
                building yours today.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              >
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-base shadow-xl hover:shadow-white/10 transition-all"
                >
                  Get Started Now
                </motion.a>
                <motion.a
                  href="/explore"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Floating Data Points (Desktop Only) */}
            <FloatingPoint
              top
              left
              name="Active Students"
              value="24K+"
              delay={0}
            />
            <FloatingPoint
              top
              right
              name="Partner Companies"
              value="500+"
              delay={1.5}
            />
            <FloatingPoint
              bottom
              left
              name="Opportunities"
              value="12K+"
              delay={0.8}
            />
            <FloatingPoint
              bottom
              right
              name="Success Rate"
              value="94%"
              delay={2.2}
            />
          </div>
        </div>
      </div>
    </>
  );
}
