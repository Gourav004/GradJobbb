import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailRegex, passRegex } from "../regex.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, collegeID } = req.body;

    if (!name || !email || !password || !collegeID) {
      return res.status(400).send("Please enter all the fields.");
    }
    const isExistingUser = await Admin.findOne({ email });
    if (isExistingUser) {
      return res.status(404).send("Admin already exists.");
    }
    if (!passRegex(password)) {
      return res.status(400).send("Invalid password format");
    }
    if (!emailRegex(email)) {
      return res.status(400).send("Invalid email format");
    }
    if (collegeID.length < 6 || collegeID.length > 6) {
      return res.status(400).send("Invalid CollegeID");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashedPassword,
      collegeID: collegeID,
    });

    await newAdmin.save();
    //JWT
    const token = jwt.sign({ id: newAdmin._id }, "GRADJOB", {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.status(201).json({
      message: "Admin created successfully",
      Admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        collegeID: newAdmin.collegeID,
      },
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).send("ERROR", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    const isExistingUser = await Admin.findOne({ email });
    if (!isExistingUser) {
      return res.status(401).json({ message: "Admin not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: isExistingUser._id }, "GRADJOB", {
      expiresIn: "1d",
    });

    // ✅ Set cookie properly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: "lax",
    });

    // ✅ Return token in response (optional)
    return res.status(200).json({
      message: "Login successful",
      admin: isExistingUser,
      token, // optional: helps with debugging in Postman
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

//logout API
export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting empty value and immediate expiry
    res.cookie("token", "");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
