import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import JobDetailSkeleton from "./JobCardShimmer.jsx";
import { useNavigate, useParams } from "react-router-dom";

function AdminViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const navigate = useNavigate();
  const controllerRef = useRef(null);

  // ✅ Optimized fetch with timeout + abort
  const fetchAJob = async (jobID) => {
    try {
      setLoading(true);
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const timeout = setTimeout(() => setLoading(false), 2500); // fallback

      const res = await axios.get(`http://localhost:5000/admin/jobs/${jobID}`, {
        withCredentials: true,
        signal: controllerRef.current.signal,
      });

      clearTimeout(timeout);
      setJob(res.data);
    } catch (error) {
      if (axios.isCancel(error)) console.log("Fetch cancelled");
      else console.error("Fetch job error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (JobID) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/admin/jobs/delete/${JobID}`,
        { withCredentials: true }
      );
      toast.success("Job Deleted Successfully");
      navigate("/admin/jobs");
    } catch (error) {
      console.log("ERROR in delete", error.message);
      toast.error("Something went wrong");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatPackage = (pkg, type) => {
    return `${pkg || "N/A"} ${type || ""}`;
  };

  useEffect(() => {
    fetchAJob(id);
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [id]);

  // ✅ Show shimmer until job data or timeout
  if (loading) return <JobDetailSkeleton />;

  if (!job) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        <p>Job not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl bg-gray-900 rounded-2xl shadow-2xl shadow-cyan-900/30 overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2 sm:mb-0">
              {job.title}
            </h1>
            <span className="flex-shrink-0 bg-cyan-800 text-cyan-100 text-xs font-semibold px-3 py-1 rounded-full self-start animate-pulse-slow">
              {job.type}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-200">{job.company}</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-200">{job.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Job Description
            </h2>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired?.length ? (
                job.skillsRequired.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-cyan-800 hover:text-white"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Not specified</p>
              )}
            </div>
          </div>

          {/* Branch */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">
              Eligible Branches
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.branch?.length ? (
                job.branch.map((b, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-cyan-800"
                  >
                    {b}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Not specified</p>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="w-full md:w-1/3 bg-gray-950/50 border-t-2 border-l-0 md:border-t-0 md:border-l-2 border-gray-800 p-6 sm:p-8">
          <div className="space-y-5">
            <InfoRow
              label="Package"
              value={formatPackage(job.package, job.salaryType)}
            />
            <InfoRow label="Duration" value={job.duration} />
            <InfoRow label="Mode" value={job.mode} />
            <InfoRow label="Min. CGPA" value={`${job.minCGPA}+`} />
            <InfoRow label="Experience" value={job.experienceLevel} />
          </div>

          {/* Buttons */}
          <div className="mt-16 flex flex-col items-center space-y-6">
            <button
              onClick={() => handleDelete(job._id)}
              className="w-full sm:w-[80%] flex items-center justify-center gap-2 
             bg-gradient-to-r from-red-600 to-red-700  cursor-pointer
             border border-red-500/40 py-3 rounded-lg font-semibold text-white 
             transition-all duration-300 ease-out hover:scale-105
             hover:from-red-600 hover:to-red-800 hover:border-red-400 
             hover:shadow-[0_0_20px_rgba(255,10,0,0.3)] 
             active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:rotate-6"
              >
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete Job
            </button>
            <a
              href="/admin/jobs"
              className="cursor-pointer group w-full sm:w-[80%]"
            >
              <button
                className="
      flex items-center justify-center gap-2 w-full bg-[#0d0d0d] border border-cyan-500/40 py-3 rounded-lg font-semibold text-cyan-300 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,255,0.15)]
      hover:shadow-[0_0_20px_rgba(0,255,255,0.35)] hover:border-cyan-400 hover:scale-105 active:scale-95 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                <span className="text-[15px]">View Jobs</span>
              </button>
            </a>

            <p className="text-center text-gray-400 text-sm mt-2">
              Last Date to Apply: {formatDate(job.lastDateToApply)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-lg font-semibold text-cyan-400">{value}</span>
  </div>
);

const Sparkles = () => (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
    {[...Array(15)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        initial={{ x: Math.random() * 120 - 60, y: -10, opacity: 1 }}
        animate={{
          y: Math.random() * 120 + 60,
          opacity: 0,
          x: Math.random() * 80 - 40,
        }}
        transition={{
          duration: Math.random() * 1.2 + 0.8,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

export default AdminViewJob;
