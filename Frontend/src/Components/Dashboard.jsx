import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Search,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- CUSTOM HOOK FOR CLICK OUTSIDE ---
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- ANIMATED COUNTER COMPONENT ---
function AnimatedCounter({ value }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

// --- ICONS FOR NAVBAR ---
const Icons = {
  Dashboard: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  Jobs: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Applied: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  Profile: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

// --- MOCK CHART DATA ---
const chartData = [
  { name: "Mon", jobs: 4 },
  { name: "Tue", jobs: 7 },
  { name: "Wed", jobs: 3 },
  { name: "Thu", jobs: 8 },
  { name: "Fri", jobs: 12 },
  { name: "Sat", jobs: 5 },
  { name: "Sun", jobs: 10 },
];

// --- MAIN CONTENT COMPONENT ---
export default function StudentDashboardContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refs for click outside
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  useClickOutside(profileRef, () => setIsProfileOpen(false));
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  // Data States
  const [studentProfile, setStudentProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  // --- FETCH ALL DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Mock data fallbacks in case API is not reachable in this environment
        try {
          const [profileRes, appliedRes, allJobsRes] = await Promise.all([
            axios.get("https://gradjob.onrender.com/user/profile", {
              withCredentials: true,
            }),
            axios.get("https://gradjob.onrender.com/user/appliedJobs", {
              withCredentials: true,
            }),
            axios.get("https://gradjob.onrender.com/user/viewjobs", {
              withCredentials: true,
            }),
          ]);
          setStudentProfile(profileRes.data.student);
          setAppliedJobs(appliedRes.data.jobs || []);
          setAllJobs(allJobsRes.data.allJobs || []);
        } catch (apiError) {
          console.warn("API unreachable, using mock data for UI preview");
          setStudentProfile({
            name: "Demo Student",
            email: "demo@example.com",
            skills: ["React", "Node.js", "MongoDB"],
          });
          setAppliedJobs([
            {
              _id: "1",
              title: "Software Engineer Intern",
              company: "Google",
              postedAt: new Date().toISOString(),
            },
          ]);
          setAllJobs([
            {
              _id: "1",
              title: "Software Engineer Intern",
              company: "Google",
              postedAt: new Date().toISOString(),
            },
            {
              _id: "2",
              title: "Frontend Developer",
              company: "Microsoft",
              postedAt: new Date().toISOString(),
            },
            {
              _id: "3",
              title: "Backend Developer",
              company: "Amazon",
              postedAt: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              _id: "4",
              title: "Data Scientist",
              company: "Netflix",
              postedAt: new Date(Date.now() - 172800000).toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Dashboard Data Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- DERIVED STATS ---
  const totalApplied = appliedJobs.length;
  const totalAvailable = allJobs.length;
  const remainingJobs = Math.max(0, totalAvailable - totalApplied);
  const appliedIds = new Set(appliedJobs.map((job) => job._id));
  const featuredJobs = allJobs
    .filter((job) => !appliedIds.has(job._id))
    .sort(
      (a, b) =>
        new Date(b.postedAt || b.createdAt) -
        new Date(a.postedAt || a.createdAt)
    )
    .slice(0, 3);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://gradjob.onrender.com/user/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Navbar Items for Student
  const navItems = [
    {
      href: "/dashboard",
      text: "Dashboard",
      icon: <Icons.Dashboard className="w-5 h-5" />,
    },
    { href: "/jobs", text: "Jobs", icon: <Icons.Jobs className="w-5 h-5" /> },
    {
      href: "/appliedJobs",
      text: "Applied",
      icon: <Icons.Applied className="w-5 h-5" />,
    },
  ];

  // Helper to check active state (considering standard paths)
  const isLinkActive = (href) =>
    location.pathname === href ||
    (href === "/dashboard" && location.pathname === "/");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 blur-xl bg-cyan-500/20 rounded-full animate-pulse"></div>
        </div>
        <p className="text-cyan-500 mt-4 font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-['Inter',sans-serif] selection:bg-cyan-500/30 overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Left: Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-500" />
              <span>
                Grad<span className="text-cyan-500">Job</span>
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.text}
                onClick={() => navigate(item.href)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                             ${
                               isLinkActive(item.href)
                                 ? "bg-cyan-950/40 text-cyan-400 border border-cyan-900/50"
                                 : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
                             }`}
              >
                {item.icon} {item.text}
              </div>
            ))}
          </nav>

          {/* Right: Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800"
            >
              <span className="hidden sm:block text-sm font-semibold text-zinc-300 truncate max-w-[100px]">
                {studentProfile?.name?.split(" ")[0] || "Student"}
              </span>
              <img
                className="w-8 h-8 rounded-full object-cover bg-zinc-800 border border-zinc-700"
                src={
                  studentProfile?.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-[#0c0c0c] border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 origin-top-right"
                >
                  <div className="px-3 py-2 text-sm text-zinc-500 border-b border-zinc-800 mb-1">
                    Signed in as <br />
                    <span className="text-white font-medium truncate block">
                      {studentProfile?.email}
                    </span>
                  </div>
                  <div
                    onClick={() => navigate("/studentProfile")}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <Icons.Profile className="w-4 h-4 text-cyan-500" /> Your
                    Profile
                  </div>
                  <div className="h-px bg-zinc-800/50 my-1.5 mx-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside
          ref={sidebarRef}
          className={`absolute top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 p-6 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-500" /> Grad
              <span className="text-cyan-500">Job</span>
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-zinc-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div
                key={item.text}
                onClick={() => {
                  navigate(item.href);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer
                     ${
                       isLinkActive(item.href)
                         ? "bg-cyan-950/40 text-cyan-400"
                         : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                     }`}
              >
                {item.icon} {item.text}
              </div>
            ))}
          </nav>
        </aside>
      </div>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {studentProfile?.name?.split(" ")[0] || "Student"}
            </span>
            👋
          </h1>
          <p className="text-zinc-400 mt-2">
            Here's what's happening with your job search today.
          </p>
        </motion.div>

        {/* --- STATS ROW (Hero) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Applied Jobs"
            value={totalApplied}
            icon={CheckCircle2}
            color="cyan"
            delay={0.1}
          />
          <StatCard
            title="New Opportunities"
            value={remainingJobs}
            icon={Search}
            color="indigo"
            delay={0.2}
          />
          <StatCard
            title="Total Openings"
            value={totalAvailable}
            icon={Briefcase}
            color="purple"
            delay={0.3}
          />
        </div>

        {/* --- SECOND ROW: Chart & Skills --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Area Chart (Market Activity) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-zinc-200">
                <TrendingUp className="w-5 h-5 text-cyan-500" /> Market Activity
              </h3>
              <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-full">
                Last 7 Days
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#ffffff50"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#ffffff50"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="jobs"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorJobs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skills & Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />
            <h3 className="flex items-center gap-2 font-semibold text-zinc-200 mb-6">
              <Zap className="w-5 h-5 text-yellow-500" /> Your Top Skills
            </h3>

            {studentProfile?.skills && studentProfile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {studentProfile.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="px-3 py-1.5 text-sm bg-zinc-800/50 hover:bg-cyan-950/50 text-zinc-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-center p-4 border border-dashed border-zinc-800 rounded-2xl">
                <User className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No skills added yet.</p>
                <button
                  onClick={() => navigate("/studentProfile")}
                  className="mt-4 text-xs text-cyan-400 hover:underline"
                >
                  + Add Skills
                </button>
              </div>
            )}

            <div className="mt-auto pt-6">
              <button
                onClick={() => navigate("/studentProfile")}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View Full Profile <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- THIRD ROW: Featured & Recent --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Featured Jobs (Wider Column) */}
          <div className="xl:col-span-2 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              Featured Opportunities
            </h3>
            <div className="grid gap-4">
              {featuredJobs.length > 0 ? (
                featuredJobs.map((job, i) => (
                  <FeaturedJobCard key={job._id} job={job} index={i} />
                ))
              ) : (
                <div className="p-8 text-center bg-zinc-900/30 border border-white/5 rounded-3xl text-zinc-500 italic">
                  No new featured jobs right now.
                </div>
              )}
            </div>
            {featuredJobs.length > 0 && (
              <div className="text-right mt-2">
                <button
                  onClick={() => navigate("/jobs")}
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-end gap-1 group ml-auto"
                >
                  View all jobs{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Recent Applications (Narrower Column) */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" /> Recent Applications
            </h3>
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-2">
              {appliedJobs.length > 0 ? (
                appliedJobs.slice(0, 4).map((job, i) => (
                  <div
                    key={job._id || i}
                    className="p-4 hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-4 border-b border-white/[0.02] last:border-0"
                  >
                    <div className="p-2.5 bg-zinc-800 rounded-xl">
                      <Briefcase className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-zinc-200 truncate">
                        {job.title}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        Applied
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-zinc-500">
                  No applications yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }) {
  const colorVariants = {
    cyan: "from-cyan-500/20 to-cyan-500/0 text-cyan-500",
    indigo: "from-indigo-500/20 to-indigo-500/0 text-indigo-500",
    purple: "from-purple-500/20 to-purple-500/0 text-purple-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative bg-zinc-900/40 border border-white/5 p-6 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorVariants[color]} opacity-40 transition-opacity duration-500`}
      />
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
          <h4 className="text-4xl font-black tracking-tight text-white">
            <AnimatedCounter value={value} />
          </h4>
        </div>
        <div
          className={`p-3 rounded-2xl bg-zinc-800/50 border border-white/5 ${
            colorVariants[color].split(" ")[2]
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedJobCard({ job, index }) {
  const navigate = useNavigate();
  const BuildingIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
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
  const MapPinIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      onClick={() => navigate(`/viewAJob/${job._id}`)}
      className="group flex items-center justify-between p-5 bg-gradient-to-r from-zinc-900/60 to-zinc-900/20 border border-white/5 hover:border-cyan-500/30 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
          <BuildingIcon className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            {job.title}
          </h4>
          <div className="flex items-center gap-3 text-sm text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-3.5 h-3.5" /> {job.location}
            </span>
          </div>
        </div>
      </div>
      <div className="relative hidden sm:flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-white">
          ₹{job.package} {job.salaryType}
        </span>
        <span className="px-3 py-1 text-xs font-medium bg-white/5 text-zinc-300 rounded-full border border-white/10">
          {job.type}
        </span>
      </div>
    </motion.div>
  );
}
