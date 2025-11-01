import Job from "../models/jobs.model.js";

export const cgpaFilter = async (req, res) => {
  try {
    const studentCgpa = Number(req.params.cgpa);

    // Find all jobs jinke minCGPA student ke CGPA se kam ya barabar ho
    const filteredJobs = await Job.find({ minCGPA: { $lte: studentCgpa } });

    if (filteredJobs.length === 0) {
      return res.status(200).send("No jobs found for this CGPA");
    }

    return res.status(200).json({
      message: "Filtered jobs fetched successfully",
      filteredJobs,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};


