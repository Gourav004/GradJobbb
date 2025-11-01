import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const adminAuth = async (req, res, next) => {
  try {
    // read the token safely
    const token = req.cookies?.token; // <- correct
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    // validate the token
    const decodedObj = jwt.verify(token, "GRADJOB");
    console.log(decodedObj);

    // find the user
    const admin = await Admin.findById(decodedObj.id); // decoded id
    console.log(admin);
    if (!admin) {
      return res.status(401).send("User not found");
    }
    // attach admin to request
    req.user = admin;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).send("ERROR: " + err.message);
  }
};
