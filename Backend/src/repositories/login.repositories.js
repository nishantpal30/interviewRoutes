import { StatusCodes } from "http-status-codes";
import User from "../db/models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUserChecker = async ({ email, password }) => {
  const user = await User.findOne({ email: email}).select("+password");

  const isMatch = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !isMatch) {
    return {
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Invalid email or password",
    };
  }

  const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1d" }
);

  return {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Login successful",
    token,
  };
};

export const getMe = async (userId)=>{
 return await User.findById(userId).select("-password");
}
