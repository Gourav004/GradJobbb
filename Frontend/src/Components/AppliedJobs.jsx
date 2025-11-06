import axios from "axios";
import React, { useEffect, useState } from "react";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/appliedJobs", {
        withCredentials: true,
      });

      // Add random progress for each job (UI-only)
      const jobsWithProgress = res.data.jobs.map((job) => ({
        ...job,
        progress: Math.floor(Math.random() * 100) + 1,
      }));

      setJobs(jobsWithProgress);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to get color for progress bar
  const getProgressColor = (value) => {
    if (value < 40) return "bg-red-500";
    if (value < 80) return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-6 md:p-10">
      {/* 🔹 Title */}
      <div className="flex items-center gap-4 mb-8">
        {/* Back Button */}
        <a href="/dashboard" className="group">
          <button
            className="
        flex items-center gap-2
        bg-[#0d0d0d] border border-cyan-500/40
        px-6 py-2 rounded-full font-semibold text-cyan-300
        transition-all duration-300 ease-out
        shadow-[0_0_10px_rgba(0,255,255,0.15)]
        hover:shadow-[0_0_20px_rgba(0,255,255,0.35)]
        hover:border-cyan-400
        hover:scale-105
        active:scale-95
      "
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
            <span className="text-[15px]">Back</span>
          </button>
        </a>

        {/* Clipboard Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-clipboard-check text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">
          Your Applied Jobs
        </h1>
      </div>

      {/* 🔹 Job Cards */}
      {jobs.length === 0 ? (
        <p className="text-gray-400 text-center mt-10 text-lg italic">
          No jobs applied yet 💼
        </p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="relative w-full md:w-[47%] bg-[#111827] border border-cyan-700/30 text-white p-6 rounded-2xl shadow-[0_0_12px_rgba(0,255,255,0.2)] hover:shadow-[0_0_22px_rgba(34,211,238,0.6)] hover:-translate-y-1 hover:border-cyan-400/60 transition-all duration-300"
            >
              {/* 🔹 Top Row */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-cyan-300">
                  {job.title}
                </h2>
                <span className="text-sm bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40">
                  {job.type}
                </span>
              </div>

              {/* 🔹 Company & Location */}
              <p className="text-gray-300 mb-3 font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_4px_#22d3ee] flex-shrink-0"
                >
                  <path d="M10 12h4" />
                  <path d="M10 8h4" />
                  <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                  <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                </svg>
                <span className="leading-none">{job.company}</span>
              </p>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {job.location} |{" "}
                  <span className="text-cyan-300">{job.mode}</span>
                </span>
              </div>

              {/* 🔹 Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skillsRequired.slice(0, 4).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-[#0f172a] border border-cyan-500/30 text-cyan-300 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* 🔹 Salary & Duration */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-3">
                <p className="flex items-center gap-2">
                  <svg
                    className="text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-banknote-icon lucide-banknote"
                  >
                    <rect width="20" height="12" x="2" y="6" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>{" "}
                  <span className="text-green-500 font-semibold">
                    {job.package} {job.salaryType}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  Duration:{" "}
                  <span className="text-cyan-300">{job.duration}</span>
                </p>
              </div>

              {/* 🔹 Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-100 mb-2">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>

                <div className="w-full h-3 bg-gray-700/80 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-3 ${getProgressColor(
                      job.progress
                    )} rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(0,255,255,0.4)]`}
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppliedJobs;
