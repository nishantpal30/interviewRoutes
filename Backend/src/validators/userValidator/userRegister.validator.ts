import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { emailSchema, passwordSchema } from "../../dto/common.dto/common.dto.ts";

const currentYear = new Date().getFullYear();

const resetemailSchema = z.object({
  email:emailSchema
})
const resetPasswordSchema = passwordSchema;
const userRegisterSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  email: emailSchema,

  password: passwordSchema,

  collegeName: z
    .string({ message: "College name is required" })
    .trim()
    .min(2, "College name must be at least 2 characters")
    .max(100, "College name is too long"),

  degreeName: z.enum(["UG", "PG"], { message: "Degree must be UG or PG" }),

  gradutionYear: z.coerce
    .number({ message: "Graduation year must be a number" })
    .int("Graduation year must be a whole number")
    .min(2000, "Graduation year is too old")
    .max(currentYear + 6, "Graduation year is too far in the future"),

  emailOtp: z
    .union([z.string(), z.number()], { message: "OTP is required" })
    .transform((val) => String(val).trim())
    .pipe(z.string().regex(/^\d{6}$/, "OTP must be a 6 digit number")),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;

type ValidationResult =
  | { success: true; data: UserRegisterInput }
  | { success: false; statusCode: number; message: string; errors: { field: string; message: string }[] };

export const validateUserRegister = (body: unknown): ValidationResult => {
  const result = userRegisterSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: errors.map((e) => e.message).join(", "),
      errors, 
    };
  }

  return { success: true, data: result.data };
};


export const resetPasswordValidation =(body:unknown)=>{
  const result =  resetemailSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: errors.map((e) => e.message).join(", "),
      errors, 
    };
  }

  return { success: true, data: result.data };
}

export const passwordValidate =(password:unknown)=>{
  const result =  resetPasswordSchema.safeParse(password);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: errors.map((e) => e.message).join(", "),
      errors, 
    };
  }

  return { success: true, data: result.data };
}
