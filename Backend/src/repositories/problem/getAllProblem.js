import CreateProblemSubmission from "../../db/models/problem/CreateProblemSubmission.js";

import mongoose from "mongoose";

export const getAllProblem = async (userId) => {
  return await CreateProblemSubmission.find({
    creatorPartnerId: new mongoose.Types.ObjectId(userId),
    isDeleted: { $ne: true },
  })
    .sort({ createdAt: -1 })

    .lean();
};
