import { StatusCodes } from "http-status-codes";

export const verifyOtpInput = (normalEmail, emailOtp, purpose) => {
    // console.log(normalEmail,emailOtp,purpose)
  if (!normalEmail || !emailOtp || !purpose) {
    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Verify Otp input is not valid!!",
    };
  }
};

export const inputEmainverify = (email) => {
  if (!email) {
    return {
      success: false,
      message: "Email is not present for otp generation!!",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
};
