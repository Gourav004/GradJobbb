import Admin from "../models/admin.model.js";
import Job from "../models/jobs.model.js";

export const viewjobs = async (req, res) => {
  try {
    const loggedInUser = await Job.find({ postedBy: req.user._id });
    console.log("req.user" + req.user);
    console.log("loggedInUser", loggedInUser);
    return res.status(200).json(loggedInUser);
  } catch (error) {
    return res.status(401).send("ERROR: " + error.message);
  }
};
