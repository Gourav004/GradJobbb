import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Layers,
  Code2,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

// --- REUSABLE COMPONENTS (Moved outside to fix focus issue) ---

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-white/10">
    <Icon className="w-5 h-5 text-cyan-400" />
    <h3 className="text-lg font-semibold text-white tracking-wide">{title}</h3>
  </div>
);

const InputGroup = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
  fullWidth = false,
  as = "input",
  options = [],
  step, // Added step prop for number inputs like CGPA
}) => {
  const Component = as === "select" || as === "textarea" ? as : "input";

  return (
    <div className={`flex flex-col ${fullWidth ? "col-span-full" : ""}`}>
      <label className="mb-2 text-sm font-medium text-gray-400">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      {as === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="px-4 py-3 bg-gray-950 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all appearance-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-gray-900">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Component
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={as === "textarea" ? 5 : undefined}
          step={step}
          className={`px-4 py-3 bg-gray-950 border border-white/10 rounded-xl text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all ${
            as === "textarea" ? "resize-none" : ""
          }`}
        />
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const AdminPostJob = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "Remote",
    package: "",
    salaryType: "LPA",
    duration: "",
    minCGPA: "",
    branch: [],
    skillsRequired: [],
    type: "Full-time",
    mode: "Onsite",
    experienceLevel: "Fresher",
    lastDateToApply: "",
    status: "active",
  });

  const branchOptions = [
    "CSE",
    "IT",
    "ECE",
    "EE",
    "ME",
    "Civil",
    "Chemical",
    "Aerospace",
    "Biotech",
    "Other",
  ];

  // --- EVENT HANDLERS ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchToggle = (branch) => {
    setFormData((prev) => {
      const currentBranches = prev.branch;
      if (currentBranches.includes(branch)) {
        return {
          ...prev,
          branch: currentBranches.filter((b) => b !== branch),
        };
      } else {
        return { ...prev, branch: [...currentBranches, branch] };
      }
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skillsRequired.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skillsRequired: [...prev.skillsRequired, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic validation required by backend
    if (
      !formData.title ||
      !formData.company ||
      !formData.description ||
      !formData.package ||
      !formData.lastDateToApply
    ) {
      setError("Please fill in all required fields marked with *");
      setIsLoading(false);
      // Scroll to top to see error
      window.scrollTo(0, 0);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/postjob",
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        setSuccess("Job posted successfully!");
        // Optional: Navigate back after a short delay
        setTimeout(() => navigate("/admin/jobs"), 2000);
      }
    } catch (err) {
      console.error("Error posting job:", err);
      setError(
        err.response?.data?.message || "Server error while posting job."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 px-8 py-10 md:px-16 font-['Inter',sans-serif]">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
            <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl shadow-[0_0_10px_rgba(0,255,255,0.15)]">
              <Briefcase className="w-9 h-9 text-cyan-400" />
            </div>
            Post a New Job
          </h1>
          <p className="text-gray-400 text-lg ml-16">
            Create a new job listing for students.
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-8 p-4 bg-red-950/30 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-8 p-4 bg-green-950/30 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/70 border border-white/10 p-10 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.07)] space-y-10 backdrop-blur-md"
        >
          {/* Basic Info */}
          <section>
            <SectionTitle icon={Building2} title="Basic Information" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputGroup
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. SDE-1 Intern"
                required
              />
              <InputGroup
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Zomato"
                required
              />
              <InputGroup
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Delhi or Remote"
              />
            </div>
          </section>

          {/* Job Details */}
          <section>
            <SectionTitle icon={Layers} title="Job Details" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputGroup
                label="Type"
                name="type"
                as="select"
                value={formData.type}
                onChange={handleChange}
                options={[
                  "Full-time",
                  "Internship",
                  "Part-time",
                  "Remote",
                  "Contract",
                ]}
              />
              <InputGroup
                label="Work Mode"
                name="mode"
                as="select"
                value={formData.mode}
                onChange={handleChange}
                options={["Onsite", "Remote", "Hybrid"]}
              />
              <InputGroup
                label="Experience Level"
                name="experienceLevel"
                as="select"
                value={formData.experienceLevel}
                onChange={handleChange}
                options={["Fresher", "0-1 years", "1-3 years", "3+ years"]}
              />
            </div>
            <InputGroup
              label="Job Description"
              name="description"
              as="textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the role, responsibilities, and tech stack..."
              required
              fullWidth
            />
          </section>

          {/* Salary */}
          <section>
            <SectionTitle icon={DollarSign} title="Salary & Timing" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputGroup
                label="Package / Stipend"
                name="package"
                type="number"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g. 12"
                required
              />
              <InputGroup
                label="Salary Type"
                name="salaryType"
                as="select"
                value={formData.salaryType}
                onChange={handleChange}
                options={["LPA", "Monthly", "Stipend"]}
              />
              <InputGroup
                label="Duration (if internship)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 6 months"
              />
              <InputGroup
                label="Last Date to Apply"
                name="lastDateToApply"
                type="date"
                value={formData.lastDateToApply}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <SectionTitle icon={GraduationCap} title="Eligibility & Skills" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <InputGroup
                label="Minimum CGPA"
                name="minCGPA"
                type="number"
                step="0.1"
                value={formData.minCGPA}
                onChange={handleChange}
                placeholder="e.g. 7.0"
              />
            </div>

            {/* Branches */}
            <div className="flex flex-col">
              <label className="mb-3 text-sm font-medium text-gray-400">
                Eligible Branches
              </label>
              <div className="flex flex-wrap gap-3">
                {branchOptions.map((branch) => (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => handleBranchToggle(branch)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.branch.includes(branch)
                        ? "bg-cyan-950/50 border-cyan-500/50 text-cyan-300"
                        : "bg-gray-950 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col mt-6">
              <label className="mb-3 text-sm font-medium text-gray-400">
                Skills Required{" "}
                <span className="text-gray-600">(Type and press Enter)</span>
              </label>
              <div className="min-h-[50px] px-4 py-3 bg-gray-950 border border-white/10 rounded-xl flex flex-wrap items-center gap-2 focus-within:border-cyan-500/50 transition-colors">
                {formData.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-200 text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder={
                    formData.skillsRequired.length === 0
                      ? "e.g. Java, AWS..."
                      : ""
                  }
                  className="bg-transparent border-none outline-none flex-1 text-gray-200 placeholder:text-gray-600 min-w-[120px]"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </>
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.25s ease-out forwards;
      }
    `}</style>
    </div>
  );
};

export default AdminPostJob;
