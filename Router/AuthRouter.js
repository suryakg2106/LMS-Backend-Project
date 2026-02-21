import express from "express"
import { Register , Login } from "../Controller/AuthController.js";
import { body } from "express-validator";
import  {Protected} from "../Middleware/AuthProtected.js";


const Router = express.Router();

Router.post("/register",[
    body('fullname').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required'),
],Register);

Router.post("/login",[
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required'),
],Login);


// routes/auth.js
Router.get("/me",Protected,(req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default Router;