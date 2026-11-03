import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { emailSchema } from "../../dto/common.dto/common.dto.ts";

type ErrorResult = {
  success: false;
  statusCode: number;
  message: string;
};

const verifyOtpSchema = z.object({
  normalEmail: emailSchema,
  emailOtp: z
    .union([z.string(), z.number()], { message: "OTP is required" })
    .transform((val) => String(val).trim())
    .pipe(z.string().regex(/^\d{6}$/, "OTP must be a 6 digit number")),
  purpose: z
    .string({ message: "Purpose is required" })
    .trim()
    .min(1, "Purpose is required"),
});

const badRequest = (message: string): ErrorResult => ({
  success: false,
  statusCode: StatusCodes.BAD_REQUEST,
  message,
});

export const verifyOtpInput = (
  normalEmail: unknown,
  emailOtp: unknown,
  purpose: unknown
): ErrorResult | undefined => {
  const result = verifyOtpSchema.safeParse({ normalEmail, emailOtp, purpose });

  if (!result.success) {
    return badRequest(result.error.issues[0].message);
  }
};

export const inputEmailverify = (email: unknown): ErrorResult | undefined => {
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    return badRequest(result.error.issues[0].message);
  }
};