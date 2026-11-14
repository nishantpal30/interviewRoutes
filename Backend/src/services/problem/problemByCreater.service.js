import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { findProblemsByCreator } from "../../repositories/problem/findAllPublishedProblems.js";

export const problemByCreaterService = async (userId) => {
  try {
    const problems = await findProblemsByCreator(userId);

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Problems retrieved successfully.",
      count: problems.length,
      problems,
    };
  } catch (error) {
    console.error("Problem by creator service error:", error);

    if (error instanceof mongoose.Error.CastError) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Invalid ${error.path}: ${error.value}`,
      };
    }

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
      message: "Failed to retrieve your problems.",
    };
  }
};