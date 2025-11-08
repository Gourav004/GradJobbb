import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminViewJobs() {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/admin/viewjobs", {
      withCredentials: true,
    });
    setJobs(res.data);
  };
  useEffect(async () => {
    await fetchJobs();
  }, []);

  if (!jobs || jobs.length === 0)
    return (
      <p className="text-gray-400 text-center py-10">No jobs posted yet.</p>
    );

  return (
    <div>
      <div className="flex items-center  gap-5 m-6">
        <a href="/admin/students" className="cursor-pointer group">
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

        <h2 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-300">
          All Posted Jobs
        </h2>
      </div>

      <div className="flex flex-col gap-4 p-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-neutral-900 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-gray-500"
          >
            {/* Left Section */}
            <div className="flex flex-col gap-1 w-full md:w-2/3">
              <h2 className="text-xl font-semibold text-white">{job.title}</h2>
              <p className="text-gray-300 text-sm">{job.company}</p>
              <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-3 text-sm">
                <span className="px-3 py-1 bg-neutral-800 text-gray-300 rounded-full border border-gray-700">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-neutral-800 text-gray-300 rounded-full border border-gray-700">
                  {job.mode}
                </span>
                <span className="px-3 py-1 bg-neutral-800 text-gray-300 rounded-full border border-gray-700">
                  {job.experienceLevel}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-start md:items-end w-full md:w-1/3 mt-4 md:mt-0">
              <p className=" font-medium text-cyan-400 text-2xl">
                ₹ {job.package} {job.salaryType}
              </p>
              <p className="text-gray-400 text-sm">{job.location}</p>
              <p className="text-gray-500 text-xs mt-2">
                Last Date: {new Date(job.lastDateToApply).toLocaleDateString()}
              </p>

              <a href={`/admin/viewJob/${job._id}`}>
                <button
                  className="mt-4 px-5 py-2 border border-white/20 text-black rounded-lg text-sm 
                 hover:text-black transition-all bg-white hover:scale-105  ease-linear
                  cursor-pointer  duration-200"
                >
                  View Details
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
