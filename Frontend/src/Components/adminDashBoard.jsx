import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "@/Store/userSlice";
import { useNavigate } from "react-router-dom";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default function AdminDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [count, setCount] = useState();
  const [students, setStudents] = useState([]);
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedStudent(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/students", {
        withCredentials: true,
      });
      setStudents(res.data.students);
      setCount(res.data.count);
    } catch (error) {
      console.log("ERROR in Fetch STudents", error.message);
    }
  };
  useEffect(async () => {
    await fetchStudents();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/admin/profile", {
        withCredentials: true,
      });
      setProfile(res.data.admin.name);
    })();
  }, []);

  useClickOutside(profileRef, () => setIsProfileOpen(false));
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/admin/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    {
      href: "/admin/students",
      text: "Students",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users-icon lucide-users text-cyan-400"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      href: "/admin/jobs",
      text: "Jobs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-5 h-5 text-cyan-400"
        >
          <rect x="2" y="7" width="20" height="13" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 11h20" />
        </svg>
      ),
    },
    {
      href: "/admin/postJob",
      text: "Post Job",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-upload-icon lucide-upload text-cyan-400"
        >
          <path d="M12 3v12" />
          <path d="m17 8-5-5-5 5" />
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        </svg>
      ),
    },
  ];
  const NavLink = ({ href, icon, text, isMobile = false }) => {
    const mobileClasses =
      "text-lg text-white/90 hover:bg-cyan-400/20 w-full rounded-lg";
    const desktopClasses =
      "hidden md:flex relative text-white/80 text-[17px] font-medium transition-all duration-200 ease-linear hover:text-cyan-300 hover:scale-105 hover:bg-cyan-400/20 rounded-lg";

    return (
      <a
        href={href}
        className={`${
          isMobile ? mobileClasses : desktopClasses
        } flex items-center gap-3 px-3 py-2`}
      >
        {icon}
        {text}
      </a>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-950 text-white overflow-x-hidden font-['Inter',sans-serif]">
      {/* Background blur blobs */}
      <div className="absolute inset-0 z-0 opacity-80">
        <div className="absolute -top-40 -left-40 w-[600px] h-[400px] bg-gradient-to-br from-cyan-600/30 to-blue-800/20 rounded-full blur-3xl opacity-50 animate-blob-slow" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-teal-500/30 to-purple-800/20 rounded-full blur-3xl opacity-50 animate-blob-slow delay-1000" />
      </div>

      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <div className="backdrop-blur-lg bg-black/30 border border-cyan-400/20 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg shadow-cyan-400/10">
          <div className="text-xl sm:text-2xl font-bold text-white">
            Grad<span className="text-cyan-400">Job</span>
          </div>

          <div className="hidden md:flex font-[10px] items-center gap-5 mx-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.text}
                href={item.href}
                icon={item.icon}
                text={item.text}
                isMobile={false}
              />
            ))}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-full cursor-pointer p-1 pr-2 hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                <img
                  className="w-full h-full object-cover"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                />
              </div>
              <div className="font-[20px] text-white/80 hidden sm:block">
                {profile || "Guest"}
              </div>
            </button>

            {isProfileOpen && (
              <div
                className="absolute top-full right-0 mt-3 w-56 rounded-xl shadow-lg shadow-cyan-400/10 
                bg-black/70 backdrop-blur-xl border border-cyan-400/20 z-50 overflow-hidden"
              >
                <div className="p-2">
                  <a
                    href={"/admin/profile"}
                    className="flex justify-between items-center w-full px-3 py-2 text-sm text-white/90 
                    rounded-md hover:bg-cyan-400/15 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-user-round-pen-icon lucide-user-round-pen -mr-14"
                    >
                      <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                      <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                      <circle cx="10" cy="8" r="5" />
                    </svg>{" "}
                    Profile{" "}
                    <span className="bg-cyan-500/20 text-cyan-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </a>

                  <div className="h-px bg-white/10 my-1 "></div>
                  <button
                    onClick={handleLogout}
                    className=" gap-3 items-center flex flex-row w-full text-left px-3 py-2 text-sm text-red-400 
                    hover:bg-red-500/15 hover:text-red-300 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-log-out-icon lucide-log-out"
                    >
                      <path d="m16 17 5-5-5-5" />
                      <path d="M21 12H9" />
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    </svg>{" "}
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN SECTION (Home Content) */}
      <main className="pt-28 px-6 md:px-12 min-h-screen text-white relative ">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-cyan-400 mb-8 flex items-center gap-2 tracking-wide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          Students List
        </h2>

        {/* Students List */}
        <div className="space-y-3">
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                onClick={() => setSelectedStudent(student)}
                className="flex items-center justify-between bg-gray-900 hover:bg-gray-800   rounded-xl p-4 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      student.imageUrl ||
                      "https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                    }
                    alt={student.name}
                    className="w-14 h-14 rounded-lg object-cover   group-hover:border-cyan-400/50 transition-all"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {student.name}
                    </h3>
                    <div className="flex flex-row gap-4">
                      <p className="text-sm text-gray-400">
                        {student.branch || "—"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {student.year || "—"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:scale-105 cursor-pointer 
              hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] 
             transition-all duration-300 ease-in-out"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg">No students found.</p>
          )}
        </div>

        {/* Popup */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              ref={popupRef}
              className="relative bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 w-[90%] max-w-md  animate-fadeIn"
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-cyan-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src={
                    selectedStudent.imageUrl ||
                    "https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                  }
                  alt="photo"
                  className="w-24 h-24 hover:scale-105 duration-150 rounded-full border border-cyan-400/50 mb-3 object-cover shadow-inner shadow-cyan-500/30"
                />
                <h3 className="text-2xl font-semibold text-white">
                  {selectedStudent.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedStudent.branch || "N/A"}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedStudent.year || "N/A"}
                </p>
              </div>

              <div className="space-y-3 text-gray-300 text-sm flex flex-col flex-wrap">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-mail-icon lucide-mail text-cyan-400"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                  <p className="text-white">{selectedStudent.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-smartphone-icon lucide-smartphone text-cyan-400"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                  <p className="text-white">
                    {selectedStudent.phone || "Not Provided"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-calendar-icon lucide-calendar text-cyan-400"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <p className="text-white">
                    Year: {selectedStudent.year || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-send-icon lucide-send text-cyan-400"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                  <p className="text-white">
                    Jobs Applied: {selectedStudent.appliedJobs?.length || 0}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-user-plus-icon lucide-user-plus text-cyan-400"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                  <p className="text-white">
                    Joined:{" "}
                    {new Date(selectedStudent.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-row gap-5 justify-center">
                  <a
                    href={selectedStudent.githubLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      aria-label="GitHub"
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-white  text-black text-sm font-medium cursor-pointer
                 hover:bg-white hover:text-black hover:border-neutral-300 ease-linear
                 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                      {/* GitHub icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.6-.7 2-1.1-.8-.1-1.6-.4-1.6-1.8 0-.4.1-.7.3-1-1 .1-2 .5-2 .5-.6.3-.2.7-.2.7.9.2 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 016 0C17 3.2 18 3.5 18 3.5c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.4-5.3 5.8.4.3.8 1 .8 2v2.9c0 .3.2.7.8.6A12 12 0 0012 .5z" />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </a>

                  <a
                    href={selectedStudent.linkedinLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      aria-label="LinkedIn"
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-white text-black text-sm font-medium cursor-pointer ease-linea
                 hover:bg-white hover:text-black hover:border-neutral-300
                 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                      {/* LinkedIn icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M4.98 3.5a2.5 2.5 0 11.02 0zM3 8.5h4v12H3zM9 8.5h3.8v1.6h.1c.5-.9 1.8-1.8 3.6-1.8 3.8 0 4.5 2.5 4.5 5.7v6.5h-4v-5.8c0-1.4 0-3.2-1.9-3.2-1.9 0-2.2 1.5-2.2 3.1v5.9H9z" />
                      </svg>
                      <span>LinkedIn</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      </main>
    </div>
  );
}
