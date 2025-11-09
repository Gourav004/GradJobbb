import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// --- Custom Hook for clicking outside elements ---
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

// --- ICONS ---
const Icons = {
  Menu: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  ),
  Close: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Students: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Jobs: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  PostJob: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  ),
  Mail: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  Calendar: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  GitHub: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  LinkedIn: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  ExternalLink: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  ),
  LogOut: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),
  Profile: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

// --- PRO STUDENT DETAIL MODAL ---
const StudentModal = ({ student, onClose }) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#09090b] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 animate-slideUp"
      >
        <div className="h-24 bg-gradient-to-r from-cyan-900/30 to-zinc-900/50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-all z-10"
          >
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 pb-8 relative -mt-12">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-[#09090b]">
              <img
                src={
                  student.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt={student.name}
                className="w-full h-full rounded-full object-cover bg-zinc-800"
              />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/50 border border-cyan-900 rounded">
                {student.collegeID}
              </span>
              {student.branch && (
                <span className="px-2 py-0.5 text-xs font-medium text-zinc-300 bg-zinc-800 rounded border border-zinc-700">
                  {student.branch}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <Icons.Jobs className="w-4 h-4 text-cyan-500/80" />
                <span>Jobs Applied</span>
              </div>
              <span className="text-white font-semibold">
                {student.appliedJobs?.length || 0}
              </span>
            </div>
            <div className="h-px bg-zinc-800/50 w-full my-2"></div>
            <div className="flex items-center gap-3 text-zinc-300 text-sm">
              <Icons.Mail className="w-4 h-4 text-zinc-500" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300 text-sm">
              <Icons.Phone className="w-4 h-4 text-zinc-500" />
              <span>{student.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300 text-sm">
              <Icons.Calendar className="w-4 h-4 text-zinc-500" />
              <span>
                Joined {new Date(student.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            {student.githubLink ? (
              <a
                href={student.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-100 hover:bg-white text-black text-sm font-bold rounded-xl transition-colors"
              >
                <Icons.GitHub className="w-4 h-4" /> GitHub
              </a>
            ) : (
              <button
                disabled
                className="flex-1 py-2.5 bg-zinc-800/50 text-zinc-500 text-sm font-bold rounded-xl cursor-not-allowed"
              >
                GitHub
              </button>
            )}
            {student.linkedinLink ? (
              <a
                href={student.linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white text-sm font-bold rounded-xl transition-colors"
              >
                <Icons.LinkedIn className="w-4 h-4" /> LinkedIn
              </a>
            ) : (
              <button
                disabled
                className="flex-1 py-2.5 bg-zinc-800/50 text-zinc-500 text-sm font-bold rounded-xl cursor-not-allowed"
              >
                LinkedIn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [profile, setProfile] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, profileRes] = await Promise.all([
          axios.get("https://gradjob.onrender.com/admin/students", {
            withCredentials: true,
          }),
          axios.get("https://gradjob.onrender.com/admin/profile", {
            withCredentials: true,
          }),
        ]);
        setStudents(studentsRes.data.students);
        setCount(studentsRes.data.count);
        setProfile(profileRes.data.admin.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useClickOutside(profileRef, () => setIsProfileOpen(false));
  useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://gradjob.onrender.com/admin/logout",
        {},
        { withCredentials: true }
      );
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
      icon: <Icons.Students className="w-5 h-5" />,
    },
    {
      href: "/admin/jobs",
      text: "Jobs",
      icon: <Icons.Jobs className="w-5 h-5" />,
    },
    {
      href: "/admin/postJob",
      text: "Post Job",
      icon: <Icons.PostJob className="w-5 h-5" />,
    },
  ];

  const isLinkActive = (href) =>
    location.pathname === href ||
    (href === "/admin/students" && location.pathname === "/");

  return (
    <div className="relative w-full min-h-screen bg-black text-zinc-100 font-['Inter',sans-serif] overflow-x-hidden">
      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
            <div className="text-xl font-extrabold text-white tracking-tight">
              Grad<span className="text-cyan-500">Job</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.text}
                onClick={() => navigate(item.href)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                             ${
                               isLinkActive(item.href)
                                 ? "bg-cyan-950/40 text-cyan-400 border border-cyan-900/50"
                                 : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
                             }`}
              >
                {item.icon} {item.text}
              </div>
            ))}
          </nav>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800"
            >
              <span className="hidden sm:block text-sm font-semibold text-zinc-300">
                {profile || "Admin"}
              </span>
              <img
                className="w-8 h-8 rounded-full object-cover bg-zinc-800 border border-zinc-700"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
              />
            </button>
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#0c0c0c] border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 animate-fadeIn origin-top-right">
                <div
                  onClick={() => navigate("/admin/profile")}
                  className="flex items-center justify-between gap-2.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icons.Profile className="w-4 h-4 text-cyan-500" /> Profile
                  </div>
                  <span className="bg-cyan-950/50 text-cyan-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-900">
                    New
                  </span>
                </div>
                <div className="h-px bg-zinc-800/50 my-1.5 mx-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Icons.LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside
          ref={sidebarRef}
          className={`absolute top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 p-6 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-extrabold text-white">
              Grad<span className="text-cyan-500">Job</span>
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-zinc-500 hover:text-white"
            >
              <Icons.Close className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div
                key={item.text}
                onClick={() => {
                  navigate(item.href);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer
                     ${
                       isLinkActive(item.href)
                         ? "bg-cyan-950/40 text-cyan-400"
                         : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                     }`}
              >
                {item.icon} {item.text}
              </div>
            ))}
          </nav>
        </aside>
      </div>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Icons.Students className="w-8 h-8 text-cyan-500" /> Student
              Directory
            </h1>
            <p className="text-zinc-400 mt-1 ml-11">
              View and manage registered students.
            </p>
          </div>
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-3 self-start sm:self-auto">
            <span className="text-zinc-400 text-sm font-medium">
              Total Students
            </span>
            <span className="text-xl font-bold text-white">{count || 0}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                onClick={() => setSelectedStudent(student)}
                className="group relative bg-[#0c0c0c] hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-500/30 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={
                        student.imageUrl ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover bg-zinc-800 border border-zinc-700"
                    />
                    <div>
                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        {student.collegeID}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 rounded-full text-zinc-600 group-hover:text-cyan-400 group-hover:bg-cyan-950/30 transition-all">
                    <Icons.ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                  {student.branch ? (
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/30 rounded-md border border-cyan-900/50">
                      {student.branch}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-zinc-500 bg-zinc-800/50 rounded-md border border-zinc-800">
                      No Branch
                    </span>
                  )}
                  {student.year && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-zinc-300 bg-zinc-800/50 rounded-md border border-white/5">
                      {student.year} Year
                    </span>
                  )}
                </div>
                <div className="relative z-10 pt-3 border-t border-zinc-800/50 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 truncate max-w-[55%]">
                    {student.email}
                  </span>
                  <span
                    className={`font-medium px-2 py-0.5 rounded-md ${
                      student.appliedJobs?.length > 0
                        ? "text-emerald-400 bg-emerald-950/30"
                        : "text-zinc-500 bg-zinc-800/50"
                    }`}
                  >
                    {student.appliedJobs?.length || 0} Applied
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/20 rounded-3xl border border-zinc-800/50 border-dashed">
              <Icons.Students className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">No students found</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: scale(0.96) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
