import express from "express"
import { Register , Login } from "../Controller/AuthController.js";
import { body } from "express-validator";


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

export default Router;