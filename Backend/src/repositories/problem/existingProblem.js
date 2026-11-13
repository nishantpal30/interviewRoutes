import { StatusCodes } from "http-status-codes";
import Problem from "../../db/models/problem/problem.js";

export const existingProblem = async (problemQuery) => {
  const problem = await Problem.findOne(problemQuery);

  if (!problem) {
    return {
      success: false,
      message: "Live problem not found or you cannot edit it.",
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

export const existingProblem = async (problemQuery)=>{
    const existingProblemRecord = await Problem.findOne(problemQuery);

      if (!existingProblemRecord) {
        return{
          success: false,
          message: "Live problem not found or you cannot edit it.",
          statusCode: StatusCodes.NOT_FOUND,
        };
      }

      
    }
