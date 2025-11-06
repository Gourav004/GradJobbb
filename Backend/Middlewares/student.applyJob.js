import Job from "../models/jobs.model.js";
import Student from "../models/student.model.js";

export const studentApplyJobs = async (req, res) => {
  try {
    const { jobId } = req.params;
    const studentId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    const alreadyApplied = job.applicants.some((app) => {
      if (app && app._id) return app._id.toString() === studentId.toString();
      return app.toString() === studentId.toString();
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job." });
    }

    // Add to job applicants
    job.applicants.push({
      _id: studentId,
      status: "applied",
      appliedAt: new Date(),
    });
    await job.save();

    // Add job ID to student's appliedJobs array
    await Student.findByIdAndUpdate(
      studentId,
      { $push: { appliedJobs: jobId } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Applied to the job successfully.", appliedJob: job });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};
