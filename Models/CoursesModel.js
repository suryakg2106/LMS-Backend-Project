import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    courseType: {
      type: String,
      enum: ["live", "recorded"],
      required: true
    },
    videoLink: {
      type: String,
      default: null
    },
    liveClassLink: {
      type: String,
      default: null
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    thumbnail: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);