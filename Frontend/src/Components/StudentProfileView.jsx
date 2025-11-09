import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function StudentProfileView() {
  const [profile, setProfile] = useState({});
  const student = useSelector((store) => store.student);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });
      const fetchedStudent = res.data.student;
      setProfile(fetchedStudent);
    } catch (error) {
      console.log("❌ Error:", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-5 px-4 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -z-10 -bottom-5 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

      {/* ================= PROFILE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-7xl mx-auto bg-[#111111]/70 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)] mt-16"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group flex-shrink-0 mx-auto"
        >
          <img
            src={
              profile.image ||
              "https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
            }
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-cyan-500 shadow-lg group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/160x160/000000/FFFFFF?text=Profile";
            }}
          />
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 min-w-[280px] text-center lg:text-left"
        >
          <h2 className="text-3xl font-bold tracking-wide mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {profile.name}
          </h2>

          <div className="flex flex-col flex-wrap gap-2 text-gray-300">
            <p className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
              <strong className="text-cyan-300">Email:</strong> {profile.email}
            </p>
            <p className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
              <strong className="text-cyan-300">Mobile:</strong>{" "}
              {profile.phone || "Not added"}
            </p>
            <p className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
              <strong className="text-cyan-300">College ID:</strong>{" "}
              {profile.collegeID}
            </p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row lg:flex-col gap-4 justify-center flex-shrink-0"
        >
          <a href="/editProfile">
            {" "}
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-full cursor-pointer font-medium text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 min-w-[160px]">
              {" "}
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
                className="flex-shrink-0"
              >
                {" "}
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>{" "}
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>{" "}
              </svg>{" "}
              Edit Profile{" "}
            </button>{" "}
          </a>
          <a
            href="/dashboard"
            className="inline-block mb-3 cursor-pointer group"
          >
            {" "}
            <button className=" flex items-center gap-2 bg-[#0d0d0d] border border-cyan-500/40 px-7 py-3 rounded-full font-semibold text-cyan-300 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,255,0.15)] hover:shadow-[0_0_20px_rgba(0,255,255,0.35)] hover:border-cyan-400 hover:scale-105 active:scale-95 ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />{" "}
              </svg>{" "}
              <span className="text-[15px]">Dashboard</span>{" "}
            </button>{" "}
          </a>
        </motion.div>

        <div className="absolute -z-10 -bottom-10 right-6 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      {/* ================= SECTIONS GRID ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="w-full max-w-7xl mx-auto grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {[
          {
            title: "Educational Details",
            content: (
              <>
                <p>
                  <strong className="text-cyan-300 my-10 ">Branch:</strong>{" "}
                  {profile.branch || "N/A"}
                </p>
                <p>
                  <strong className="text-cyan-300 ">Year:</strong>{" "}
                  {profile.year || "N/A"}
                </p>
              </>
            ),
          },
          {
            title: "Social Handles",
            content: (
              <>
                <p>
                  <strong className="text-cyan-300">GitHub:</strong>{" "}
                  <a
                    className={profile.githubLink ? "link" : ""}
                    href={profile.githubLink || "#"}
                    target="_blank"
                  >
                    {profile.githubLink || "N/A"}
                  </a>
                </p>
                <p>
                  <strong className="text-cyan-300 mt-3">LinkedIn:</strong>{" "}
                  <a
                    className={profile.linkedinLink ? "link" : ""}
                    href={profile.linkedinLink || "#"}
                    target="_blank"
                  >
                    {profile.linkedinLink || "N/A"}
                  </a>
                </p>
              </>
            ),
          },
          {
            title: "Resume",
            content: (
              <p className="text-gray-300 text-sm break-words whitespace-pre-wrap overflow-hidden">
                <strong className="text-cyan-300">Link:</strong>{" "}
                {profile.resumeLink || "Not uploaded"}
              </p>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              {section.title}
            </h3>
            {section.content}
          </motion.div>
        ))}
      </motion.div>

      {/* ================= SKILLS SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-7xl cursor-pointer mx-auto bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 mt-10 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300"
      >
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {profile.skills && profile.skills.length > 0 ? (
            profile.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-1 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 rounded-full text-sm hover:bg-cyan-500/20 transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))
          ) : (
            <p className="text-gray-400">No skills added</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default StudentProfileView;
