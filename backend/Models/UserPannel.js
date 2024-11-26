import mongoose from "mongoose";

const UserSignUp = new mongoose.Schema({
  Username: { type: String, required: true },
  MobileNumber: { type: Number, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const UserAccountData = mongoose.model("User-Account-Data", UserSignUp);

export default UserAccountData;
