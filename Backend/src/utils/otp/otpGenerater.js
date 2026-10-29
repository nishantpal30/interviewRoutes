import crypto from "crypto";
import bcrypt from "bcryptjs";

import { inputEmainverify } from "../../validators/emailValidator/verifyOtp.validator.js";
import { otpSave_DB } from "../../repositories/otp.repositries.js";
import { emailNotificationTemplete } from "../email/emailNotificationTemplete.js";
const OTP_TIME = 10;
const otpGet = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const otpGenerater = async ({ email, purpose }) => {
  const inputChecked = inputEmainverify(email);
  if (inputChecked) {
    return {
      inputChecked,
    };
  }

  const otpCode = otpGet();
  const otpCodeHash = await bcrypt.hash(otpCode, 10);
  const otpExpriesAt = new Date(Date.now() + OTP_TIME * 60 * 1000);
  await otpSave_DB({email,purpose,otpCodeHash,otpExpriesAt});

//   now send notification
return await emailNotificationTemplete({ email, purpose, otp: otpCode });
};
