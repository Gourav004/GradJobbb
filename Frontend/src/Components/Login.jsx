import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Key } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/Store/userSlice";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const FrostedCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="bg-gradient-to-br from-indigo-900/20 via-black/20 to-cyan-900/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-sm mx-auto"
  >
    {children}
  </motion.div>
);

const AuthInput = ({
  Icon,
  type,
  placeholder,
  value,
  onChange,
  name,
  isRequired = true,
  onTogglePassword,
  showPassword,
}) => (
  <div className="relative flex items-center mb-4">
    <Icon className="absolute left-3 w-4 h-4 text-cyan-400" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={isRequired}
      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
    />
    {name === "password" && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 text-cyan-400 hover:text-cyan-200 transition-colors duration-300"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223C2.677 9.778 2 11.81 2 12c0 .19.677 2.222 1.98 3.777C5.623 17.88 8.55 20 12 20c3.45 0 6.377-2.12 8.02-4.223C21.323 14.222 22 12.19 22 12c0-.19-.677-2.222-1.98-3.777C18.377 6.12 15.45 4 12 4c-3.45 0-6.377 2.12-8.02 4.223z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
            />
          </svg>
        )}
      </button>
    )}
  </div>
);

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    collegeID: "",
    email: "test2@gmail.com",
    password: "Test2@123",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) dispatch(addUser(storedUser));
  }, [dispatch]);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? "http://localhost:5000/user/signup"
        : "http://localhost:5000/user/login";
      const payload = isSignUp
        ? formData
        : { email: formData.email, password: formData.password };
      const res = await axios.post(url, payload);

      const userData = res.data?.student;
      if (userData) {
        // 1️⃣ Save in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        // 2️⃣ Update Redux state
        dispatch(addUser(userData));
      }

      toast.success(isSignUp ? "Signup Successful!" : "Login Successful!");
      setFormData({ name: "", collegeID: "", email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-black to-cyan-900 p-2 font-['Inter',sans-serif]">
      <a href="/" className="absolute left-6 top-4">
        <button className="text-white px-1 font-[10px] py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 shadow-md transition-all duration-300 hover:bg-white/25 active:scale-95 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-[12px]"> Back to Home</span>
        </button>
      </a>

      <FrostedCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? "signup" : "login"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center mb-6">
              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-extrabold text-white mb-1"
              >
                {isSignUp ? "Create Account" : "Welcome Back"}
              </motion.h1>
              <p className="text-gray-400 text-[12px]">
                {isSignUp
                  ? "Join GradJob and find your dream role."
                  : "Sign in to access your dashboard."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <AuthInput
                    Icon={User}
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <AuthInput
                    Icon={Key}
                    type="text"
                    placeholder="College ID"
                    name="collegeID"
                    value={formData.collegeID}
                    onChange={handleChange}
                  />
                </>
              )}
              <AuthInput
                Icon={Mail}
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <AuthInput
                Icon={Lock}
                type={ShowPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onTogglePassword={handleShowPassword}
                showPassword={ShowPassword}
              />

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(6,182,212,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-2.5 mt-3 rounded-lg font-bold text-lg bg-gradient-to-r from-cyan-500 to-cyan-500 text-white shadow-md shadow-cyan-500/30 transition-all duration-300"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </motion.button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => setIsSignUp((prev) => !prev)}
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span className="font-semibold">Log In</span>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <span className="font-semibold">Sign Up</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </FrostedCard>
    </div>
  );
};

export default LoginSignup;
