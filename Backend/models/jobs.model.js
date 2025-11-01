// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    default: "Remote",
    trim: true,
  },
  package: {
    type: Number, // in LPA
    required: true,
  },
  minCGPA: {
    type: Number,
    default: 0, // optional, zero means no minimum
  },
  branch: {
    type: [String], // allowed branches
    default: ["CS", "IT", "ECE", "EE", "ME"], // default common branches
  },
  lastDateToApply: {
    type: Date,
    required: true,
  },
  collegeID: {
    type: Number,
    length: 6,
  },
  applicants: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected", "selected"],
        default: "applied",
      },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
