import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
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
  ArrowUpRight,
  Sparkles,
  Building2,
  Target,
} from "lucide-react";

// --- MOCK DATA ---
const PLACEMENT_TREND = [
  { month: "Jul", placements: 40, avg: 4.5 },
  { month: "Aug", placements: 85, avg: 5.2 },
  { month: "Sep", placements: 140, avg: 6.1 },
  { month: "Oct", placements: 210, avg: 6.8 },
  { month: "Nov", placements: 280, avg: 7.2 },
  { month: "Dec", placements: 452, avg: 7.5 },
];

const TOP_RECRUITERS = [
  { name: "Google", hired: 12, logo: "G" },
  { name: "Microsoft", hired: 10, logo: "M" },
  { name: "Amazon", hired: 8, logo: "A" },
  { name: "Atlassian", hired: 5, logo: "A" },
  { name: "Goldman Sachs", hired: 7, logo: "G" },
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
    ctc: "28 LPA",
  },
  {
    id: 3,
    name: "Sneha R.",
    branch: "ECE",
    placedAt: "Microsoft",
    ctc: "45 LPA",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    branch: "CSE AI",
    placedAt: "Atlassian",
    ctc: "52 LPA",
  },
];

// --- ANIMATED COMPONENTS ---
function AnimatedCounter({ value, decimal = 0 }) {
  const spring = useSpring(0, { mass: 0.5, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => current.toFixed(decimal));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

// --- MAGIC CARD COMPONENT ---
const MagicCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    variants={itemVariants}
    className={`relative bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden group ${className}`}
  >
    {/* Hover Glow Effect */}
    <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-700 opacity-0 group-hover:opacity-100" />
    <div className="relative z-10 p-6 h-full">{children}</div>
  </motion.div>
);

export default function ExploreDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000); // Fake load for effect
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col justify-center items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-cyan-400 mt-6 font-medium tracking-widest uppercase text-sm animate-pulse">
          Initializing Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-['Inter',sans-serif] selection:bg-cyan-500/30">
      {/* BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* --- HEADER --- */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                Live Placement Data
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Placement{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Insights
              </span>
            </h1>
            <p className="text-zinc-400 mt-2 text-lg max-w-xl">
              Real-time overview of campus recruitment trends, top achievers,
              and corporate partners.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            >
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                Back to Home
              </span>
            </a>
          </div>
        </motion.div>

        {/* --- HERO STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stat 1 */}
          <MagicCard className="bg-gradient-to-br from-cyan-950/30 to-transparent">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-cyan-500/10 ring-1 ring-cyan-500/20 rounded-2xl">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">
              <AnimatedCounter value={452} />
            </h3>
            <p className="text-zinc-400 font-medium">Total Students Placed</p>
          </MagicCard>

          {/* Stat 2 */}
          <MagicCard className="bg-gradient-to-br from-emerald-950/30 to-transparent">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-2xl">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +8.5%
              </span>
            </div>
            <h3 className="text-5xl font-black text-white mb-2 tracking-tighter flex items-baseline gap-1">
              ₹<AnimatedCounter value={7.5} decimal={1} />
              <span className="text-2xl text-zinc-500 font-bold">LPA</span>
            </h3>
            <p className="text-zinc-400 font-medium">Average CTC Offer</p>
          </MagicCard>

          {/* Stat 3 */}
          <MagicCard className="bg-gradient-to-br from-purple-950/30 to-transparent">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-purple-500/10 ring-1 ring-purple-500/20 rounded-2xl">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-5xl font-black text-white mb-2 tracking-tighter flex items-baseline gap-1">
              <AnimatedCounter value={94} />
              <span className="text-3xl text-purple-400/80">%</span>
            </h3>
            <p className="text-zinc-400 font-medium">Placement Rate</p>
            {/* Mini progress bar */}
            <div className="mt-6 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              />
            </div>
          </MagicCard>
        </div>

        {/* --- CHART SECTION --- */}
        <MagicCard className="mb-8 !p-0 min-h-[400px]">
          <div className="p-6 md:p-8 border-b border-white/[0.08] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                Placement Velocity
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Students placed vs Average CTC trend over last 6 months
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-zinc-300">Placements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-zinc-300">Avg CTC (LPA)</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full pt-6 pr-6 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={PLACEMENT_TREND}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff0d"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#52525b"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#52525b"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#52525b"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                  itemStyle={{ color: "#e4e4e7", fontSize: "13px" }}
                  labelStyle={{
                    color: "#a1a1aa",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="placements"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#colorCyan)"
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="avg"
                  stroke="#a855f7"
                  strokeWidth={3}
                  fill="url(#colorPurple)"
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MagicCard>

        {/* --- BOTTOM GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Recruiters */}
          <MagicCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" /> Top Recruiting
                Partners
              </h3>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {TOP_RECRUITERS.map((recruiter, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-all group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-lg">
                      {recruiter.logo}
                    </div>
                    <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {recruiter.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      {recruiter.hired}
                    </span>
                    <span className="text-xs text-zinc-500 uppercase font-medium tracking-wider">
                      Hires
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </MagicCard>

          {/* Star Students */}
          <MagicCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" /> Hall of Fame
              </h3>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                This Season
              </span>
            </div>
            <div className="space-y-4">
              {STUDENTS.map((student, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  key={student.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-yellow-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/micah/svg?seed=${student.name}`}
                      alt={student.name}
                      className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700"
                    />
                    <div>
                      <h4 className="font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">
                        {student.name}
                      </h4>
                      <p className="text-xs text-zinc-500">
                        {student.branch} • Placed at{" "}
                        <span className="text-zinc-300">
                          {student.placedAt}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="relative text-right">
                    <span className="flex items-center gap-1 text-emerald-400 font-black text-lg">
                      {student.ctc} <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </MagicCard>
        </div>
      </motion.div>
    </div>
  );
}
