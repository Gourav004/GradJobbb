import mongoose from "mongoose";
import Job from "../models/jobs.model.js";

const PostNewJob = async (req, res) => {
  try {
    // Destructure all possible fields from req.body
    const {
      title,
      company,
      companyLogo,
      description,
      location,
      package: jobPackage,
      salaryType,
      duration,
      minCGPA,
      branch,
      skillsRequired,
      type,
      mode,
      experienceLevel,
      openings,
      lastDateToApply,
      status,
      collegeID,
      postedBy,
    } = req.body;

    // Basic validation
    if (!title || !company || !description || !jobPackage || !lastDateToApply) {
      return res.status(400).json({
        message:
          "Please fill all required fields (title, company, description, package, lastDateToApply).",
      });
    }

    // Create new job
    const newJob = new Job({
      title,
      company,
      companyLogo: companyLogo || "",
      description,
      location: location || "Remote",
      package: jobPackage,
      salaryType: salaryType || "LPA",
      duration: duration || "",
      minCGPA: minCGPA || 0,
      branch: branch || ["CSE", "IT", "ECE"],
      skillsRequired: skillsRequired || [],
      type: type || "Full-time",
      mode: mode || "Onsite",
      experienceLevel: experienceLevel || "Fresher",
      openings: openings || 1,
      lastDateToApply,
      status: status || "active",
      collegeID: collegeID || req.user?.collegeID,
      postedBy: postedBy || req.user?._id,
    });

    await newJob.save();

    return res.status(201).json({
      message: "Job posted successfully ✅",
      job: newJob,
    });
  } catch (error) {
    console.error("ERROR while posting job:", error);
    return res.status(500).json({
      message: "Server error while posting job",
      error: error.message,
    });
  }
};

export default PostNewJob;
