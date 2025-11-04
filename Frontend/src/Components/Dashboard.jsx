import React, { useState, useRef, useEffect } from "react";
// Removed dependencies that cannot be resolved in this environment:
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { removeUser } from "@/Store/userSlice";

// --- Custom Hook to detect click outside ---
// This is used for both the profile dropdown and the new sidebar

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
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

// --- Main App Component ---
export default function App() {
  // --- STATE AND REFS ---
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  const [profile, setProfile] = useState("");
  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/user/profile", {
      withCredentials: true,
    });
    setProfile(res.data.student.name);
    console.log("Res ", profile);
  }, []);
  // --- HOOKS ---
  // Removed useSelector and useNavigate hooks as dependencies are not available.

  // Using dummy user data as useSelector is not available
  // const user = { id: "123", name: "Alex" };
  // const user = null; // Test guest user

  // --- EVENT HANDLERS ---
  useClickOutside(profileRef, () => setIsProfileOpen(false));
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true } // 👈 important for cookies
      );

      console.log(res.data);
      console.log("Logged out successfully");
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // --- SVG Icons for Mobile Menu ---
  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // --- Reusable Nav Link Component ---
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

  const navItems = [
    {
      href: "/dashboard",
      text: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-5 h-5 text-cyan-400"
        >
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="4" rx="1" />
          <rect x="13" y="9" width="8" height="12" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
        </svg>
      ),
    },
    {
      href: "/jobs",
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
      href: "/apply",
      text: "Applied Jobs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-5 h-5 text-cyan-400"
        >
          <path d="M9 2h6a1 1 0 0 1 1 1v1" />
          <rect x="4" y="4" width="16" height="18" rx="2" />
          <path d="M8 11h8" />
          <path d="M8 15h8" />
          <circle cx="8" cy="7" r="0.5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="relative w-full min-h-screen bg-gray-950 text-white overflow-x-hidden font-['Inter',sans-serif]">
        {/* Background blobs */}
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute -top-40 -left-40 w-[600px] h-[400px] bg-gradient-to-br from-cyan-600/30 to-blue-800/20 rounded-full blur-3xl opacity-50 animate-blob-slow" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-teal-500/30 to-purple-800/20 rounded-full blur-3xl opacity-50 animate-blob-slow delay-1000" />
        </div>

        <style>
          {`
            @keyframes blob-slow {
              0%, 100% { transform: translate(0,0) scale(1); }
              33% { transform: translate(30px,-50px) scale(1.1); }
              66% { transform: translate(-20px,20px) scale(0.9); }
            }
            .animate-blob-slow { animation: blob-slow 10s infinite ease-in-out; }
            .animate-blob-slow.delay-1000 { animation-delay: 1s; }
            
            /* Simple transition for dropdown and sidebar */
            .simple-transition { transition: all 0.3s ease-in-out; }
            .dropdown-enter { opacity: 0; transform: translateY(-10px) scale(0.9); }
            .dropdown-enter-active { opacity: 1; transform: translateY(0) scale(1); }
            .dropdown-exit { opacity: 1; transform: translateY(0) scale(1); }
            .dropdown-exit-active { opacity: 0; transform: translateY(-10px) scale(0.95); }
            
            .sidebar-enter { transform: translateX(-100%); }
            .sidebar-enter-active { transform: translateX(0); }
            .sidebar-exit { transform: translateX(0); }
            .sidebar-exit-active { transform: translateX(-100%); }
            
            .overlay-enter { opacity: 0; }
            .overlay-enter-active { opacity: 1; }
            .overlay-exit { opacity: 1; }
            .overlay-exit-active { opacity: 0; }
          `}
        </style>

        {/* Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50">
          <div className="backdrop-blur-lg bg-black/30 border border-cyan-400/20 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg shadow-cyan-400/10 transition-all duration-300">
            {/* NEW: Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-1 text-white/80 hover:text-cyan-300 hover:bg-cyan-400/20 rounded-lg md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            <div className="text-xl sm:text-2xl font-bold text-white md:ml-0">
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
                    src="https://imgs.search.brave.com/aT0xgQwDvH5DvcMVLSu7j8PcNMFRxfHfLa4LWI7T8io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODk1Lzg4OTU0/NTgucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                    alt="profile"
                    onError={(e) => {
                      // Fallback in case image fails to load
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png";
                    }}
                  />
                </div>
                <div className="font-[20px] text-white/80 hidden sm:block">
                  {profile || "Guest"}
                </div>
              </button>

              {/* Dropdown Menu - Replaced motion.div with div and simple transitions */}
              {isProfileOpen && (
                <div
                  key="dropdown"
                  className="absolute top-full right-0 mt-3 w-56 rounded-xl shadow-lg shadow-cyan-400/10 
                        bg-black/70 backdrop-blur-xl border border-cyan-400/20 z-50 overflow-hidden
                        origin-top-right simple-transition dropdown-enter dropdown-enter-active"
                >
                  <div
                    className="p-2 simple-transition"
                    style={{ transitionDelay: "0.05s" }}
                  >
                    {/* Menu Items */}
                    <a
                      href={"/studentProfile"}
                      className="flex justify-between items-center w-full px-3 py-2 text-sm text-white/90 
                            rounded-md cursor-pointer transition-all duration-200 hover:bg-cyan-400/15 hover:translate-x-0.5"
                    >
                      Profile
                      <span className="bg-cyan-500/20 text-cyan-300 text-xs font-medium px-2 py-0.5 rounded-full">
                        New
                      </span>
                    </a>

                    <a
                      href="#"
                      className="block w-full text-left px-3 py-2 text-sm text-white/80 
                            hover:text-white rounded-md cursor-pointer transition-all duration-200 hover:bg-cyan-400/15 hover:translate-x-0.5"
                    >
                      Settings
                    </a>

                    <div className="h-px bg-white/10 my-1"></div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-sm text-red-400 
                            rounded-md transition-all duration-200 cursor-pointer hover:bg-red-500/15 hover:text-red-300 hover:translate-x-0.5"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Replaced AnimatePresence with simple conditional rendering */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div
              key="sidebar-overlay"
              className="fixed inset-0 bg-black/50 z-40 md:hidden simple-transition overlay-enter overlay-enter-active"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside
              key="sidebar-nav"
              ref={sidebarRef}
              className="fixed top-0 left-0 h-full w-60 bg-gray-950/90 backdrop-blur-lg 
                            border-r border-cyan-400/20 shadow-xl shadow-cyan-400/10 z-50 md:hidden
                            simple-transition sidebar-enter sidebar-enter-active"
            >
              <div className="p-4 flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">
                    Grad<span className="text-cyan-400">Job</span>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-white/80 hover:text-cyan-300 duration-300 hover:bg-cyan-400/20 rounded-lg"
                    aria-label="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.text}
                      href={item.href}
                      icon={item.icon}
                      text={item.text}
                      isMobile={true}
                    />
                  ))}
                </nav>
              </div>
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="pt-32 p-8 relative z-10"></main>
      </div>
    </>
  );
}
