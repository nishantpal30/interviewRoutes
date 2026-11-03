import { userRegister_service } from "../services/user/user.register.service.js";
import { userRegisterOtp_Service } from "../services/user/userRegisterOtp.service.js";
import { loginService } from "../services/user/userlogin.service.js";
import { getMeService } from "../services/user/userlogin.service.js";
import { StatusCodes } from "http-status-codes";
import { validateUpdateProfile } from "../validators/userValidator/profile.validator.ts";
import { updateProfileService } from "../services/user/userProfileUpdate.service.js";
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

const serverError = (res, error) =>
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error?.message || "Internal server error",
  });
// User register controller
export const userRegister = async (req, res) => {
  try {
    const { name, email, password, collegeName, degreeName, gradutionYear, emailOtp } = req.body;
    const response = await userRegister_service({
      name, email, password, collegeName, degreeName, gradutionYear, emailOtp,
    });
    
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("userRegister error:", error);
    return serverError(res, error);
  }
};

export const userRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await userRegisterOtp_Service(email);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return serverError(res, error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, ...response } = await loginService({ email, password });

    if (response.success && token) {
      res.cookie("token", token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // matches expiresIn: "1d"
      });
    }

    return res.status(response.statusCode).json(response); 
  } catch (error) {
    return serverError(res, error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions); 
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = async (req, res) => {
  try {
    const response = await getMeService(req.userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return serverError(res, error);
  }
};



export const updateProfile = async (req, res) => {
  try {
    const validation = validateUpdateProfile(req.body);

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: validation.message,
      });
    }

    const response = await updateProfileService(req.userId, validation.data);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("updateProfile error:", error);
    return serverError(res, error);
  }
};