import { validationResult } from "express-validator";
import { User } from "../Models/AuthModel.js";
import { GenarateToken } from "../Utils/GenarateToken.js";


// Register
export const Register = async (req, res) => {
 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
    });

    const token = GenarateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


//Login
export const Login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ msg: "Invalid user" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = GenarateToken(user._id);

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED on Render / HTTPS
      sameSite: "none",  // REQUIRED for cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};