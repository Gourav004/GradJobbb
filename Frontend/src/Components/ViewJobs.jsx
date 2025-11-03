import { showJobs } from "../Store/JobsSlice";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCardSkeleton from "./JobsShimmer.jsx";

function ViewJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((store) => store.jobs);

  const handleViewJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/viewjobs", {
        withCredentials: true,
      });

      console.log("✅ Jobs data:", res.data);
      dispatch(showJobs(res.data));
    } catch (error) {
      console.log("❌ Error:", error.message);
    }
  };

  useEffect(() => {
    handleViewJobs();
  }, []);

  // 🧩 Agar jobs ya jobs.allJobs exist nahi hai to error se bacho
  if (!jobs || !jobs.allJobs) {
    return (
      <div className="text-white bg-gray-900 min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          <JobCardSkeleton />
        </h1>
      </div>
    );
  }

  return (
    <div className="text-white bg-gray-950 min-h-screen p-8 font-sans">
      {/* Top Search Bar - SVG ke saath */}

      <a href="/" className="inline-block mb-6">
        <button className="text-white px-4 font-semibold py-2 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 shadow-md transition-all duration-300 hover:bg-white/25 active:scale-95 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5 mr-2" // Thoda sa bada icon
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-[14px]">Back to Home</span>{" "}
          {/* Thoda sa bada text */}
        </button>
      </a>

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">
        {jobs.message || "Available Job Openings"}
      </h1>

      <div className="space-y-6">
        {jobs.allJobs.map((job, index) => (
          <motion.div
            key={job._id}
            className="flex flex-col md:flex-row bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50
                       hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all duration-300 group"
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
          >
            {/* Left Section - Job Info */}
            <div className="flex-grow md:w-3/4 pr-4 border-b md:border-b-0 md:border-r border-gray-700/50 pb-4 md:pb-0 md:pr-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {job.title}
                </h2>
                <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  {Math.floor(Math.random() * 30) + 70}% match{" "}
                  {/* Dummy match */}
                </div>
              </div>

              <p className="text-lg font-semibold text-gray-300 mb-3">
                {job.company}
              </p>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {job.description}
              </p>

              {/* Tags/Badges with SVGs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Job Type Tag with Calendar SVG */}
                <span className="bg-blue-600/30 text-blue-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <svg
                    className="mr-1.5 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  Internship {/* Dummy data */}
                </span>

                {/* Location Tag with MapPin SVG */}
                <span className="bg-green-600/30 text-green-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <svg
                    className="mr-1.5 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {job.location}
                </span>

                {/* Dummy Skills */}
                {["React", "Node.js", "Tailwind", "MongoDB"]
                  .slice(0, Math.floor(Math.random() * 3) + 2)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Right Section - Salary, Deadline, Button */}
            <div className="md:w-1/4 flex flex-col justify-between items-end md:items-start pt-4 md:pt-0 md:pl-6">
              <div className="text-right md:text-left mb-6 md:mb-0">
                <p className="text-3xl font-bold text-green-400 mb-1 flex items-center">
                  {/* Salary SVG */}
                  <svg
                    className="text-green-500 mr-2 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.768 0-1.536.219-2.121.659-.955.715-.955 1.89 0 2.606l.879.659z"
                    />
                  </svg>
                  {job.package ? `₹${job.package} LPA` : "Competitive"}
                </p>
                <p className="text-gray-400 text-sm">
                  Deadline:{" "}
                  <span className="font-semibold text-red-400">
                    {new Date(job.lastDateToApply).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
              <motion.button
                className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all
                                 hover:bg-cyan-500 transform hover:scale-105 shadow-md hover:shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px -5px rgba(22, 163, 164, 0.4)", // Cyan shadow
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ViewJobs;
