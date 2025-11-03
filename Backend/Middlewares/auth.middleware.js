import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { name, email, password, collegeID } = req.body;

    if (!name || !email || !password || !collegeID) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await Student.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      collegeID,
    });
    await newStudent.save();

    const token = jwt.sign({ id: newStudent._id }, "GRADJOB", {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "Signup successful",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        collegeID: newStudent.collegeID,
      },
    });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, "GRADJOB", { expiresIn: "1h" });

    // ✅ cookie set karte waqt options lagana mat bhoolo
    res.cookie("token", token, {
      httpOnly: true,
    });

    console.log("✅ Token cookie set successfully");

    // ✅ sirf ek hi response
    return res.status(200).json({
      message: "Login successful",
      student,
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
