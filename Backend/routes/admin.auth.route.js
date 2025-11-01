import express from "express";
import { login, logout, Signup } from "../Middlewares/admin.auth.middleware.js";
import PostNewJob from "../Middlewares/jobpost.middleware.js";
import { adminAuth } from "../config/admin.auth.js";
import { viewjobs } from "../Middlewares/admin.viewJobs.js";
import { viewAJob } from "../Middlewares/admin.viewAJob.js";
import { editAJob } from "../Middlewares/admin.editAJob.js";
import { deleteJob } from "../Middlewares/admin.deleteJob.js";
import { getStudentsList } from "../Middlewares/admin.getStudents.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", Signup);
router.post("/logout", logout);
router.post("/postjob", adminAuth, PostNewJob);
router.get("/viewjobs", adminAuth, viewjobs);
router.get("/jobs/:id", adminAuth, viewAJob);
router.patch("/jobs/edit/:id", adminAuth, editAJob);
router.delete("/jobs/delete/:id", adminAuth, deleteJob);
router.get("/students", adminAuth, getStudentsList);

export default router;
