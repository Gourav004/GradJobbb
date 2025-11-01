import Job from "../models/jobs.model.js";

export const viewAJob = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInAdmin = req.user._id;

    if (!loggedInAdmin) {
      return res.status(401).send("Unauthorised");
    }

    // Only fetch if this job belongs to the logged-in admin
    const currentJob = await Job.findOne({ _id: id, postedBy: loggedInAdmin });

    if (!currentJob) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized to view" });
    }

    return res.status(200).json(currentJob);
  } catch (error) {
    return res.status(500).send("ERROR: " + error.message);
  }
};
