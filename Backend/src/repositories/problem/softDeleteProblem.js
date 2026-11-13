import Problem from "../../db/models/problem/problem.js";

export const softDeleteProblem = async (problemSlug, deletedBy) => {
  return Problem.findOneAndUpdate(
    {
      slug: problemSlug,
      isDeleted: { $ne: true },
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("slug isDeleted deletedAt deletedBy");
};
