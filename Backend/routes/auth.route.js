import express from "express";
import { login, Signup, logout } from "../Middlewares/auth.middleware.js";
import { studentViewProfile } from "../Middlewares/student.profile.js";
import { userAuth } from "../config/auth.js";
import { studentEditProfile } from "../Middlewares/student.editProfile.js";
import { studentGetJob } from "../Middlewares/student.getJobs.js";
import { studentApplyJobs } from "../Middlewares/student.applyJob.js";
import { studentViewJob } from "../Middlewares/student.viewJob.js";
import { cgpaFilter } from "../Middlewares/filter.cgpa.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", userAuth, studentViewProfile);
router.patch("/profile/edit", userAuth, studentEditProfile);
router.get("/viewjobs", userAuth, studentGetJob);
router.post("/apply/:jobId", userAuth, studentApplyJobs);
router.get("/viewAJob/:id", userAuth, studentViewJob);
router.get("/filterJob/:cgpa", userAuth, cgpaFilter);

export default router;
