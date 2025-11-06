import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  const fetchAJob = async (jobID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/viewAJob/${jobID}`,
        {
          withCredentials: true,
        }
      );
      setJob(res.data?.job);

      console.log(res.data?.job);
    } catch (error) {
      console.log("Error Fetch jobs", error.message);
    }
  };
  const [isApplied, setIsApplied] = useState(false);

  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = () => {
    if (!isApplied) {
      setIsApplied(true);
      setShowSparkles(true);

      // Stop sparkles after a few seconds
      setTimeout(() => setShowSparkles(false), 2500);
    }

    toast.success("Applied Successfully");
    setTimeout(() => {
      navigate("/jobs");
    }, 3000);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Helper function to format package
  const formatPackage = (pkg, type) => {
    return `${pkg} ${type}`;
  };

  useEffect(() => {
    fetchAJob(id);
  }, [id]);
  return (
    <>
      {/* Global styles, including animations and scrollbar.
              In a real React app, this would be in a separate .css file or a styled-component.
              For a single-file component, this <style> tag works.
            */}
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    background-color: #000; /* Ensure body bg is black */
                }

                /* --- Custom Animations --- */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse-shadow {
                    0%, 100% {
                        box-shadow: 0 0 20px 0px rgba(56, 189, 248, 0.3); /* Lighter cyan glow */
                    }
                    50% {
                        box-shadow: 0 0 30px 10px rgba(56, 189, 248, 0.1); /* Wider, dimmer glow */
                    }
                }

                /* --- Animation Classes --- */
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
                
                .animate-slide-in-up {
                    animation: slideInUp 0.6s ease-out;
                }
                
                .animate-pulse-shadow {
                    animation: pulse-shadow 2.5s infinite;
                }

                /* Custom scrollbar for dark mode */
                ::-webkit-scrollbar {
                    width: 12px;
                }
                ::-webkit-scrollbar-track {
                    background: #000;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #1f2937; /* gray-800 */
                    border-radius: 20px;
                    border: 3px solid #000;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #374151; /* gray-700 */
                }
                `}
      </style>

      {/* Main container */}
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-4 sm:p-8">
        {/* Job Card */}
        <div className="w-full max-w-6xl bg-gray-900 rounded-2xl shadow-2xl shadow-cyan-900/30 overflow-hidden flex flex-col md:flex-row animate-fade-in">
          {/* Main Content (Left Side) */}
          <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-10">
            {/* Header: Title and Type */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 animate-slide-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2 sm:mb-0">
                {job.title}
              </h1>
              <span className="flex-shrink-0 drop-shadow-[0_0_6px_#22d3ee] animate-pulse-slow  bg-cyan-800 text-cyan-100 text-xs font-semibold px-3 py-1 rounded-full self-start">
                {job.type}
              </span>
            </div>

            {/* Meta: Company and Location */}
            <div
              className="flex items-center space-x-4 text-gray-400 mb-8 animate-slide-in-up"
              style={{ animationDelay: "200ms" }}
            >
              {/* Company Name */}
              <div className="flex items-center space-x-2">
                <svg
                  className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee] lucide lucide-building2-icon lucide-building-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 12h4" />
                  <path d="M10 8h4" />
                  <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                  <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                </svg>
                <span className="text-lg text-gray-200">{job.company}</span>
              </div>

              <span className="text-gray-600">|</span>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <svg
                  className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee] lucide lucide-map-pin-icon lucide-map-pin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-lg text-gray-200">{job.location}</span>
              </div>
            </div>

            {/* Job Description */}
            <div
              className="mb-8 animate-slide-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="text-cyan-300 drop-shadow-[0_0_10px_#22d3ee]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <h2 className="text-xl font-semibold text-cyan-300">
                  Job Description
                </h2>
              </div>

              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {/* Skills Required */}
            <div
              className="mb-8 animate-slide-in-up"
              style={{ animationDelay: "400ms" }}
            >
              {/* Icon + Heading Row */}
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-300 drop-shadow-[0_0_6px_#22d3ee]"
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx="4" cy="20" r="2" />
                </svg>

                <h2 className="text-xl font-semibold text-cyan-300">
                  Skills Required
                </h2>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-cyan-800 hover:text-white border-cyan-400 border-1 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Eligible Branches */}
            <div>
              <h2
                className="text-xl font-semibold text-cyan-300 mb-4 animate-slide-in-up flex items-center gap-2 relative"
                style={{ animationDelay: "500ms" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-badge-question-mark text-cyan-300 drop-shadow-[0_0_10px_#22d3ee] animate-pulse-slow"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
                <span className="text-cyan-300  animate-pulse-slow">
                  Eligible Branches
                </span>
              </h2>

              <div
                className="flex flex-wrap gap-2 animate-slide-in-up"
                style={{ animationDelay: "500ms" }}
              >
                {job.branch?.map((branch, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-cyan-800 hover:text-white border-cyan-400 border-1 hover:scale-105"
                  >
                    {branch}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Right Side) */}
          <div className="w-full md:w-1/3 bg-gray-950/50 border-t-2 border-l-0 md:border-t-0 md:border-l-2 border-gray-800 p-6 sm:p-8">
            {/* Details List */}
            <div className="space-y-5">
              <div
                className="flex justify-between items-center animate-slide-in-up"
                style={{ animationDelay: "700ms" }}
              >
                <span className="text-gray-400 font-medium">Package</span>
                <span className="text-lg font-semibold text-cyan-400">
                  {formatPackage(job.package, job.salaryType)}
                </span>
              </div>
              <div
                className="flex justify-between items-center animate-slide-in-up"
                style={{ animationDelay: "750ms" }}
              >
                <span className="text-gray-400 font-medium">Duration</span>
                <span className="text-lg font-semibold text-gray-200">
                  {job.duration}
                </span>
              </div>
              <div
                className="flex justify-between items-center animate-slide-in-up"
                style={{ animationDelay: "800ms" }}
              >
                <span className="text-gray-400 font-medium">Mode</span>
                <span className="text-lg font-semibold text-gray-200">
                  {job.mode}
                </span>
              </div>
              <div
                className="flex justify-between items-center animate-slide-in-up"
                style={{ animationDelay: "850ms" }}
              >
                <span className="text-gray-400 font-medium">Min. CGPA</span>
                <span className="text-lg font-semibold text-gray-200">
                  {job.minCGPA}+
                </span>
              </div>
              <div
                className="flex justify-between items-center animate-slide-in-up"
                style={{ animationDelay: "900ms" }}
              >
                <span className="text-gray-400 font-medium">Experience</span>
                <span className="text-lg font-semibold text-gray-200">
                  {job.experienceLevel}
                </span>
              </div>
            </div>
            <div
              className="mt-16 flex flex-col items-center justify-center space-y-6 animate-slide-in-up"
              style={{ animationDelay: "600ms" }}
            >
              {/* ✅ Apply Now Button */}
              <div className="relative flex flex-col items-center justify-center w-full">
                <motion.button
                  onClick={handleClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-full sm:w-[80%] bg-cyan-500 text-black font-bold text-lg py-3 px-8 rounded-lg 
        transition-all duration-300 ease-out overflow-hidden cursor-pointer
        ${isApplied ? "bg-green-500" : "hover:bg-cyan-400"}`}
                >
                  <AnimatePresence mode="wait">
                    {!isApplied ? (
                      <motion.span
                        key="apply-text"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                      >
                        Apply Now
                      </motion.span>
                    ) : (
                      <motion.div
                        key="tick"
                        initial={{ scale: 0, rotate: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1.3, 1],
                          rotate: [0, 360, 360],
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                        className="relative z-10 flex justify-center items-center"
                      >
                        <CheckCircle2 className="w-7 h-7 text-black drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* ✨ Falling Sparkles */}
                {showSparkles && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 overflow-visible">
                    {[...Array(20)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                        initial={{
                          x: Math.random() * 120 - 60, // random spread horizontally
                          y: -10,
                          opacity: 1,
                          scale: Math.random() * 0.8 + 0.4,
                        }}
                        animate={{
                          y: Math.random() * 120 + 60, // fall down
                          opacity: 0,
                          x: Math.random() * 80 - 40, // drift left/right
                        }}
                        transition={{
                          duration: Math.random() * 1.5 + 1.2,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ✅ Back to Jobs Button */}
              <a href="/jobs" className="w-full sm:w-[80%]">
                <button
                  className="w-full flex justify-center items-center gap-2 bg-[#0d0d0d] border border-cyan-500/40 py-3 rounded-lg 
                 font-semibold text-cyan-300 transition-all duration-300 ease-out 
                 shadow-[0_0_10px_rgba(0,255,255,0.15)] 
                 hover:shadow-[0_0_20px_rgba(0,255,255,0.35)] 
                 hover:border-cyan-400 hover:scale-105 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span className="text-[15px]">Back to Jobs</span>
                </button>
              </a>

              {/* ✅ Last Date */}
              <p className="text-center text-gray-400 text-sm mt-2">
                Last Date to Apply: {formatDate(job.lastDateToApply)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewJob;
