import Job from "../models/jobs.model.js";

export const studentViewJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Find job by ID
    const job = await Job.findById(id);

    if (!job) return res.status(404).json({ message: "Job not found." });

    // Optional: check if student's collegeID matches
    if (job.collegeID.toString() !== req.user.collegeID.toString()) {
      return res.status(403).json({ message: "You can't view this job." });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      job: job,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};
