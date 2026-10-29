import { userRegister_service } from "../services/user.register.service.js";
import { userRegisterOtp_Service } from "../services/userRegisterOtp.service.js";
import { StatusCodes } from "http-status-codes";
export const userRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      collegeName,
      degreeName,
      gradutionYear,
      emailOtp,
    } = req.body;

    const userDetails = {
      name,
      email,
      password,
      collegeName,
      degreeName,
      gradutionYear,
      emailOtp,
    };

    const userRegister_Response = await userRegister_service(userDetails);

    return res
      .status(userRegister_Response.statusCode)
      .json(userRegister_Response);
  } catch (error) {
    console.error("userRegister error:", error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      statusCode: StatusCodes.BAD_GATEWAY,
      message: error?.message || "Internal server error",
    });
  }
};

export const userRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await userRegisterOtp_Service(email);
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
