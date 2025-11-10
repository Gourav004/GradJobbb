import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  Wallet,
  ArrowLeft,
  Clock,
} from "lucide-react";

export default function AdminViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://gradjob.onrender.com/admin/viewjobs",
        {
          withCredentials: true,
        }
      );
      const sortedJobs = res.data.sort(
        (a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0)
      );

      setJobs(sortedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-zinc-500 font-medium animate-pulse">
          Loading posted jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/students")}
              className="group flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full font-medium text-zinc-400 transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-cyan-500" />
              Posted Jobs
            </h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl">
            <span className="text-zinc-400 text-sm">Total Active Jobs:</span>
            <span className="text-white font-bold text-lg">{jobs.length}</span>
          </div>
        </div>

        {/* --- JOB LIST --- */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/20 border border-zinc-800/50 border-dashed rounded-3xl">
            <Briefcase className="w-16 h-16 text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-lg">No jobs posted yet.</p>
            <button
              onClick={() => navigate("/admin/postJob")}
              className="mt-6 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between">
                  {/* Left Section: Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </h2>
                        <p className="text-zinc-400 flex items-center gap-2 mt-1.5 font-medium">
                          <Building2 className="w-4 h-4 text-cyan-500/70" />
                          {job.company}
                        </p>
                      </div>
                      {/* Status Badge (Optional, assumes 'active' if missing) */}
                      <span
                        className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${
                          job.status === "closed"
                            ? "bg-red-950/30 text-red-400 border-red-900/50"
                            : "bg-emerald-950/30 text-emerald-400 border-emerald-900/50"
                        }`}
                      >
                        {job.status || "Active"}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <Badge icon={Briefcase}>{job.type}</Badge>
                      <Badge icon={MapPin}>
                        {job.location} ({job.mode})
                      </Badge>
                      <Badge>{job.experienceLevel}</Badge>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4 max-w-3xl">
                      {job.description}
                    </p>

                    {/* Footer Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 pt-4 border-t border-zinc-800/50">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-500/80" />
                        <span className="text-zinc-300 font-medium">
                          ₹ {job.package} {job.salaryType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-zinc-600" />
                        <span>
                          Posted:{" "}
                          {new Date(
                            job.postedAt || Date.now()
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto mr-auto md:mr-0">
                        <Calendar className="w-4 h-4 text-red-400/70" />
                        <span className="text-red-300/80">
                          Deadline:{" "}
                          {new Date(job.lastDateToApply).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Action */}
                  <div className="flex flex-col justify-center items-end md:border-l border-zinc-800/50 md:pl-8">
                    <button
                      onClick={() => navigate(`/admin/viewJob/${job._id}`)}
                      className="w-full md:w-auto px-6 py-3 bg-white hover:bg-cyan-50 text-black font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-cyan-500/20 whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <p className="text-xs text-zinc-500 mt-3 text-center w-full">
                      {job.applicants?.length || 0} Applicants
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Component for uniform badges
const Badge = ({ children, icon: Icon }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/50 text-zinc-300 border border-white/5">
    {Icon && <Icon className="w-3.5 h-3.5 text-zinc-500" />}
    {children}
  </span>
);
