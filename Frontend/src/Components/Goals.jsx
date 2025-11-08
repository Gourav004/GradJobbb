// GoalAchievementCards.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * GoalAchievementCards
 * - 3 cards: Goal, Progress, Achievements
 * - Props: optional `data` array to override defaults
 *
 * Requirements:
 * - Tailwind CSS in project
 * - framer-motion installed (optional, component still works w/o advanced animations)
 *
 * Usage:
 * <GoalAchievementCards />
 * or
 * <GoalAchievementCards data={[...customCards]} />
 */

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

const CountUp = ({ to, duration = 1.6, suffix = "" }) => {
  const [val, setVal] = useState(1);
  useEffect(() => {
    let start = 1;
    const totalFrames = Math.max(10, Math.round(duration * 60));
    const increment = (to - start) / totalFrames;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      start = start + increment;
      if (frame >= totalFrames) {
        clearInterval(id);
        setVal(to);
      } else {
        setVal(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [to, duration]);

  return (
    <span className="font-extrabold text-2xl sm:text-3xl">
      {val}
      {suffix}
    </span>
  );
};

export default function GoalAchievementCards({ data = defaultData }) {
  return (
    <div className="w-full flex flex-col gap-10 sm:gap-6 items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
        {data.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 * card.id }}
            whileHover={{
              translateY: -6,
              boxShadow: "0 18px 40px rgba(6,182,212,0.12)",
            }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Gradient background + border glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(120deg, ${card.colorFrom}20, transparent 30%), linear-gradient(90deg, ${card.colorFrom}10, ${card.colorTo}08)`,
                borderRadius: 12,
                pointerEvents: "none",
              }}
            />
            <div className="relative z-10 bg-white/5 border border-white/6 rounded-2xl p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${card.colorFrom}, ${card.colorTo})`,
                      boxShadow: `0 6px 18px ${card.colorFrom}55`,
                    }}
                  >
                    <div className="text-black">{card.svg}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 font-medium">
                      {card.title}
                    </div>
                    <div className="text-xs text-gray-400">{card.subtitle}</div>
                  </div>
                </div>
                {/* small badge */}
                <div className="text-xs px-3 py-1 rounded-full bg-white/6 text-cyan-300 font-semibold">
                  {card.type === "progress" ? "Goal" : "Live"}
                </div>
              </div>

              {/* value area */}
              <div className="flex items-center justify-between mt-1">
                <div>
                  {card.type === "progress" ? (
                    <>
                      <CountUp
                        to={card.value}
                        duration={1.8}
                        suffix={card.unit}
                      />
                      <div className="mt-3 w-56 sm:w-64 bg-white/6 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${card.value}%`,
                            background: `linear-gradient(90deg, ${card.colorFrom}, ${card.colorTo})`,
                            boxShadow: `0 6px 22px ${card.colorFrom}55`,
                            transition: "width 1.1s ease",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <CountUp
                        to={card.value}
                        duration={1.6}
                        suffix={card.unit}
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        Updated live
                      </div>
                    </>
                  )}
                </div>

                {/* circle mini stat */}
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-300">This Quarter</div>
                  <div
                    className="mt-2 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${card.colorFrom}66, ${card.colorTo}22)`,
                      boxShadow: `inset 0 -6px 12px ${card.colorTo}30, 0 8px 20px ${card.colorFrom}20`,
                    }}
                  >
                    {card.type === "progress" ? (
                      <span className="text-black">{card.value}%</span>
                    ) : (
                      <span className="text-white">{card.value}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* footer small actions */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <button className="px-3 py-1 rounded-md bg-transparent border border-white/6 text-cyan-300 hover:bg-white/6 transition">
                  View details
                </button>
                <div className="text-gray-400">
                  Updated:{" "}
                  <span className="text-gray-300 font-medium">Today</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
