import Admin from "../models/admin.model.js"; // Job ki jagah Admin model
import Student from "../models/student.model.js";

export const adminViewProfile = async (req, res) => {
  try {
    const id = req.user._id; // logged-in admin ka ID middleware se
    const loggedinAdmin = await Admin.findById(id); // await added

    if (!loggedinAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const students = await Student.find({ collegeID: req.user.collegeID });
    const studentCount = students.length;

    res.status(200).json({
      message: "Profile Fetched Successfully",
      admin: loggedinAdmin,
      students: studentCount,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
