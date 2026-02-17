import express from "express";
import { getAssignedCourses } from "../Controller/CourseController.js";
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

export default CourseRouter;