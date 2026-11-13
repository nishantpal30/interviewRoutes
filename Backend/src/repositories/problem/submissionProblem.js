import { StatusCodes } from "http-status-codes";
import CreateProblemSubmission from "../../db/models/problem/createProblemSubmission.js";

export const submissionProblem = async (
  submissionType,
  problemContent,
  userId,
  isAdmin,
  problemId = null,
) => {
  try {
    const submission = await CreateProblemSubmission.create({
      submissionType,
      problemId: submissionType === "update" ? problemId : null,
      content: problemContent,
      submittedBy: userId,
      submittedByRole: isAdmin ? "admin" : "creatorPartner",
      creatorPartnerId: isAdmin ? null : userId,
    });

    return {
      success: true,
      message: "Problem sent to the admin dashboard for review.",
      submission,
      statusCode: StatusCodes.CREATED,
    };
  } catch (error) {
    console.error("Problem submission error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return {
        success: false,
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    if (error.code === 11000) {
      return {
        success: false,
        message: "A problem with this value already exists.",
        statusCode: StatusCodes.CONFLICT,
      };
    }

    return {
      success: false,
      message: "Could not submit the problem.",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};