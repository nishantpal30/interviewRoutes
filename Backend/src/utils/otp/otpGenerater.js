import crypto from "crypto";
import bcrypt from "bcryptjs";
import EmailOtp from "../../db/models/emailOtp.js";

const OTP_TIME = 10;

export const otpGenerater = ({email,purpose})=>{

}