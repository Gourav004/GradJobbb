import Job from "../models/jobs.model.js";

export const studentGetJob = async (req, res) => {
  try {
    // ✅ Get student's college ID from authenticated user
    const studentCollegeID = req.user.collegeID;
    console.log("🎓 Student College ID:", studentCollegeID);

    // ✅ Find jobs related to that college
    const jobsList = await Job.find({ collegeID: studentCollegeID });

    if (!jobsList.length) {
      return res.status(200).send("No jobs posted by admin");
    }

    return res.status(200).json({
      message: "All jobs have been fetched successfully.",
      allJobs: jobsList,
    });
  } catch (error) {
    console.error("❌ Error in studentGetJob:", error.message);
    console.log(req.user);
    res.status(500).json({ message: "ERROR", error: error.message });
  }
};
