import UserFeedbackData from "../Models/UserFeedback.js";

async function handleUserFeedback(req, res) {
  const { userId, username, starCount, feedback } = req.body;

  try {
    const newFeedback = await UserFeedbackData.create({
      userId: userId,
      Username: username,
      Feedback: feedback,
      StarRating: starCount,
    });

    return res.json({
      message: "Feedback submitted successfully",
      data: {
        Id: newFeedback.userId,
        Username: newFeedback.Username,
        Feedback: newFeedback.Feedback,
        StarCount: newFeedback.StarRating,
      },
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Error submitting feedback", error: error.message });
  }
}

async function ShowFeedbacks(req, res) {
  try {
    const feedbacks = await UserFeedbackData.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { handleUserFeedback, ShowFeedbacks };