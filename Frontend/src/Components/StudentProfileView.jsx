import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function StudentProfileView() {
  const [profile, setProfile] = useState({});
  const student = useSelector((store) => store.student);
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });
      const fetchedStudent = res.data.student;

      console.log("✅ API data:", fetchedStudent); // Yahaan sahi structure milega
      setProfile(fetchedStudent);
    } catch (error) {
      console.log("❌ Error:", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      console.log("✅ Updated state:", profile);
      // console.log("✅ SKills", profile.skills.length);
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -z-10 bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute -z-10 top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

      {/* Back Button */}

      {/* ================= PROFILE CARD ================= */}
      <div className="relative w-full max-w-7xl mx-auto bg-[#111111]/70 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)] mt-16">
        {/* Profile Image */}
        <div className="relative group flex-shrink-0 mx-auto">
          <img
            src="https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-cyan-500 shadow-lg group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/160x160/000000/FFFFFF?text=Profile";
            }}
          />
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-[280px] text-center lg:text-left">
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
        </div>

        {/* Buttons */}
        <div className="flex flex-row lg:flex-col gap-4 justify-center flex-shrink-0">
          <a href="/editProfile">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-full cursor-pointer font-medium text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 min-w-[160px]">
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
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
          </a>
          <a
            href="/dashboard"
            className="inline-block mb-3  cursor-pointer group"
          >
            <button
              className="
      flex items-center gap-2
      
      bg-[#0d0d0d] border border-cyan-500/40
      px-7 py-3 rounded-full font-semibold text-cyan-300
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

        <div className="absolute -z-10 -bottom-10 right-6 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* ================= SECTIONS GRID ================= */}
      <div className="w-full max-w-7xl mx-auto grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Educational Details */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M12 7v14" />
              <path d="M16 12h2" />
              <path d="M16 8h2" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              <path d="M6 12h2" />
              <path d="M6 8h2" />
            </svg>
            Educational Details
          </h3>
          <p>
            <strong className="text-cyan-300">Branch:</strong>{" "}
            {profile.branch || "Not added"}
          </p>
          <p>
            <strong className="text-cyan-300">Year:</strong>{" "}
            {profile.year || "Not added"}
          </p>
        </div>

        {/* Social Handles */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Social Handles
          </h3>
          <p>
            <strong className="text-cyan-300">GitHub:</strong>{" "}
            <a
              className={profile.githubLink ? "link" : ""}
              href={profile.githubLink && profile.githubLink}
              target="_blank"
            >
              {profile.githubLink || "N/A"}
            </a>
          </p>
          <p>
            <strong className="text-cyan-300">LinkedIn:</strong>{" "}
            <a
              className={profile.linkedinLink ? "link" : ""}
              href={profile.linkedinLink && profile.linkedinLink}
              target="_blank"
            >
              {profile.linkedinLink || "N/A"}
            </a>
          </p>
        </div>

        {/* Resume */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
            Resume
          </h3>
          <p>
            <strong className="text-cyan-300">Link:</strong>{" "}
            {profile.resumeLink || "Not uploaded"}
          </p>
        </div>
      </div>

      {/* ================= SKILLS SECTION ================= */}
      <div className="w-full max-w-7xl cursor-pointer mx-auto bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 mt-10 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {profile.skills && profile.skills.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 rounded-full text-sm hover:bg-cyan-500/20 transition-all duration-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfileView;
