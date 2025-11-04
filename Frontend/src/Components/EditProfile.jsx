import { addProfile } from "@/Store/StudentProfileSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentProfileEdit() {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [skills, setSkills] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch profile once and update all fields
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/profile", {
          withCredentials: true,
        });
        const student = res.data.student;
        setProfile(student);
        setName(student.name || "");
        setPhone(student.phone || "");
        setBranch(student.branch || "");
        setYear(student.year || "");
        setResumeLink(student.resumeLink || "");
        setGithubLink(student.githubLink || "");
        setLinkedinLink(student.linkedinLink || "");
        setSkills(student.skills || []);
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(",").map((skill) => skill.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "http://localhost:5000/user/profile/edit",
        {
          name,
          phone,
          year,
          branch,
          skills,
          resumeLink,
          githubLink,
          linkedinLink,
        },
        { withCredentials: true }
      );
      toast.success("Profile Updated Successfully");
      dispatch(addProfile(res.data.profile));
      navigate("/studentProfile");
    } catch (error) {
      console.log("ERROR at patch", error.message);
    }
  };

  const inputClass =
    "w-full bg-[#111] text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-cyan-500";
  const labelClass = "font-semibold text-cyan-400 mb-1 inline-block";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-h-screen bg-black text-white p-6 space-y-10 overflow-x-hidden"
    >
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

      <div className="relative w-full max-w-5xl mx-auto bg-[#111]/70 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative group text-center">
          <img
            src="https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-cyan-500 shadow-lg group-hover:scale-105 transition-all duration-500"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Mobile</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 
             bg-gradient-to-r from-cyan-500 to-blue-600 
             px-5 py-2 rounded-full font-semibold 
             text-white shadow-lg 
             hover:from-cyan-400 hover:to-blue-500 
             hover:shadow-cyan-500/40 
             active:scale-95 
             transition-all duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-save"
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
              <path d="M7 3v4a1 1 0 0 0 1 1h7" />
            </svg>
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("/studentProfile")}
            className="flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-5 py-2 rounded-full font-medium hover:bg-gray-700/50 transition-all duration-300"
          >
            ✖ Cancel
          </button>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-[#111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold flex flex-row gap-5 mb-4 text-cyan-400">
            <h3 className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-open-text"
              >
                <path d="M12 7v14" />
                <path d="M16 12h2" />
                <path d="M16 8h2" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                <path d="M6 12h2" />
                <path d="M6 8h2" />
              </svg>
              <span className="tracking-wide">Education</span>
            </h3>
          </h3>

          <label className={labelClass}>Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={inputClass}
          />
          <label className={labelClass}>Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="bg-[#111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-link"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="tracking-wide">Social Handles</span>
          </h3>

          <label className={labelClass}>GitHub</label>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className={inputClass}
          />
          <label className={labelClass}>LinkedIn</label>
          <input
            type="text"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="bg-[#111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
            <span className="tracking-wide">Resume</span>
          </h3>

          <input
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            className={inputClass}
            placeholder="Paste your resume link"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-[#111]/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">✨ Skills</h3>
        <input
          type="text"
          value={skills.join(", ")}
          onChange={handleSkillsChange}
          className={inputClass}
        />
      </div>

      {/* Glows */}
      <div className="absolute -z-10 bottom-0 left-0 w-1/2 h-96 bg-blue-600/20 blur-[150px] rounded-full -translate-x-1/4"></div>
      <div className="absolute -z-10 -bottom-20 right-0 w-1/2 h-96 bg-cyan-500/20 blur-[150px] rounded-full translate-x-1/4"></div>
    </form>
  );
}
