import mongoose from "mongoose";
import bcrypt from "bcryptjs";   

const AuthSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,   
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,   
      lowercase: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
      required: true,
    },

    password: {
      type: String,
      required: true,  
    },
  },
  { timestamps: true }
);

// Hash password before save
AuthSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Compare password during login
AuthSchema.methods.matchPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export const User = mongoose.model("User", AuthSchema);
