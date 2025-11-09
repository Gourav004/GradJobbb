import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Dashboard from "../assets/dashboard.png";
import Jobs from "../assets/jobs.png";
// --- Internal Icons (Lucide-style) ---
const DashboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const FilterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const ShieldCheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function Showcase() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
          <h2 className="text-cyan-400 font-bold tracking-widest uppercase animate-pulse">
            Loading Experience...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans overflow-hidden relative">
      {/* Dynamic Background Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-purple-600/30 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="text-center mb-24"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Platform Walkthrough
          </motion.h2>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            How to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Master
            </span>{" "}
            GradJob
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed"
          >
            Your journey from campus to career is powered by intelligent tools.
            Here's how to use the platform to land your dream role.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32"
        >
          {/* --- FEATURE 1: DASHBOARD --- */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
          >
            {/* Text Side */}
            <div className="md:w-5/12 order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <DashboardIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Your Personal Command Center
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Upon logging in, you're greeted by your{" "}
                <strong>Dashboard</strong>. It gives you a bird's-eye view of
                your job search:
              </p>
              <ul className="space-y-5">
                {[
                  "Track Total Openings vs. Applied jobs.",
                  "Monitor Market Activity trends with real-time graphs.",
                  "View your Top Skills matched against market demands.",
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="mt-1 p-1 bg-cyan-500/20 rounded-full">
                      <svg
                        className="w-4 h-4 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-lg">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Visual Side - FULL VISIBILITY FOR IMAGE */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="md:w-7/12 w-full order-1 md:order-2 perspective-1000"
            >
              <div className="relative group rounded-3xl">
                {/* Stronger Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-gradient-x"></div>

                <div className="relative bg-[#0d0d0d] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={Dashboard}
                    alt="Dashboard Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- FEATURE 2: JOB DISCOVERY --- */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20"
          >
            {/* Text Side */}
            <div className="md:w-5/12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <FilterIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Smart Job Discovery
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Navigate to the <strong>Opportunities</strong> page. Don't just
                browse—target the right roles with precision tools:
              </p>
              <ul className="space-y-5">
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="mt-1 p-1 bg-purple-500/20 rounded-full">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-lg">
                    <strong>Advanced Filters:</strong> Narrow down by{" "}
                    <span className="text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded-md text-sm mx-1 font-mono">
                      CGPA
                    </span>
                    ,
                    <span className="text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded-md text-sm mx-1 font-mono">
                      Location
                    </span>
                    , &
                    <span className="text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded-md text-sm mx-1 font-mono">
                      Skills
                    </span>
                    .
                  </span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="mt-1 p-1 bg-purple-500/20 rounded-full">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-lg">
                    <strong>Smart Match Score:</strong> Look for the green badge
                    (e.g.,{" "}
                    <span className="text-green-400 bg-green-950/50 border border-green-500/30 px-2 py-0.5 rounded-full text-sm font-bold mx-1">
                      98% Match
                    </span>
                    ).
                  </span>
                </motion.li>
              </ul>
            </div>
            {/* Visual Side - FULL VISIBILITY FOR IMAGE */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="md:w-7/12 w-full perspective-1000"
            >
              <div className="relative group rounded-3xl ">
                <div className="w-full absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-gradient-x"></div>
                <div className="relative bg-[#0d0d0d] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={Jobs}
                    alt="Jobs Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- FEATURE 3: ADMIN PANEL --- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-black border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group shadow-2xl"
          >
            {/* Decorative blobbies & Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none group-hover:bg-green-500/20 transition-colors duration-1000"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-2/3">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                    <ShieldCheckIcon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    For Recruiters: The Admin Nexus
                  </h3>
                </div>
                <p className="text-gray-300 text-xl mb-10 leading-relaxed">
                  GradJob isn't just for students. We provide a powerful, secure{" "}
                  <strong>Admin Panel</strong> for colleges and recruiters to
                  manage the entire hiring ecosystem efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Post Jobs",
                      desc: "Create detailed listings with required skills & criteria.",
                      color: "cyan",
                    },
                    {
                      title: "Manage Applicants",
                      desc: "View, shortlist, or reject applications centrally.",
                      color: "purple",
                    },
                    {
                      title: "Analytics",
                      desc: "Track placement stats and student performance.",
                      color: "green",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -5,
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }}
                      className="bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                      <h4
                        className={`text-${item.color}-400 font-bold text-lg mb-3`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-snug">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-56 h-56 bg-[#0a0a0a] border-[6px] border-gray-800/50 rounded-full flex items-center justify-center relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-full animate-pulse-slow"></div>
                  <div className="text-center">
                    <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-700 mb-2" />
                    <span className="text-2xl font-black text-gray-800 tracking-widest">
                      ADMIN
                    </span>
                  </div>
                  {/* Orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full absolute top-0 left-1/2 -ml-2 -mt-2 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mt-40"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-5 px-10 font-bold text-white bg-gray-900 border-2 border-cyan-500/50 shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_80px_rgba(0,255,255,0.4)] hover:border-cyan-400 hover:bg-cyan-950/30"
          >
            <span className="relative flex items-center gap-3 text-xl tracking-wide">
              Explore Dashboard Now
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Showcase;
