import express from "express";
import { login, signup, logout } from "../Middlewares/admin.auth.middleware.js";
import PostNewJob from "../Middlewares/jobpost.middleware.js";
import adminAuth from "../config/admin.auth.js";
import { viewjobs } from "../Middlewares/admin.viewJobs.js";
import { viewAJob } from "../Middlewares/admin.viewAJob.js";
import { editAJob } from "../Middlewares/admin.editAJob.js";
import { deleteJob } from "../Middlewares/admin.deleteJob.js";
import { getStudentsList } from "../Middlewares/admin.getStudents.js";
import { adminViewProfile } from "../Middlewares/adminViewProfile.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/postjob", adminAuth, PostNewJob);
router.get("/viewjobs", adminAuth, viewjobs);
router.get("/jobs/:id", adminAuth, viewAJob);
router.patch("/jobs/edit/:id", adminAuth, editAJob);
router.delete("/jobs/delete/:id", adminAuth, deleteJob);
router.get("/students", adminAuth, getStudentsList);
router.get("/profile", adminAuth, adminViewProfile);

export default router;
