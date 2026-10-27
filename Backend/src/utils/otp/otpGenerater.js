import crypto from "crypto";
import bcrypt from "bcryptjs";
import EmailOtp from "../../db/models/emailOtp.js";
import { inputEmainverify } from "../../validators/emailValidator/verifyOtp.validator";

const OTP_TIME = 10;
const otpGet = () =>{ return crypto.randomInt(100000,1000000).toString()};

export const otpGenerater = async ({email,purpose})=>{
const inputChecked = inputEmainverify(email);
if(!inputChecked){
    return{
        inputChecked
    }
};

const otpCode = otpGet();
const otpCodeHash = await bcrypt.hash(otpCode,10);
const otpExprissAt = new Date(Date.now() + OTP_TIME *60*1000);









}