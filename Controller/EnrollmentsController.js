import Enrollment from "../Models/EnrollmentModel.js";
import Course from "../Models/CoursesModel.js";
import Assignment from "../Models/AssignmentsModel.js";

// Teacher: view students enrolled in a course
export const getStudentsByCourse = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      teacherId
    });

    if (!course) {
      return res
        .status(403)
        .json({ message: "You are not assigned to this course" });
    }

    const enrollments = await Enrollment.find({ courseId })
      .populate("userId", "name email");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Student: enroll in course
export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      userId,
      courseId
    });
    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      payment_method: "razorpay",
      progress_percentage: 0
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Student: view enrolled courses
export const getMyEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ userId })
      .populate("courseId");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Student: update course progress
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, progress_percentage } = req.body;

    if (progress_percentage < 0 || progress_percentage > 100) {
      return res
        .status(400)
        .json({ message: "Progress must be between 0 and 100" });
    }

    const enrollment = await Enrollment.findOne({
      userId,
      courseId
    });

    if (!enrollment) {
      return res
        .status(404)
        .json({ message: "Enrollment not found" });
    }

    enrollment.progress_percentage = progress_percentage;
    await enrollment.save();

    res.status(200).json({
      message: "Progress updated successfully",
      progress: enrollment.progress_percentage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Student view single coures with progress_percentage

export const getSingleCourseWithProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    // 1️⃣ Course details
    const course = await Course.findById(courseId)
      .populate("teacherId", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Enrollment (for progress)
    const enrollment = await Enrollment.findOne({
      userId,
      courseId
    });

    if (!enrollment) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }

    // 3️⃣ Assignments of this course
    const assignments = await Assignment.find({ courseId })
      .sort({ dueDate: 1 });

    // 4️⃣ Final response
    res.status(200).json({
      course,
      progress_percentage: enrollment.progress_percentage,
      assignments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



