import { User } from "../Models/AuthModel.js";
import Enrollment from "../Models/EnrollmentModel.js";
import Course from "../Models/CoursesModel.js";


//Create Teachar Profile
export const createTeacher = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = await User.create({
      fullname,
      email,
      password,        
      role: "teacher", 
    });

    res.status(201).json({
      message: "Teacher created successfully",
      teacherId: teacher._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" })
      .select("-password");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Admin can see all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Admin can view enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "name email")
      .populate("courseId", "title");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Admin can view student by courses
export const AdmingetStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // ✅ Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const enrollments = await Enrollment.find({ courseId })
      .populate("userId", "name email role");

    const students = enrollments.map(
      (enroll) => enroll.userId
    );

    res.status(200).json({
      success: true,
      course: {
        id: course._id,
        title: course.title
      },
      totalStudents: students.length,
      students
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


