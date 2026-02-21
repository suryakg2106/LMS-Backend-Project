import express from "express";
import { CourseDetais, getAllCourses, getAssignedCourses } from "../Controller/CourseController.js";
import { Protected as authMiddleware } from "../Middleware/AuthProtected.js";
import roleMiddleware from "../Middleware/RoleMiddleware.js";

const CourseRouter = express.Router();

//Teacher can view assigned Courses
CourseRouter.get(
  "/assigned",
  authMiddleware,
  roleMiddleware(["teacher"]),
  getAssignedCourses
);

// Get all courses
CourseRouter.get(
  "/courses",
  getAllCourses
);

// Get single course
CourseRouter.get(
  "/course/:id",
  CourseDetais
);


export default CourseRouter;