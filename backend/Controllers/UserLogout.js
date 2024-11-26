import UserAccountData from "../Models/UserPannel.js";
import bcrypt from "bcrypt";

async function UserDataUpdateFunction(req, res) {
  const { id, username, email, mobile_number } = req.body;

  try {
    const updatedUser = await UserAccountData.findByIdAndUpdate(
      id,
      { Username: username, Email: email, MobileNumber: mobile_number },
      { new: true }
    );

    if (updatedUser) {
      res.json({
        message: "User data updated successfully",
        updatedUser: {
          Id: updatedUser._id,
          Username: updatedUser.Username,
          Email: updatedUser.Email,
          MobileNumber: updatedUser.MobileNumber,
        },
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error: error.message });
  }
}

async function DeleteUserDataFunction(req, res) {
  const { id, password } = req.body;

  try {
    const user = await UserAccountData.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.Password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const deletedUser = await UserAccountData.findByIdAndDelete(id);

    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found for deletion" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user data", error: error.message });
  }
}


export { UserDataUpdateFunction, DeleteUserDataFunction };
