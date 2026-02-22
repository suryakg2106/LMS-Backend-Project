import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import {connectDB} from "./Config/ConnectDB.js";
import AuthRoutes from "./Router/AuthRouter.js";
import router from "./Router/AdminRouter.js";
import CourseRouter from "./Router/CoursesRouter.js";
import Assrouter from "./Router/AssignmentsRouter.js";
import Enrouter from "./Router/EnrollmentsRouter.js";


dotenv.config()
const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",   // local frontend
    "https://699b45a204b57a0f379517fd--superlative-banoffee-c8c5cb.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//Connect DataBase
connectDB(process.env.MONGOURL)

app.use("/api/auth", AuthRoutes);
app.use("/api/admin",router)
app.use("/api/teacher",CourseRouter)
app.use("/api/assignments", Assrouter);
app.use("/api/enroll",Enrouter);


app.get('/',(req,res)=>{
    res.send("LMS Backend Running....");
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server Running ===============>",PORT,"PORT");
})