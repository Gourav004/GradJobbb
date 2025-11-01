import express from "express";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailRegex, passRegex } from "../regex.js";

export const Signup = async (req, res) => {
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
    const token = jwt.sign({ id: newAdmin._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    res.cookie("token", token, {
      secure: false, // localhost => false, https => true
      sameSite: "None", // cross-origin cookie allow
      path: "/",
    });

    console.log("User created successfully");
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
      return res.status(400).send("Please enter all the fields.");
    }
    const isExistingUser = await Admin.findOne({ email });
    if (!isExistingUser) {
      return res.status(401).send("Admin not found.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid Credentials");
    }
    const token = jwt.sign({ id: isExistingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    res.cookie("token", {
      expires: new Date(Date.now() + 8 * 3600000),
      secure: false, // HTTPS par true karna
      sameSite: "None", // localhost par None rakhna
    });

    return res.status(200).json({
      message: "Login successful",
      Admin: {
        id: isExistingUser._id,
        name: isExistingUser.name,
        email: isExistingUser.email,
      },
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).send("ERROR", error);
  }
};
//logout API
export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting empty value and immediate expiry
    res.cookie("token", token, {
      secure: false, // localhost => false, https => true
      sameSite: "None", // cross-origin cookie allow
      path: "/",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
