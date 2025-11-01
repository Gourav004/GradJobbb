import Student from "../models/student.model.js";

export const getStudentsList = async (req, res) => {
  try {
    // logged-in admin ka collegeID
    const adminCollegeID = req.user.collegeID;

    if (!adminCollegeID) {
      return res.status(401).json({ message: "Admin college ID not found" });
    }

    // find students with same collegeID
    const students = await Student.find({ collegeID: adminCollegeID }).sort({
      createdAt: -1,
    });

    if (!students || students.length === 0) {
      return res
        .status(200)
        .json({ message: "No students found", students: [] });
    }

    return res.status(200).json({ count: students.length, students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
