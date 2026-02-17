Roles: Admin, Teacher, Student
Live & Pre-recorded courses
Assignments
Enrollment system
Learner progress tracking

🔹 Role System Requirements
1️⃣ Admin

Can create Teacher accounts
Can view all Teachers
Can view all Students
Can create courses
Can delete courses
Can view all enrollments

2️⃣ Teacher
Can view assigned courses
Can add assignments to their course
Can view enrolled students in their course

3️⃣ Student
Can register directly (self-signup)
Can login
Can enroll in course
Can view enrolled courses
Can track progress

🔹 Course System Requirements

Each course must have:
Title
Description
Price

Course Type:
Live
Pre-recorded
Video Link (for recorded)
Live Class Link (for live)
Teacher ID
Thumbnail
Course type must be configurable while creating the course.

🔹 Assignment System

Teacher must be able to:
Add assignment to course

Assignment fields:
Title
Description
Due Date
Students must be able to:
View assignments of enrolled course

🔹 Enrollment System

APIs required:
Enroll in course
Get enrolled courses
Get students enrolled in specific course

Enrollment must store:
user_id
course_id
payment_method = "razorpay"
enrollment_date
progress_percentage
(No Razorpay integration required — only field storage)

🔹 Progress Tracking

Create API to:
Update student course progress
Get student progress
Progress example:
0% to 100%

🔹 Required APIs
Authentication APIs
Register Student
Login (All roles)
Create Teacher (Admin only)
Course APIs
Create Course (Admin only)
Get All Courses
Get Single Course
Update Course
Delete Course
Assignment APIs
Add Assignment (Teacher only)
Get Assignments by Course
Enrollment APIs
Enroll Student
Get Enrolled Courses
Get Students by Course
Progress APIs
Update Progress
Get Progress

🔹 Database Structure

You must create proper collections/tables for:
Users (role field: admin, teacher, student)
Courses
Assignments
Enrollments

Use:
MongoDB

🔹 Technical Stack

Preferred:
Node.js + Express
