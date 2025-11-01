import mongoose from "mongoose";
import Job from "../models/jobs.model.js";

const PostNewJob = async (req, res) => {
  try {
    // req.body me admin ne form se bheja hoga
    const {
      title,
      company,
      description,
      location,
      package: jobPackage,
      minCGPA,
      branch,
      lastDateToApply,
    } = req.body;

    // Basic validation (optional)
    if (!title || !company || !description || !lastDateToApply || !jobPackage) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Create new job
    const newJob = new Job({
      title,
      company,
      description,
      location: location || "Remote",
      package: jobPackage,
      minCGPA: minCGPA || 0,
      branch: branch || ["CS", "IT", "ECE", "EE", "ME"],
      lastDateToApply,
      postedBy: req.user._id, // admin ID from auth middleware
      collegeID: req.user.collegeID,
    });

    await newJob.save();

    return res
      .status(201)
      .json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default PostNewJob;
