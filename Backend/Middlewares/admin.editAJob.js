import Job from "../models/jobs.model.js";

export const editAJob = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInAdmin = req.user._id;

    // check if job belongs to that admin
    const job = await Job.findOne({ _id: id, postedBy: loggedInAdmin });
    if (!job) {
      return res.status(404).send("Job not found or unauthorized");
    }

    // update only the fields in req.body
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).send("ERROR: " + error.message);
  }
};
