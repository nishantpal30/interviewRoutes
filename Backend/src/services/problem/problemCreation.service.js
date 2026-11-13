import { StatusCodes } from "http-status-codes";
import { problemContentSchema } from "../../validators/problem/problemContent.validator.ts";
import { existingProblem } from "../../repositories/problem/existingProblem.js";
import { submissionProblem } from "../../repositories/problem/submissionProblem.js";



export const problemCreationService = async (
  submissionType,
  problemId,
  content,
  userId,
  isAdmin,
) => {
  try {
    if (!["create", "update"].includes(submissionType)) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'submissionType must be "create" or "update".',
      };
    };
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "Problem content is required.",
      };
    };

 const problemContent = {
      title: content.title,
      slug: content.slug,
      description: content.description,
      difficulty: content.difficulty,
      topics: content.topics ?? [],
      constraints: content.constraints ?? [],
      examples: content.examples ?? [],
      testCases: content.testCases ?? [],
      starterCode: content.starterCode ?? [],
      hints: content.hints ?? [],
      editorial: content.editorial ?? "",
      accessLevel: content.accessLevel ?? "free",
      timeLimitMs: content.timeLimitMs ?? 2000,
      memoryLimitMb: content.memoryLimitMb ?? 256,
    };

    const validation = problemContentSchema.safeParse(problemContent);

if (!validation.success) {
  return {
    success: false,
    statusCode:StatusCodes.BAD_REQUEST,
    message: "Problem form has invalid fields.",
    errors: validation.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })),
  }
}

const validContent = validation.data;

    if (submissionType === "update") {
      if (!problemId) {
        return {
          success: false,
          statusCode: StatusCodes.BAD_REQUEST,
          message: "problemId is required for an update.",
        };
      }
      const problemQuery = {
        _id: problemId,
        isPublished: true,
      };
      if (!isAdmin) {
        problemQuery.creatorPartnerId = userId;
      }

      const existingProblemCheck = await existingProblem(problemQuery);
      if (!existingProblemCheck.success) {
        return existingProblemCheck;
      }
    }

    return await submissionProblem(
      submissionType,
      validContent,
      userId,
      isAdmin,
      submissionType === "update" ? problemId : null,
    );


  

} catch (error) {
  console.error("Problem creation service error:", error);

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message,
    };
  }

  if (error?.code === 11000) {
    return {
      success: false,
      statusCode: StatusCodes.CONFLICT,
      message: "A problem with this value already exists.",
    };
  }

  return {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Failed to process the problem submission.",
  };
}

  };

