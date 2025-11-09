import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NoDataFound from "./NoDataFound.jsx";

// --- ICONS ---
const Icons = {
  BackArrow: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  ),
  Clipboard: (props) => (
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  Building: (props) => (
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
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  ),
  Location: (props) => (
    <svg
      className="text-cyan-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Money: (props) => (
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
  Time: (props) => (
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/user/appliedJobs", {
        withCredentials: true,
      });

      // Add random progress for each job (UI-only demo)
      const jobsWithProgress = res.data.jobs.map((job) => ({
        ...job,
        progress: Math.floor(Math.random() * 100) + 1,
      }));

      setJobs(jobsWithProgress);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Improved color scheme for progress
  const getProgressStyles = (value) => {
    if (value < 40)
      return {
        bg: "bg-red-500",
        text: "text-red-400",
        label: "Application Received",
      };
    if (value < 80)
      return { bg: "bg-amber-500", text: "text-amber-400", label: "In Review" };
    return {
      bg: "bg-emerald-500",
      text: "text-emerald-400",
      label: "Shortlisted",
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-zinc-800 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-zinc-500 text-sm animate-pulse">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="group">
              <button className="flex items-center gap-2 bg-zinc-900/50 border border-cyan-500/50 px-4 py-2 rounded-full font-medium text-cyan-400 cursor-pointer hover:scale-105 transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 active:scale-95">
                <Icons.BackArrow className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm">Back</span>
              </button>
            </a>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Icons.Clipboard className="w-8 h-8 text-cyan-500" />
              Applied Jobs
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
            Total Applications:{" "}
            <span className="text-white font-semibold">{jobs.length}</span>
          </div>
        </div>

        {/* 🔹 Job Cards Grid */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-1 bg-zinc-900/20 border border-white/5 rounded-2xl">
            <p className="text-zinc-500 text-lg">
              <NoDataFound />
            </p>
            <a
              href="/jobs"
              className="mb-1 text-cyan-400 hover:underline text-sm"
            >
              Explore Jobs
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, index) => {
              const status = getProgressStyles(job.progress);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative bg-zinc-900/30 border border-white/5 rounded-2xl p-6 overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Row: Title & Type */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h2>
                        <p className="text-zinc-400 flex items-center gap-2 mt-1">
                          <Icons.Building className="w-4 h-4 text-cyan-500/70" />
                          {job.company}
                        </p>
                      </div>
                      <span className="text-xs font-medium bg-cyan-950/30 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                        {job.type}
                      </span>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap gap-4 text-sm text-blue-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Icons.Location className="w-4 h-4" />
                        <span>{job.location}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-300">{job.mode}</span>
                      </div>
                      {(job.package || job.duration) && (
                        <div className="flex items-center gap-1.5">
                          {job.package ? (
                            <>
                              <Icons.Money className="w-4 h-4 text-emerald-500/70" />
                              <span className="text-emerald-400">
                                {job.package} {job.salaryType}
                              </span>
                            </>
                          ) : (
                            <>
                              <Icons.Time className="w-4 h-4" />
                              <span>{job.duration}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Progress Section */}
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="text-xs text-zinc-500 uppercase font-medium mb-1">
                            Application Status
                          </p>
                          <p className={`text-sm font-semibold ${status.text}`}>
                            {status.label}
                          </p>
                        </div>
                        <span className="text-zinc-400 font-mono text-sm">
                          {job.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.2 + index * 0.1,
                            ease: "easeOut",
                          }}
                          className={`h-full ${
                            status.bg
                          } rounded-full shadow-[0_0_10px] shadow-${status.bg.replace(
                            "bg-",
                            ""
                          )}/50`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;
