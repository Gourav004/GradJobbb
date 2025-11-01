import Student from "../models/student.model.js";

export const studentEditProfile = async (req, res) => {
  try {
    const id = req.user._id;

    const isStudent = await Student.findById(id);
    if (!isStudent) return res.status(404).send("Student not found!");

    // Only allow these fields to be updated
    const allowedFields = [
      "name",
      "resumeLink",
      "skills",
      "phone",
      "branch",
      "year",
      "githubLink",
      "linkedinLink",
    ];

    // Filter req.body to include only allowed fields (simple one-liner)
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    const updatedProfile = await Student.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", error: error.message });
  }
};
