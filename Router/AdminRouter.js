import express from "express";
import { AdmingetStudentsByCourse, createTeacher, getAllEnrollments, getAllStudents, getAllTeachers } from "../Controller/AdminController.js";
import { Protected as authMiddleware } from "../Middleware/AuthProtected.js";
import roleMiddleware from "../Middleware/RoleMiddleware.js";
import { createCourse, deleteCourse, updateCourse } from "../Controller/CourseController.js";


const router = express.Router();

// Admin create teacher
router.post(
  "/create-teacher",
  authMiddleware,
  roleMiddleware(["admin"]),
  createTeacher
);

//Admin Get All Teacher
router.get(
  "/teachers",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllTeachers
);


//Admin view all students
router.get(
  "/students",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllStudents
);

// Admin create course
router.post(
  "/create-course",
  authMiddleware,
  roleMiddleware(["admin"]),
  createCourse
);

// Admin update course
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateCourse
);

//Admin can delete
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteCourse
);

//Admin can view enrollments
router.get(
  "/enrollments",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllEnrollments
);

//Admin can view student by coures
router.get(
  "/students/:courseId",
  authMiddleware,
  roleMiddleware(["admin"]),
  AdmingetStudentsByCourse
);


export default router;
