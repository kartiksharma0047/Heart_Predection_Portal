import { useEffect, useState } from "react";
import "../CSS/FeedbackInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

function AdminFeedback() {
  const [data, setData] = useState([]); // Feedback data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const feedbacksPerPage = 6; // Feedbacks per page

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://heart-predection-portal-server.onrender.com/AdminAccess/FeedbackInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const feedbacks = await response.json();
          setData(feedbacks);
        } else {
          console.error("Failed to fetch feedbacks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []); // Empty dependency array ensures the function runs once when the component mounts

  // Calculate Average Star rating
  const validFeedbacks = data.filter((feedback) => feedback.StarRating);
  const totalStars = validFeedbacks.reduce(
    (sum, feedback) => sum + feedback.StarRating,
    0
  );
  const averageRating =
    validFeedbacks.length > 0
      ? (totalStars / validFeedbacks.length).toFixed(1)
      : "N/A";

  // Pagination logic
  const totalPages = Math.ceil(data.length / feedbacksPerPage);
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = data.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  return (
    <div className="FeedbackInfoDiv">
      <div className="CheckAdminFeedback">
        <h1>Admin Feedbacks</h1>
        {isLoading ? (
          <p className="AdminFeedbackLoadingP">Loading feedbacks...</p>
        ) : (
          <div className="FeedbacksLoaded">
            <div className="AdminFeedbackRating">
              <h1>{averageRating}</h1>
              <p>Average Rating</p>
            </div>
            {data.length > 0 ? (
              currentFeedbacks
                .reduce((rows, feedback, index) => {
                  if (index % 2 === 0) rows.push([]);
                  rows[rows.length - 1].push(feedback);
                  return rows;
                }, [])
                .map((feedbackPair, pairIndex) => (
                  <div key={pairIndex} className="FeedbackItemGroup">
                    {feedbackPair.map((feedback, feedbackIndex) => (
                      <div key={feedbackIndex} className="FeedbackItem">
                        <div className="Name_StarPair">
                          <div className="ProfileHeader">
                            <FontAwesomeIcon icon={faUser} />
                            <h2 title={feedback.Username}>
                              {feedback.Username}
                            </h2>
                          </div>
                          <div className="StarRating">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <FontAwesomeIcon
                                key={value}
                                icon={faStar}
                                className={
                                  value <= feedback.StarRating
                                    ? "selectedStar"
                                    : "unSelectedStar"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <textarea disabled value={feedback.Feedback}></textarea>
                      </div>
                    ))}
                  </div>
                ))
            ) : (
              <p>No feedbacks available</p>
            )}
          </div>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="PaginationButtons">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`PaginationBtn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFeedback;