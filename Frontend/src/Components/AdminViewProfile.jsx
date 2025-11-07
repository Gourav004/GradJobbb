import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";

function AdminViewProfile() {
  const [admin, setAdmin] = useState({});
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/profile", {
        withCredentials: true,
      });

      console.log("Profile Feteched", res.data.admin);
      setAdmin(res.data.admin);
    } catch (error) {
      console.log("ERROR IN FETCHING", error.message);
    }
  };

  useState(() => {
    fetchProfile();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl rounded-3xl border border-cyan-500/20 bg-[#0a0a0a]/80 backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,255,255,0.15)]"
      >
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-10">
          {/* Left: Profile Info */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 rounded-full border-4 border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.4)] overflow-hidden">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">{admin.name}</h1>
              <p className="text-gray-400 mt-1">
                <span className="font-semibold text-cyan-300">Email:</span>{" "}
                {admin.email}
              </p>

              <p className="text-gray-400">
                <span className="font-semibold text-cyan-300">College ID:</span>{" "}
                {admin.collegeID}
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col md:items-end gap-4">
            <motion.a
              href="/admin/dashboard"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 rounded-full border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
            >
              ← Dashboard
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminViewProfile;
