import { StatusCodes } from "http-status-codes";
import { getAllProblemsService } from "../../services/problem/getAllProblems.service.js";

export const getAllProblems = async (req, res) => {
  try {
    const response = await getAllProblemsService(req.userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("getAllProblems controller error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Unable to retrieve problems.",
    });
  }
};
