import Course from "../Models/CoursesModel.js";
import {User} from "../Models/AuthModel.js";

//Create new course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      courseType,
      videoLink,
      liveClassLink,
      teacherId,
      thumbnail
    } = req.body;

    const teacher = await User.findOne({
      _id: teacherId,
      role: "teacher"
    });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    if (courseType === "recorded" && !videoLink) {
      return res
        .status(400)
        .json({ message: "Video link required for recorded course" });
    }

    if (courseType === "live" && !liveClassLink) {
      return res
        .status(400)
        .json({ message: "Live class link required for live course" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      courseType,
      videoLink: courseType === "recorded" ? videoLink : null,
      liveClassLink: courseType === "live" ? liveClassLink : null,
      teacherId,
      thumbnail
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update coures 
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const {
      title,
      description,
      price,
      courseType,
      videoLink,
      liveClassLink,
      teacherId,
      thumbnail
    } = req.body;

    if (courseType === "live" && !liveClassLink) {
      return res.status(400).json({
        message: "liveClassLink is required for live course"
      });
    }

    if (courseType === "recorded" && !videoLink) {
      return res.status(400).json({
        message: "videoLink is required for recorded course"
      });
    }

    // ✅ Update only provided fields
    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.price = price ?? course.price;
    course.courseType = courseType ?? course.courseType;
    course.videoLink =
      courseType === "recorded" ? videoLink : null;
    course.liveClassLink =
      courseType === "live" ? liveClassLink : null;
    course.teacherId = teacherId ?? course.teacherId;
    course.thumbnail = thumbnail ?? course.thumbnail;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



// delete course
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

//Teacher can view assigned Courses
export const getAssignedCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const courses = await Course.find({ teacherId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//All Course 
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};



// Course Details
export const CourseDetais = async (req, res) => {
  try {
    const { id } = req.params;   // courseId from URL

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      course,
    });

  } catch (error) {
    console.error("Course Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


