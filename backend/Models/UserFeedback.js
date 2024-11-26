import mongoose from "mongoose";

const UserFeedback = new mongoose.Schema({
  userId: { type: String, required: true },
  Username: { type: String, required: true },
  Feedback: { type: String, required: true },
  StarRating: { type: Number, required: true },
});

const UserFeedbackData = mongoose.model("User-Feedback", UserFeedback);

export default UserFeedbackData;
