import User from "../db/models/user.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const userRegister_EmailChecker = async (email) => {
  try {
    const emailChecked = await User.exists({email});
    if (emailChecked) {
      return {
        success:true,
        message: "This email is already exist!!",
        email: email,
        statusCode: StatusCodes.CONFLICT,
      };
    } else {
      return {
        success: false,
        message: "Email is new!!",
        statusCode: StatusCodes.OK,
      };
    }
  } catch (error) {
    return {
      message: error.message,
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};

// user create in db

export const userCreateInDB = async (userDetails) => {
  try {
    // console.log(userDetails)
    const { name, email, password, collegeName, degreeName, gradutionYear } =
      userDetails;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      collegeName,
      degreeName,
      gradutionYear,
    });
    return {
      success: true,
      message: "User registration sucess !!",
      statusCode: StatusCodes.CREATED,
      user,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};
