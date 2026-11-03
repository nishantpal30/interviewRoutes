import express from "express";
import {
  getMe,
  logoutUser,
  userLogin,
  userRegister,
  userRegisterOtp,
  updateProfile,
  resetPassword,
  resetPasswordInDb,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isauth.middlewares.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/register/request-otp", userRegisterOtp);
authRouter.post("/login", userLogin);
authRouter.get("/profile", isAuthenticated, getMe);
authRouter.post("/logout", isAuthenticated, logoutUser);
authRouter.patch("/update-profile", isAuthenticated, updateProfile);

authRouter.post("/reset-password", resetPassword);
authRouter.patch("/reset-password/new", resetPasswordInDb);

export default authRouter;
