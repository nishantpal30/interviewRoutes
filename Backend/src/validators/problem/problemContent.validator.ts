import { z } from "zod";

const exampleSchema = z
  .object({
    input: z.string().trim().min(1),
    output: z.string().trim().min(1),
    explanation: z.string().trim().default(""),
  })
  .strict();

const testCaseSchema = z
  .object({
    input: z.string().trim().min(1),
    output: z.string().trim().min(1),
    isHidden: z.boolean().default(true),
  })
  .strict();

const starterCodeSchema = z
  .object({
    language: z.enum(["javascript", "python", "java", "cpp"]),
    code: z.string().min(1),
  })
  .strict();

export const problemContentSchema = z
  .object({
    title: z.string().trim().min(3).max(200),

    slug: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers, and hyphens.",
      ),

    description: z.string().trim().min(1).max(50000),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),

    topics: z.array(z.string().trim().min(1).toLowerCase()).default([]),
    constraints: z.array(z.string().trim().min(1)).default([]),

    examples: z.array(exampleSchema).min(1),
    testCases: z.array(testCaseSchema).min(1),
    starterCode: z.array(starterCodeSchema).default([]),

    hints: z.array(z.string().trim().min(1)).default([]),
    editorial: z.string().default(""),

    accessLevel: z.enum(["free", "premium"]).default("free"),

    timeLimitMs: z.coerce.number().int().positive().default(2000),
    memoryLimitMb: z.coerce.number().int().positive().default(256),
  })
  .strict();

export type ProblemContentInput = z.input<typeof problemContentSchema>;
export type ProblemContent = z.output<typeof problemContentSchema>;