import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  location: String,
  package: Number,
  salaryType: {
    type: String,
    enum: ["LPA", "Monthly", "Stipend"],
    default: "LPA",
  },
  duration: String,
  minCGPA: Number,
  branch: [String],
  skillsRequired: [String],
  type: {
    type: String,
    enum: ["Internship", "Full-time", "Part-time", "Remote", "Contract"],
    default: "Full-time",
  },
  mode: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
    default: "Onsite",
  },
  experienceLevel: {
    type: String,
    enum: ["Fresher", "0-1 years", "1-3 years", "3+ years"],
    default: "Fresher",
  },
  lastDateToApply: Date,
  postedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "closed", "draft"],
    default: "active",
  },
  collegeID: { type: Number, ref: "Admin" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  applicants: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: { type: String, default: "applied" },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
