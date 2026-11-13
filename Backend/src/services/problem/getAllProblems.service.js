import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { findAllPublishedProblems } from "../../repositories/problem/findAllPublishedProblems.js";

export const getAllProblemsService = async () => {
  try {
    const problems = await findAllPublishedProblems();

    return {
      success: true,
      statusCode: StatusCodes.OK,
      count: problems.length,
      problems,
    };
  } catch (error) {
    console.error("Get all problems service error:", error);

    if (
      error instanceof mongoose.Error.MongooseServerSelectionError ||
      error.name === "MongoNetworkError"
    ) {
      return {
        success: false,
        statusCode: StatusCodes.SERVICE_UNAVAILABLE,
        message: "Database is unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to retrieve problems.",
    };
  }
};
