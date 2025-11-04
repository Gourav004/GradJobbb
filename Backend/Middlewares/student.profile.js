import Student from "../models/student.model.js";

export const studentViewProfile = async (req, res) => {
  try {
    // id ko token se nikaal liya
    const id = req.user.id;

    const student = await Student.findById(id).select({
      name: 1,
      email: 1,
      collegeID: 1,
      phone: 1,
      year: 1,
      branch: 1,
      resumeLink: 1,
      githubLink: 1,
      linkedinLink: 1,
      skills: 1,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};
