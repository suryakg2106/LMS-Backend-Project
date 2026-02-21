I have completed the backend developer assignment for the LMS platform.

Live API URL:
https://lms-backend-project-1-yy32.onrender.com

GitHub Repository:
https://github.com/suryakg2106/LMS-Backend-Project

API Documentation:
All API endpoints are documented in the README.md file.

Sample Login Credentials:

Admin
Email: admin@gmail.com
Password: admin123

Teacher
Email: krishna@gmail.com
Password: 123456

Student
Email: roni@gmail.com
Password: 123456

Tech Stack:
Node.js, Express.js, MongoDB, JWT Authentication

Please let me know if any additional information is required.



## 📌 Project Features & Requirement Coverage

This LMS backend application fulfills all the requirements mentioned in the assignment.

---

## 👥 Role System

### Admin
- Create Teacher accounts
- View all Teachers
- View all Students
- Create Courses
- Delete Courses
- View all Enrollments

### Teacher
- View assigned Courses
- Add Assignments to their Courses
- View enrolled Students in their Courses

### Student
- Self Registration
- Login
- Enroll in Courses
- View enrolled Courses
- Track Course Progress

---

## 📚 Course System

Each Course includes:
- Title
- Description
- Price
- Course Type (Live / Pre-recorded)
- Video Link (for recorded courses)
- Live Class Link (for live courses)
- Assigned Teacher
- Thumbnail

Course type is configurable while creating the course.

---

## 📝 Assignment System

- Teachers can add assignments to their courses
- Assignment fields:
  - Title
  - Description
  - Due Date
- Students can view assignments of enrolled courses

---

## 🎓 Enrollment System

APIs provided:
- Enroll in a Course
- Get enrolled Courses
- Get students enrolled in a specific Course

Enrollment stores:
- user_id
- course_id
- payment_method (razorpay)
- enrollment_date
- progress_percentage

(No payment gateway integration; only data storage)

---

## 📊 Progress Tracking

- Students can update course progress
- Students can view their progress
- Progress range: 0% to 100%

---

## 🔑 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Separate access for Admin, Teacher, and Student

---

## 🗂 Database Collections

- Users (admin, teacher, student)
- Courses
- Assignments
- Enrollments

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
📡 API Documentation :----------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
https://lms-backend-project-1-yy32.onrender.com


//Register (Student only):
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/auth/register

//Login Admin:
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/auth/login

{
  "email": "admin@gmail.com",
  "password": "admin123"
}

//Admin Create Teacher
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/admin/create-teacher

ex:
{
  "fullname":"Brock Le",
  "email": "brock@gmail.com",
  "password": "123456"
}


// Admin Can See All Teachers
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/admin/teachers

//Admin Can See All Students
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/admin/students

//Admin Can Create Course
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/admin/create-course
ex:
{
  "title": "Frontend Development with React",
  "description": "HTML, CSS, JavaScript, and React from basics to advanced.",
  "price": 1599,
  "courseType": "recorded",
  "videoLink": "https://www.youtube.com/playlist?list=REACT_FE_101",
  "liveClassLink": null,
  "teacherId": "69940e35404f88f4e32b168b",
  "thumbnail": "https://example.com/images/react-frontend.png"
}

//Admin Can Update Course
=>(PUT) https://lms-backend-project-1-yy32.onrender.com/api/admin/update/699340190043f6ebbaf1e78f

{
  "title": "Python Full Stack",
  "description": "Learn Python Full Stack",
  "price": 3999,
  "courseType": "recorded",
  "videoLink": "https://www.youtube.com/playlist?list=PY_DS_101",
  "liveClassLink": null,
  "teacherId": "69940e35404f88f4e32b168b",
  "thumbnail": "https://example.com/images/python-ds.png"
}


//Admin can see students by course
=> (GET) https://lms-backend-project-1-yy32.onrender.com/api/admin/students/69940fd3404f88f4e32b16a5

// Admin Can Delete Course
=>(DELETE) https://lms-backend-project-1-yy32.onrender.com/api/admin/delete/699457aa413d48a2af6bc2fb


//Admin can view all enrollments
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/admin/enrollments

//Login Teacher 
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/auth/login
ex:
{
  "email": "krishna@gmail.com",
  "password": "123456"
}

//Teacher can view assigned courses
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/teacher/assigned


//Teacher add assignment
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/assignments
ex: 
{
  "courseId": "699457aa413d48a2af6bc2fb",
  "title": "Assignment 02",
  "description": "Build HTML Page",
  "dueDate": "2026-03-01"
}

//Teacher can view enroll student by course
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/enroll/course/69940fd3404f88f4e32b16a5


//Login User Like Student or teacher and admin but now i login as a student
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/auth/login
ex:
{
  "email": "roni@gmail.com",
  "password": "123456"
}

//Student can enroll in courses
=>(POST) https://lms-backend-project-1-yy32.onrender.com/api/enroll/course
{
  "courseId": "69940fd3404f88f4e32b16a5"
}

//Student can view own enroll courses
=>(GET) https://lms-backend-project-1-yy32.onrender.com/api/enroll/my-courses

//Students update progress
=>(PUT) https://lms-backend-project-1-yy32.onrender.com/api/enroll/progress
{
  "courseId": "69940fd3404f88f4e32b16a5",
  "progress_percentage": 10
}

//Student see single course with progress_percentage or assignment
=> (GET) https://lms-backend-project-1-yy32.onrender.com/api/enroll/69940fd3404f88f4e32b16a5/details eta readme te add korbo




