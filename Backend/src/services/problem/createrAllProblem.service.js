
import { StatusCodes } from "http-status-codes";
import { getAllProblem } from "../../repositories/problem/getAllProblem.js";

export const createrAllProblemService = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: "Creator id is required",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const result = await getAllProblem(userId);

  if (!result || result.length === 0) {
    return {
      success: true,
      message: "No problems submitted yet",
      statusCode: StatusCodes.OK,
      data: [],
    };
  }

  return {
    success: true,
    message: "Problems fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  };
};