import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    payment_method: {
      type: String,
      default: "razorpay"
    },
    enrollment_date: {
      type: Date,
      default: Date.now
    },
    progress_percentage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
