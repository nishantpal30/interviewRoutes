import User from "../db/models/user.js";

export const findUserById = (userId) => {
  return User.findById(userId).select("-password");
};

export const updateUserById = (userId, updateData) => {
  return User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { returnDocument: "after", runValidators: true }
  ).select("-password");
};