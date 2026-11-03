import { z } from "zod";

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters").max(50).optional(),
    collegeName: z.string().trim().min(2).max(100).optional(),
    degreeName: z.enum(["UG", "PG"], { message: "Degree must be UG or PG" }).optional(),
    gradutionYear: z
      .number({ message: "Graduation year must be a number" })
      .int()
      .min(2000)
      .max(2100)
      .optional(),
    bio: z.string().trim().max(300, "Bio can be at most 300 characters").optional(),
  })
  .strict() 
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

export const validateUpdateProfile = (body:unknown) => {
  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }
  return { success: true, data: result.data };
};