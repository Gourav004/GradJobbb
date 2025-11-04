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
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white p-6 space-y-10 font-['Inter',_sans-serif] overflow-x-clip">
      <a href="/dashboard" className="inline-block mb-6 cursor-pointer group">
        <button
          className="
      flex items-center gap-2
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

          <span className="text-[15px]">Back</span>
        </button>
      </a>

      {/* ✅ Profile Section */}
      <div className="relative w-full max-w-5xl mx-auto bg-[#111111]/70 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]">
        {/* Profile Image */}
        <div className="relative group">
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
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-wide mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {profile.name}
          </h2>
          <p className="text-gray-300 mb-1 flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold inline-flex items-center gap-2">
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
                className="lucide lucide-mail-icon lucide-mail flex-shrink-0"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              Email :
            </span>
            <span>{profile.email}</span>
          </p>
          <p className="text-gray-300 mb-1 flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold inline-flex items-center gap-2">
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
                className="lucide lucide-phone-icon lucide-phone flex-shrink-0"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              Mobile :
            </span>
            <span>{profile.phone || "Not added"}</span>
          </p>
          <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold inline-flex items-center gap-2">
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
                className="lucide lucide-university-icon lucide-university flex-shrink-0"
              >
                <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                <path d="M18 12h.01" />
                <path d="M18 16h.01" />
                <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
                <path d="M6 12h.01" />
                <path d="M6 16h.01" />
                <circle cx="12" cy="10" r="2" />
              </svg>
              College ID :
            </span>
            <span>{profile.collegeID}</span>
          </p>
        </div>

        {/* Buttons (Moved to the right) */}
        <div className="flex flex-row md:flex-col gap-4 justify-center">
          <a href="/editProfile">
            <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30">
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

          <button className="flex items-center gap-2 border border-cyan-500 text-cyan-400 px-5 py-2 rounded-full font-medium hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Download CV
          </button>
        </div>

        {/* Glow */}
        <div className="absolute -z-10 -top-10 left-6 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* ✅ 3-Column Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Education */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
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
              className="lucide lucide-book-icon lucide-book flex-shrink-0"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            </svg>
            Educational Details
          </h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <span className="font-semibold inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-gem-icon lucide-gem flex-shrink-0"
                >
                  <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
                  <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
                  <path d="M2 9h20" />
                </svg>
                Branch:
              </span>
              <span>{profile.branch || "Not added"}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-icon lucide-calendar flex-shrink-0"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                Year:
              </span>
              <span>{profile.year || "Not added"}</span>
            </p>
          </div>
        </div>

        {/* Social Handles (New Section) */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
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
              className="lucide lucide-share-2 flex-shrink-0"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            Social Handles
          </h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <span className="font-semibold inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github-icon lucide-github flex-shrink-0"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub:
              </span>
              <span>{profile.githubLink || "Not added"}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin flex-shrink-0"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn:
              </span>
              <span>{profile.linkedinLink || "Not added"}</span>
            </p>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
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
              <path d="M12 19V6"></path>
              <path d="M5 12l7-7 7 7"></path>
            </svg>
            Upload Resume
          </h3>
          <input
            type="file"
            name="pdf"
            id="upload-pdf"
            className="w-full bg-[#222] text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-300 hover:file:bg-cyan-500/20"
          />
        </div>
      </div>

      {/* ✅ Skills Section (Full-Width Section) */}
      <div className="max-w-5xl mx-auto bg-[#111111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles-icon lucide-sparkles flex-shrink-0"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
          Skills
        </h3>
        {profile.skills?.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-sm hover:scale-105 transition-transform duration-200 cursor-default whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No skills added yet.</p>
        )}
      </div>

      {/* Page Bottom Glows */}
    </div>
  );
}

export default StudentProfileView;
