import { StatusCodes } from "http-status-codes";
import { validateUserLogin } from "../../validators/userValidator/loginInput.validator.ts";
import { loginUserChecker, getMe } from "../../repositories/login.repositories.js";

export const loginService = async (input) => {
  // 1. input validation (Zod)
  const validation = validateUserLogin(input);

  if (!validation.success) {
    return {
      success: false,
      message: validation.message,
      statusCode: validation.statusCode,
      errors: validation.errors,
    };
  }

 
  const { email, password } = validation.data;

  // 2. check user and password
  return await loginUserChecker({ email, password });
};

export const getMeService = async (userId) => {
  const profile = await getMe(userId);

  if (!profile) {
    return {
      success: false,
      message: "You need to login first",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  return {
    success: true,
    message: "Details fetch successfully!!",
    statusCode: StatusCodes.OK,
    profile,
  };
};