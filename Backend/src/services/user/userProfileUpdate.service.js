import { StatusCodes } from "http-status-codes";
import { updateUserById } from "../../repositories/userProfileUpdate.repositories.js";

export const updateProfileService = async (userId, updateData) => {
  const updatedUser = await updateUserById(userId, updateData);

  if (!updatedUser) {
    return {
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: "User not found",
    };
  }

  return {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Profile updated successfully",
    data: updatedUser,
  };
};