import express from "express";
import { userRegister ,userRegisterOtp } from "../controllers/user.controller.js";

const   authRouter = express.Router();

authRouter.post("/register",userRegister);
authRouter.post("/register/request-otp",userRegisterOtp);






export default authRouter;