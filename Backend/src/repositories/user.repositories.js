import User from "../db/models/user.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const userRegister_EmailChecker = async (email) => {
  try {
    const emailChecked = await User.exists({email});
    return {
      success: true,
      exists: Boolean(emailChecked),
      message: emailChecked ? "This email already exists" : "Email is available",
      statusCode: emailChecked ? StatusCodes.CONFLICT : StatusCodes.OK,
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to check whether this email is available",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
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
    const safeUser = user.toObject();
    delete safeUser.password;
    return {
      success: true,
      message: "User registration successful",
      statusCode: StatusCodes.CREATED,
      user: safeUser,
    };
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email) {
      return {
        success: false,
        message: "This email already exists",
        statusCode: StatusCodes.CONFLICT,
      };
    }
    return {
      success: false,
      message: "Unable to create user",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
