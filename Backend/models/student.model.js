import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    collegeID: {
      type: Number,
      length: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    resumeLink: {
      type: String,
      default: "",
    },
    githubLink: {
      // ✅ GitHub link add kiya
      type: String,
      default: "",
      trim: true,
    },
    linkedinLink: {
      // ✅ LinkedIn link add kiya
      type: String,
      default: "",
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
