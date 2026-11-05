import { StatusCodes } from "http-status-codes";
import { validateUserRegister } from "../../validators/userValidator/userRegister.validator.ts";
import {
  userRegister_EmailChecker,
  userCreateInDB,
} from "../../repositories/user.repositories.js";
import { normalizedEmail } from "../../utils/extra/normailemail.js";
import { verifyOtp } from "../../utils/otp/verifyOtp.js";

export const userRegister_service = async (userDetails) => {
  try {
    // 1. input validation (Zod)
    const validation = validateUserRegister(userDetails);

    if (!validation.success) {
      return {
        success: false,
        message: validation.message,
        statusCode: validation.statusCode,
        errors: validation.errors,
      };
    }

    
    const cleanDetails = validation.data;
    const { email, emailOtp } = cleanDetails;

    
    const normalEmail = normalizedEmail(email);
    const emailExists = await userRegister_EmailChecker(normalEmail);

    if (!emailExists.success) {
      return emailExists;
    }

    if (emailExists.exists) {
      return {
        success: false,
        message: emailExists.message,
        statusCode: emailExists.statusCode,
      };
    }

  
    const otpverification = await verifyOtp({
      normalEmail,
      emailOtp,
      purpose: "register",
      consume: true,
    });

    if (!otpverification.success) {
      return {
        success: false,
        message: otpverification.message,
        statusCode: otpverification.statusCode,
      };
    }

   
    return await userCreateInDB(cleanDetails);
  } catch (error) {
    return {
      message: error.message,
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};
