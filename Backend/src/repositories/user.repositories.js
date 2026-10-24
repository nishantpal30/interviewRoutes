import User from "../db/models/user.js";
import { StatusCodes } from "http-status-codes";

export const userRegister_EmailChecker = async (email) => {
  try {
    const emailChecked = await User.exists(email);
    if (emailChecked) {
      return {
        success: ture,
        message: "This email is already exist!!",
        email: email,
        statusCode: StatusCodes.CONFLICT,
      };
    }else{
        return{
            success:false,
            message:"Email is new!!",
            statusCode:StatusCodes.OK
        }
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};
