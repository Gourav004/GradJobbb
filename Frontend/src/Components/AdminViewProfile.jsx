import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function AdminViewProfile() {
  const [admin, setAdmin] = useState({});
  const [studentCount, setStudentCount] = useState(0);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://gradjob.onrender.com/admin/profile", {
        withCredentials: true,
      });
      setAdmin(res.data.admin);
      setStudentCount(res.data.students);
    } catch (error) {
      console.log("ERROR IN FETCHING", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-center items-center p-6 relative overflow-hidden">
      {/* Lanyard aur Card ko wrap karne wala div for rotation */}
      <motion.div
        initial={{ opacity: 0, y: -200, rotateX: 90, scale: 0.8 }} // Initial state: upar se rotate hota hua, thoda chhota
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} // Final state: neeche, normal, bina rotation
        //
        // === YEH HAI FIX ===
        // Custom array [0.6, 0.05, -0.01, 0.9] ko "easeInOut" string se badal diya hai
        //
        transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth professional animation
        className="flex flex-col items-center relative"
      >
        {/* Lanyard */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-20 bg-gray-700/60 rounded-b-full shadow-lg z-0
                        border-t-2 border-x-2 border-gray-600/70
                        flex justify-center pt-8
                        before:content-[''] before:absolute before:top-2 before:w-16 before:h-8 before:rounded-full before:bg-gray-800/80 before:shadow-inner"
        >
          {/* Lanyard clip or attachment point */}
          <div className="w-8 h-8 rounded-full bg-gray-500/80 border-2 border-gray-400 flex items-center justify-center -mt-2">
            <div className="w-4 h-4 rounded-full bg-gray-600/90 shadow-inner"></div>
          </div>
        </div>

        {/* The ID Card itself */}
        <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-[#0a0a0a]/80 backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,255,255,0.15)] relative z-10">
          {/* TOP SECTION - Ab vertical layout hai */}
          <div className="flex flex-col items-center gap-6">
            {/* Profile Pic */}
            <div className="relative w-32 hover:scale-110 cursor-pointer transition-all duration-200 h-32 rounded-full border-4 border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.4)] overflow-hidden">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Profile Info - Text ko center kiya */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-cyan-400">{admin.name}</h1>

              <p className="text-white mt-4 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_2px_rgba(0,255,255,0.7)]"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span className="font-semibold text-cyan-300">Email:</span>{" "}
                {admin.email}
              </p>

              <p className="text-white mt-2 relative -left-7 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_2px_rgba(0,255,255,0.7)]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span className="font-semibold text-cyan-300">
                  Total Students:
                </span>{" "}
                {studentCount}
              </p>

              <p className="text-white mt-2 flex relative -left-5 items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_2px_rgba(0,255,255,0.7)]"
                >
                  <path d="M16 10h2" />
                  <path d="M16 14h2" />
                  <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                  <circle cx="9" cy="11" r="2" />
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                </svg>
                <span className="font-semibold text-cyan-300">College ID:</span>{" "}
                {admin.collegeID}
              </p>
            </div>

            <a
              href="/admin/students"
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

                <span className="text-[15px]">Dashboard</span>
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminViewProfile;
