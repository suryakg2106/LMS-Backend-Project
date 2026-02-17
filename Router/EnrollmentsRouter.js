import express from "express";
import { getStudentsByCourse, enrollInCourse, getMyEnrolledCourses, updateProgress, getSingleCourseWithProgress } from "../Controller/EnrollmentsController.js";
import { Protected as authMiddleware } from "../Middleware/AuthProtected.js";
import roleMiddleware from "../Middleware/RoleMiddleware.js";

const Enrouter = express.Router();

// Teacher only
Enrouter.get(
  "/course/:courseId",
  authMiddleware,
  roleMiddleware(["teacher"]),
  getStudentsByCourse
);

// Student can only enroll in course
Enrouter.post(
  "/course",
  authMiddleware,
  roleMiddleware(["student"]),
  enrollInCourse
);

//Student can view own enroll course
Enrouter.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware(["student"]),
  getMyEnrolledCourses
);

// Student update progress
Enrouter.put(
  "/progress",
  authMiddleware,
  roleMiddleware(["student"]),
  updateProgress
);

// Student only see single course with progress_percentage
Enrouter.get(
  "/:courseId/details",
  authMiddleware,
  roleMiddleware(["student"]),
  getSingleCourseWithProgress
);


export default Enrouter;
