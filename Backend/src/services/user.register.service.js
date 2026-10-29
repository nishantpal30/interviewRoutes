import { userRegister_Validater } from "../validators/userValidator/userRegister.validator.js";
import { userRegister_EmailChecker } from "../repositories/user.repositories.js";
import { normalizedEmail } from "../utils/extra/normailemail.js";
import { userCreateInDB } from "../repositories/user.repositories.js";
import { verifyOtp } from "../utils/otp/verifyOtp.js";
import { StatusCodes } from "http-status-codes";
export const userRegister_service = async (userDetails) => {
  try {
    // input validation (all details is filled or not)
    const userRegister_InputValidation = userRegister_Validater(userDetails);
    // console.log(userDetails)
    // console.log(userRegister_InputValidation)
    if (!userRegister_InputValidation.success) {
      return {
        success: userRegister_InputValidation.success,
        message: userRegister_InputValidation.message,
        statusCode: userRegister_InputValidation.statusCode,
        missingFields: userRegister_InputValidation.missingFields,
      };
    }
    // user filled email already exist in database or not
    const { email } = userDetails;
    const normalEmail = normalizedEmail(email);
    const emailExists = await userRegister_EmailChecker(normalEmail);
    if (emailExists?.exists === true) {
      return {
        success: false,
        message: emailExists.message,
        statusCode: emailExists.statusCode,
      };
    }

    // verify otp
    const { emailOtp } = userDetails;
    // console.log(normalEmail,emailOtp)
    const otpverification = await verifyOtp({
      normalEmail,
      emailOtp,
      purpose: "register",
      consume: true,
    });
    console.log(otpverification)
    // create the user in database
    if (!otpverification.success) {
      return {
        success: otpverification.success,
        message: otpverification.message,
        statusCode: otpverification.statusCode,
      };
    }
    return await userCreateInDB(userDetails);
  } catch (error) {
    return {
      message: error.message,
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};
