import Job from "../models/jobs.model.js";

export const showAppliedJobs = async (req, res) => {
  try {
    // ✅ 1. User ke applied job IDs nikal lo
    const appliedJobIds = req.user.appliedJobs;

    // Agar applied jobs nahi hain
    if (!appliedJobIds || appliedJobIds.length === 0) {
      return res.json({
        message: "No applied jobs found",
        jobs: [],
      });
    }

    // ✅ 2. Sare job IDs ke documents fetch karo
    const appliedJobs = await Job.find({
      _id: { $in: appliedJobIds },
    }).select("-__v"); // __v field ko remove karne ke liye optional

    // ✅ 3. Response bhejo
    res.status(200).json({
      message: "Your applied jobs",
      count: appliedJobs.length,
      jobs: appliedJobs,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
