import Problem from "../../db/models/problem/problem.js";


export const findProblemsByCreator = async (userId) => {
  return Problem.find({
    createdBy: userId,
    isDeleted: { $ne: true },
  })
    .select("title slug difficulty topics accessLevel isPublished createdAt")
    .sort({ title: 1, _id: 1 })
    .lean();
};
