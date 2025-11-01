import Job from "../models/jobs.model.js";

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInAdmin = req.user._id;

    // Pehle check kar lo ki job exist karti hai aur ye admin hi ne post ki thi
    const job = await Job.findOne({ _id: id, postedBy: loggedInAdmin });
    if (!job) {
      return res.status(404).send("Job not found or unauthorized");
    }

    // Delete the job
    await Job.findByIdAndDelete(id);

    return res.status(200).send("Job deleted successfully");
  } catch (error) {
    return res.status(500).send("ERROR: " + error.message);
  }
};
