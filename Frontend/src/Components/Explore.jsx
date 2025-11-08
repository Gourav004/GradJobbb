import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Users,
  DollarSign,
  TrendingUp,
  Zap,
  Briefcase,
  Trophy,
} from "lucide-react";
import GoalAchievementCards from "./Goals.jsx";

const defaultData = [
  {
    id: 1,
    title: "Quarter Goal",
    value: 85,
    unit: "%",
    subtitle: "Placement drive target completion",
    colorFrom: "#06b6d4",
    colorTo: "#8b5cf6",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="w-9 h-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 12l2.2 2.4L16 9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    type: "progress",
  },
  {
    id: 2,
    title: "Students Placed",
    value: 452,
    unit: "",
    subtitle: "Total successful placements this year",
    colorFrom: "#22c55e",
    colorTo: "#06b6d4",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="w-9 h-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2a4 4 0 100 8 4 4 0 000-8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20a8 8 0 0116 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    type: "count",
  },
  {
    id: 3,
    title: "Top Achievements",
    value: 24,
    unit: "",
    subtitle: "Companies added to partner list",
    colorFrom: "#f59e0b",
    colorTo: "#ef4444",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="w-9 h-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l2.5 5.5L20 9l-4 3.5L17 19l-5-3-5 3 1-6.5L4 9l5.5-1.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    type: "count",
  },
];

const STATS = [
  {
    id: 1,
    label: "Students Placed",
    value: 452,
    delta: "+8%",
    icon: Users,
    color: "text-cyan-400",
  },
  {
    id: 2,
    label: "Average CTC",
    value: 7.2,
    suffix: " LPA",
    delta: "+12%",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    id: 3,
    label: "Placement Rate",
    value: 92,
    suffix: "%",
    delta: "+4%",
    icon: TrendingUp,
    color: "text-indigo-400",
  },
];

const PLACEMENT_TREND = [
  { month: "Jul", placements: 70, avg: 5.9 },
  { month: "Aug", placements: 120, avg: 6.1 },
  { month: "Sep", placements: 200, avg: 6.8 },
  { month: "Oct", placements: 280, avg: 7.0 },
  { month: "Nov", placements: 320, avg: 7.1 },
  { month: "Dec", placements: 420, avg: 7.2 },
];

const TOP_RECRUITERS = [
  { name: "Google", hired: 12 },
  { name: "Amazon", hired: 10 },
  { name: "Microsoft", hired: 8 },
  { name: "TCS", hired: 15 },
  { name: "Infosys", hired: 11 },
  { name: "Flipkart", hired: 7 },
  { name: "Zomato", hired: 9 },
];

const STUDENTS = [
  {
    id: 1,
    name: "Aisha Sharma",
    branch: "CSE",
    placedAt: "Google",
    ctc: "32 LPA",
  },
  {
    id: 2,
    name: "Rahul Verma",
    branch: "IT",
    placedAt: "Amazon",
    ctc: "24 LPA",
  },
  {
    id: 3,
    name: "Sneha R.",
    branch: "ECE",
    placedAt: "Microsoft",
    ctc: "28 LPA",
  },
  {
    id: 4,
    name: "Gourav",
    branch: "CSE (AI)",
    placedAt: "Zomato",
    ctc: "8 LPA",
  },
];

/* -------------------------
   Animated Counter
   ------------------------- */
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    const increment = end / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [end, duration]);

  return (
    <>
      {Math.floor(count)}
      {suffix}
    </>
  );
};

/* -------------------------
   Reusable Card
   ------------------------- */
const FrostCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-[0_4px_15px_rgba(6,182,212,0.06)] ${className}`}
  >
    {children}
  </motion.div>
);

/* -------------------------
   Stat Card
   ------------------------- */
const StatCard = ({ icon: Icon, label, value, delta, color, suffix }) => (
  <FrostCard className="relative flex flex-col gap-4 items-start min-w-[220px]">
    <div className="absolute top-3 right-3 text-xs font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md shadow-[0_0_6px_rgba(34,197,94,0.3)]">
      {delta}
    </div>
    <div className={`flex items-center gap-3 ${color}`}>
      <div className="p-3 rounded-lg bg-white/5">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-sm text-gray-300 font-medium">{label}</div>
    </div>
    <div className="text-3xl text-white font-extrabold">
      <CountUp end={parseFloat(value)} suffix={suffix || ""} />
    </div>
  </FrostCard>
);

/* -------------------------
   Main Component
   ------------------------- */
export default function ExploreDashboard() {
  const [placementData, setPlacementData] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setPlacementData(PLACEMENT_TREND);
      setRecruiters(TOP_RECRUITERS);
      setStudents(STUDENTS);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071126] to-[#00141b] py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              <span className="text-cyan-400">Grad</span> Placement Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Live insights & recruiter trends
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-block mb-6 cursor-pointer group relative top-7"
            >
              <button
                className="
      flex items-center gap-2  cursor-pointer
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

                <span className="text-[15px]">Home</span>
              </button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((s) => (
            <StatCard key={s.id} {...s} />
          ))}
        </div>

        {/* Chart */}
        <FrostCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Placement Trend
              </h2>
              <p className="text-gray-400 text-sm">
                Placements & avg CTC over months
              </p>
            </div>
          </div>
          <div className="w-full h-64">
            {loading ? (
              <div className="flex items-center justify-center text-gray-500 h-full">
                Loading...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={placementData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff12" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0b1220",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="placements"
                    stroke="#06b6d4"
                    fill="url(#colorCyan)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="avg"
                    stroke="#22c55e"
                    fill="url(#colorGreen)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </FrostCard>

        {/* Recruiters & Students */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Recruiters */}
          <FrostCard>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-cyan-400" /> Top Recruiters
            </h2>
            <div className="space-y-3">
              {recruiters.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  <span className="text-gray-300 font-medium">{r.name}</span>
                  <span className="text-cyan-400 font-semibold">
                    {r.hired} hires
                  </span>
                </div>
              ))}
            </div>
          </FrostCard>

          {/* Top Students */}
          <FrostCard>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" /> Top Students
            </h2>
            <div className="space-y-3">
              {students.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  <div>
                    <p className="text-white font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.branch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-semibold">{s.placedAt}</p>
                    <p className="text-sm text-gray-400">{s.ctc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FrostCard>
        </div>
      </div>
    </div>
  );
}
