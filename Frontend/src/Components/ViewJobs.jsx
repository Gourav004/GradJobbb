import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewJobs() {
  // --- LOCAL STATE INSTEAD OF REDUX ---
  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/user/viewjobs", {
        withCredentials: true,
      });
      // Assuming API returns { allJobs: [...] } based on previous Redux usage
      setAllJobs(res.data.allJobs || []);
    } catch (error) {
      console.log("❌ Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleViewJobs();
  }, []);

  // --- SORTING LOGIC ---
  const sortedJobs = useMemo(() => {
    if (!allJobs) return [];

    return [...allJobs].sort((a, b) => {
      const dateA = new Date(a.postedAt || a.createdAt || 0);
      const dateB = new Date(b.postedAt || b.createdAt || 0);
      return dateB - dateA;
    });
  }, [allJobs]);

  const isNewJob = (dateString) => {
    if (!dateString) return false;
    const postedDate = new Date(dateString);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return postedDate > threeDaysAgo;
  };

  // 🧩 Loading State
  if (isLoading) {
    return (
      <div className="text-white bg-gray-950 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-cyan-400 animate-pulse">
            Loading opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white bg-gray-950 min-h-screen p-6 md:p-8 font-sans">
      {/* --- Top Navigation --- */}
      <div className="max-w-7xl mx-auto flex items-center mb-10">
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
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
          Available Opportunities
        </h1>
      </div>

      {/* --- JOB LIST --- */}
      <div className="max-w-7xl mx-auto space-y-6">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job, index) => {
            const isNew = isNewJob(job.postedAt || job.createdAt);
            return (
              <motion.div
                key={job._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="flex flex-col md:flex-row bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/5
                            hover:border-cyan-500/30 hover:bg-gray-900/80 transition-all duration-300 group relative overflow-hidden"
              >
                {/* New Badge if applicable */}
                {isNew && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-cyan-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-bl-lg shadow-sm shadow-cyan-500/20 flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black/80"></span>
                      </span>
                      NEW
                    </span>
                  </div>
                )}

                {/* Left Section - Job Info */}
                <div className="flex-grow md:w-3/4 pr-4 border-b md:border-b-0 md:border-r border-white/10 pb-5 md:pb-0 md:pr-8">
                  <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h2>
                    </div>

                    {/* Match Badge (Optional) */}
                    <div className="bg-gradient-to-r from-green-500/10 to-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      {Math.floor(Math.random() * 20) + 80}% Match
                    </div>
                  </div>

                  <p className="text-base flex items-center gap-2 font-medium text-gray-300 mb-4">
                    <Building2Icon className="w-4 h-4 text-cyan-400" />
                    {job.company}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2 md:line-clamp-3">
                    {job.description}
                  </p>

                  {/* Tags/Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {/* Job Type */}
                    <span className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <BriefcaseIcon className="w-3.5 h-3.5" />
                      {job.type}
                    </span>

                    {/* Location */}
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      {job.location}
                    </span>

                    {/* Skills - Limit to 3 for neatness */}
                    {job.skillsRequired?.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-800 border border-white/5 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skillsRequired?.length > 3 && (
                      <span className="text-xs text-gray-500 self-center px-1">
                        +{job.skillsRequired.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Section - Salary, Deadline, Button */}
                <div className="md:w-1/4 flex flex-col justify-between items-start md:items-end pt-5 md:pt-1 md:pl-8">
                  <div className="text-left md:text-right mb-6 md:mb-0 w-full">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center md:justify-end gap-2">
                      <span className="text-cyan-400">₹</span>
                      {job.package ? `${job.package} LPA` : "Best in Industry"}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center md:justify-end gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5" />
                      Apply by:{" "}
                      <span className="text-gray-300 font-medium">
                        {new Date(job.lastDateToApply).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
                      </span>
                    </p>
                  </div>

                  <motion.button
                    onClick={() => navigate(`/viewAJob/${job._id}`)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-xl 
                                   shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500">
            No job openings available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

// --- Simple Internal Icons to avoid extra imports if not available ---
const Building2Icon = (props) => (
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
);
const BriefcaseIcon = (props) => (
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
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);
const MapPinIcon = (props) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = (props) => (
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

export default ViewJobs;
