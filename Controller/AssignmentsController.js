import Assignment from "../Models/AssignmentsModel.js";
import Course from "../Models/CoursesModel.js";



// Teacher add assignment
export const addAssignment = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { courseId, title, description, dueDate } = req.body;

    // check course belongs to this teacher
    const course = await Course.findOne({
      _id: courseId,
      teacherId
    });

    if (!course) {
      return res
        .status(403)
        .json({ message: "You are not assigned to this course" });
    }

    const assignment = await Assignment.create({
      courseId,
      title,
      description,
      dueDate
    });

    res.status(201).json({
      message: "Assignment added successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
