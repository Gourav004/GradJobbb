import Admin from "../models/admin.model.js";
import Job from "../models/jobs.model.js";

export const viewjobs = async (req, res) => {
  try {
    const loggedInUser = await Job.find({ postedBy: req.user._id });
    return res.status(200).json(loggedInUser);
  } catch (error) {
    return res.status(401).send("ERROR: " + error.message);
  }
};
