import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, interpolate, scale } from "framer-motion";
import {
  Search,
  Briefcase,
  Code,
  LineChart,
  DollarSign,
  LayoutGrid,
  MapPin,
  TrendingUp,
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  Target,
} from "lucide-react";

// --- Configuration Data ---
const STATS_DATA_ANIMATED = [
  {
    icon: ShieldCheck,
    title: "Top Tier Roles",
    value: 1500,
    suffix: "+",
    detail: "From Fortune 500 Partners",
    color: "text-indigo-400",
  },
  {
    icon: TrendingUp,
    title: "Salary Growth",
    value: 18,
    suffix: "%",
    detail: "Median Yearly Trend",
    color: "text-green-400",
  },
  {
    icon: Briefcase,
    title: "Total Placements",
    value: 4500,
    suffix: "+",
    detail: "Since January 2023",
    color: "text-cyan-400",
  },
];

const CATEGORIES = [
  { name: "Software Dev", icon: Code, filter: "tech" },
  { name: "Data Science", icon: LineChart, filter: "data" },
  { name: "Consulting", icon: Briefcase, filter: "consult" },
  { name: "Finance & Banking", icon: DollarSign, filter: "finance" },
  { name: "Design & UX", icon: LayoutGrid, filter: "design" },
];

const CORE_FEATURES = [
  {
    icon: Target,
    title: "Precision Job Targeting",
    description:
      "Stop wasting time searching randomly. Our AI sends the most relevant opportunities to your inbox based on your degree, skills, and career goals.",
    color: "text-cyan-400",
  },
  {
    icon: Users,
    title: "The Graduate Network",
    description:
      "Connect with other graduates and seniors. Get direct guidance on interviews, company culture, and career paths, turning your network into a professional strength.",
    color: "text-purple-400",
  },
  {
    icon: BarChart3,
    title: "Exclusive Market Insights",
    description:
      "Access exclusive data on average salaries, high-demand skills, and emerging sectors. Make decisions based on real data, not guesses.",
    color: "text-green-400",
  },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- Custom Components ---
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        const interpolatedValue = interpolate(
          [0, 1],
          [from, to]
        )(Math.min(progress, 1));
        setCount(Math.round(interpolatedValue));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return (
    <motion.span ref={ref} className="text-4xl font-bold text-white mb-1">
      {new Intl.NumberFormat("en-US").format(count)}
      {suffix}
    </motion.span>
  );
};

const FrostedCard = ({ children, className = "", motionProps = {} }) => (
  <motion.div
    variants={itemVariants}
    {...motionProps}
    className={`
            bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl 
            transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50
            ${className}
        `}
  >
    {children}
  </motion.div>
);

const StatCard = ({ icon: Icon, title, value, detail, color, suffix }) => (
  <FrostedCard className="flex-1 min-w-[200px] md:min-w-0 p-5">
    <div className="flex items-center space-x-3 mb-3">
      <Icon className={`w-6 h-6 ${color} p-1 rounded-md bg-white/5`} />
      <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
        {title}
      </h3>
    </div>
    <AnimatedCounter from={0} to={value} suffix={suffix} duration={2.5} />
    <p className="text-xs text-gray-400 mt-2">{detail}</p>
  </FrostedCard>
);

const DataSpotlightCard = () => (
  <FrostedCard
    className="col-span-1 lg:col-span-2 p-8"
    motionProps={{ transition: { delay: 0.3 } }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Zap className="w-6 h-6 mr-3 text-yellow-400 fill-yellow-400/20" />
        GradJob Data Spotlight:{" "}
        <span className="text-cyan-400 ml-2">Market Trends</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          <path
            d="M 0 190 L 400 190 M 0 100 L 400 100 M 0 10 L 400 10"
            stroke="#ffffff20"
            strokeWidth="1"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
            d="M 0 190 C 50 150, 100 120, 150 140 C 200 160, 250 80, 300 110 C 350 130, 400 50"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {[
            { x: 0, y: 190, label: "Q1" },
            { x: 150, y: 140, label: "Q2" },
            { x: 300, y: 110, label: "Q3" },
            { x: 400, y: 50, label: "Q4" },
          ].map(({ x, y, label }, index) => (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="5"
              fill="#00e4ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.5 + index * 0.3,
                type: "spring",
                stiffness: 200,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="md:col-span-1 text-left space-y-4">
        <h3 className="text-xl font-semibold text-cyan-300"> Key Takeaways</h3>
        <p className="text-sm text-gray-300">
          <span className="font-bold text-green-400">45%</span>: Highest
          placement demand growth in Tech Sector.
        </p>
        <p className="text-sm text-gray-300">
          <span className="font-bold text-yellow-400">Remote Roles</span>:
          Packages for remote jobs increased by 12%, making them popular.
        </p>
        <p className="text-sm text-gray-300">
          <span className="font-bold text-indigo-400">Top Skills</span>: Python,
          Cloud (AWS/Azure), and GenAI are most in-demand.
        </p>
      </div>
    </div>
  </FrostedCard>
);

export const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#0a0a0a] p-4 sm:p-8 font-['Inter', sans-serif] text-white"
    >
      <motion.header
        variants={itemVariants}
        className="mb-10 pt-4 max-w-6xl mx-auto"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
          <span className="text-cyan-400">Explore</span> Your Career Path
        </h1>
        <p className="text-lg text-gray-400">
          Find jobs, explore data insights, and discover career-defining
          opportunities.
        </p>
      </motion.header>

      <FrostedCard
        className="mb-12 p-2 max-w-6xl mx-auto"
        motionProps={{ transition: { delay: 0.1 } }}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center w-full"
        >
          <Search className="w-5 cursor-not-allowed h-5 ml-3 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by role, company, or skills (e.g., 'React Developer', 'Goldman Sachs')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent text-white placeholder-gray-500 px-4 py-3 text-base focus:outline-none focus:ring-0 rounded-r-lg"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
          >
            Search
          </motion.button>
        </motion.div>
      </FrostedCard>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Your Career Edge: Key Stats</h2>
        <div className="flex flex-wrap gap-6 mb-12 justify-center lg:justify-start">
          {STATS_DATA_ANIMATED.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mb-12">
          <DataSpotlightCard />
        </div>

        <h2 className="text-3xl font-bold mb-6">Browse Top Categories</h2>
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center sm:justify-start gap-4 mb-12"
        >
          {CATEGORIES.map(({ name, icon: Icon, filter }) => (
            <motion.button
              key={filter}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(6, 182, 212, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-medium transition-all duration-200"
            >
              <Icon className="w-4 h-4 mr-2" />
              {name}
            </motion.button>
          ))}
        </motion.div>

        <h2 className="text-3xl font-bold mb-8 mt-12">
          How GradJob Empowers You
        </h2>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {CORE_FEATURES.map((feature, index) => (
            <FrostedCard
              key={feature.title}
              className="p-8 flex flex-col items-start"
              motionProps={{
                transition: { delay: 0.2 + index * 0.1 },
              }}
            >
              <div
                className={`p-4 rounded-full mb-5 ${feature.color} bg-white/10`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </FrostedCard>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center py-16 mt-16 border-t border-white/10"
        >
          <p className="text-xl font-medium mb-4 text-gray-300">
            Ready to take the next step?
          </p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-lg px-10 py-3 rounded-full font-bold shadow-2xl shadow-cyan-500/40"
          >
            Create Account
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExplorePage;
