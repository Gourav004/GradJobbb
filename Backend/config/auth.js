import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";

export const userAuth = async (req, res, next) => {
  try {
    console.log("Cookies received from frontend:", req.cookies);

    // ✅ yahan destructure mat karo
    const token = req.cookies.token;
    console.log("🔑 Token from cookie:", token);

    if (!token) return res.status(401).send("Unauthorized: No token provided");

    // ✅ Verify token
    const decoded = jwt.verify(token, "GRADJOB");

    // ✅ Fetch full student data using decoded id
    const student = await Student.findById(decoded.id);
    console.log("Student", student);
    console.log("Decoded", decoded);
    if (!student) return res.status(404).send("Student not found");

    // ✅ Attach student to req.user
    req.user = student;
    next();
  } catch (err) {
    console.log("❌ Token:", token);
    console.log("❌ Req Cookies:", req.cookies);
    res.status(401).send("ERROR OCCURED: " + err.message);
  }
};
