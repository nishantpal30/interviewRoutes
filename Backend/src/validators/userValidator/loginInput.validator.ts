import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { emailSchema } from "../../dto/common.dto/common.dto.ts";

const userLoginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password is required"),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;

type ValidationResult =
  | { success: true; data: UserLoginInput }
  | { success: false; statusCode: number; message: string };

export const validateUserLogin = (body: unknown): ValidationResult => {
  const result = userLoginSchema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: result.error.issues[0].message,
    };
  }

  return { success: true, data: result.data };
};