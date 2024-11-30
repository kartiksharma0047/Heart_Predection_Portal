import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import "../CSS/UserFeedback.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { ColorRing } from "react-loader-spinner";

function UserFeedback() {
  const [starCount, setStarCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showStarError, setShowStarError] = useState(false);
  const { userCredentials } = useContext(DataContext);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [viewFeedbacks, setViewFeedbacks] = useState(false);
  const [FeedbackDetailsFetching, setFeedbackDetailsFetching] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const feedbacksPerPage = 6; // Number of feedbacks to display per page

  const handleStarClick = (value) => {
    setStarCount(value === starCount ? 0 : value);
    setShowStarError(false);
  };

  const handleTextChange = (e) => {
    setFeedback(e.target.value);
    if (e.target.value.length > 0) {
      setPlaceholder("");
    }
  };

  const submitFeedback = async () => {
    if (starCount === 0) {
      setShowStarError(true);
    } else if (feedback.trim() === "") {
      setPlaceholder("Please Review Us.");
    } else {
      try {
        const userId = userCredentials.id;
        const username = userCredentials.username;
        const response = await fetch(
          "https://heart-predection-portal-server.onrender.com/UserAccess/UserFeedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, username, starCount, feedback }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          setFeedbackSubmitted(true);
          setFeedback("");
          setStarCount(0);

          setTimeout(() => {
            setFeedbackSubmitted(false);
          }, 2000);
        } else {
          alert(result.message || "Error submitting feedback!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const viewOtherFeedbacks = async () => {
    setViewFeedbacks(true);
    try {
      const response = await fetch(
        "https://heart-predection-portal-server.onrender.com/UserAccess/UserFeedback",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const feedbacks = await response.json();
        setFeedbackDetailsFetching(feedbacks);
      } else {
        console.log("Failed to fetch feedbacks. Please try again", response);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      alert("An error occurred while fetching feedbacks.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(FeedbackDetailsFetching.length / feedbacksPerPage);
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = FeedbackDetailsFetching.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <div className="UserFeedback">
      {viewFeedbacks ? (
        <div className="CheckUserFeedback">
          <h1>Rating and Reviews</h1>
          {FeedbackDetailsFetching.length > 0 ? (
            <div className="FeedbacksLoaded">
              {currentFeedbacks.reduce((rows, feedback, index) => {
                if (index % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(feedback);
                return rows;
              }, []).map((feedbackPair, pairIndex) => (
                <div key={pairIndex} className="FeedbackItemGroup">
                  {feedbackPair.map((feedback, feedbackIndex) => (
                    <div key={feedbackIndex} className="FeedbackItem">
                      <div className="Name_StarPair">
                        <div className="ProfileHeader">
                          <FontAwesomeIcon icon={faUser} />
                          <h2 title={feedback.Username}>{feedback.Username}</h2>
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
              ))}
            </div>
          ) : (
            <div className="ColorRing">
              <ColorRing
                visible={true}
                height="150"
                width="150"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["black"]}
              />
              <p>Loading...</p>
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
      ) : (
        <div className={`UserFeedbackContainer ${feedbackSubmitted ? "BlurUserFeedbackContainer" : ""}`}>
          <h1>We value your opinion.</h1>
          <p>How would you rate your overall experience?</p>
          <div className="FeedbackStars">
            {[1, 2, 3, 4, 5].map((value) => (
              <FontAwesomeIcon
                key={value}
                icon={faStar}
                className={value <= starCount ? "selectedStar" : "unselectedStar"}
                onClick={() => handleStarClick(value)}
              />
            ))}
            {showStarError && (
              <p className="ErrorText">Please rate us by selecting a star.</p>
            )}
          </div>
          <p>Kindly take a moment to tell us what you think.</p>
          <textarea
            className="FeedbackArea"
            value={feedback}
            onChange={handleTextChange}
            placeholder={placeholder}
          ></textarea>
          <div className="FeedbackBtns">
            <button className="ShareFeedbackBtn" onClick={submitFeedback}>
              Share Feedback
            </button>
            <button className="ViewFeedbackBtn" onClick={viewOtherFeedbacks}>
              View Feedbacks
            </button>
          </div>
        </div>
      )}
      {feedbackSubmitted && (
        <div className="FeedbackSubmittedPopup">
          <h1>Thanks for your feedback!</h1>
        </div>
      )}
    </div>
  );
}

export default UserFeedback;