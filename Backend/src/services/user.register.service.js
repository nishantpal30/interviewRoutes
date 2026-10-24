import { userRegister_Validater } from "../validators/userValidator/userRegister.validator.js";
import { userRegister_EmailChecker } from "../repositories/user.repositories.js";
import { normalizedEmail } from "../utils/extra/normailemail.js";

export const userRegister_service = (userDetails) => {
  try {
    // input validation (all details is filled or not)
    const userRegister_InputValidation = userRegister_Validater(userDetails);
    if (!userRegister_InputValidation) {
      return {
        success: userRegister_InputValidation.success,
        message: userRegister_InputValidation.message,
        statusCode: userRegister_InputValidation.statusCode,
        missingFields: userRegister_InputValidation.missingFields,
      };
    }
    // user filled email already exist in database or not
    const { email } = userDetails;
    const normalEmail = normalizedEmail(email)
    const emailExists = userRegister_EmailChecker(normalEmail);
    if (emailExists) {
      return { 
        success: false,
         message: emailExists.message ,
         statusCode:emailExists.statusCode
        };
    }
    // create the user in database
    

  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};
