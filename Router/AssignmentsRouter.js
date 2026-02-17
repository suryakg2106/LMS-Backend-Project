import express from "express";
import { addAssignment } from "../Controller/AssignmentsController.js";
import { Protected as authMiddleware } from "../Middleware/AuthProtected.js";
import roleMiddleware from "../Middleware/RoleMiddleware.js";

const router = express.Router();

// Teacher only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["teacher"]),
  addAssignment
);

export default router;