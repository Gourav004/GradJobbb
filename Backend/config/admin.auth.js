import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const adminAuth = async (req, res, next) => {
  try {
    // ✅ Token should come from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify token string
    const decoded = jwt.verify(token, "GRADJOB");

    // ✅ Fetch admin details
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.user = admin; // make available in next routes
    next();
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

export default adminAuth;
