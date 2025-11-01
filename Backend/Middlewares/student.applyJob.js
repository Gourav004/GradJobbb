import Job from "../models/jobs.model.js";

export const studentApplyJobs = async (req, res) => {
  try {
    const { jobId } = req.params;
    const studentId = req.user._id;

    // 1) Get job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    // 2) Optional: college match
    if (
      job.collegeID &&
      req.user.collegeID &&
      job.collegeID.toString() !== req.user.collegeID.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can't apply to this job (different college)." });
    }

    // 3) Last date validation (allow if lastDateToApply >= today)
    if (job.lastDateToApply) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // start of today
      const lastDate = new Date(job.lastDateToApply);
      lastDate.setHours(0, 0, 0, 0); // start of lastDate
      if (lastDate < today) {
        return res.status(400).json({
          message: "Application closed. Last date to apply has passed.",
        });
      }
    }

    // 4) Prevent duplicate apply
    const alreadyApplied = job.applicants.some((app) => {
      // applicant could be object {_id:..., status:...} or just ObjectId
      if (app && app._id) return app._id.toString() === studentId.toString();
      return app.toString() === studentId.toString();
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job." });
    }

    // 5) Push applicant entry (match your applicants schema)
    job.applicants.push({
      _id: studentId,
      status: "applied",
      appliedAt: new Date(),
    });

    await job.save();

    return res
      .status(200)
      .json({ message: "Applied to the job successfully.", appliedJob: job });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};
