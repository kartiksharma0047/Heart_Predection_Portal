import { useEffect, useState } from "react";
import "../CSS/UserInfo.css";

function UserInfo() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const USERS_PER_PAGE = 6;

  useEffect(() => {
    const UserDetails = async () => {
      setIsLoading(true); // Show loading state while fetching data
      try {
        const response = await fetch("http://localhost:5000/AdminAccess/UserInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error("Failed to fetch Users:", response.statusText);
        }
      } catch (err) {
        console.error("Error while fetching Users:", err);
      } finally {
        setIsLoading(false); // Hide loading state when data is fetched
      }
    };

    UserDetails();
  }, []);

  const totalPages = Math.ceil(data.length / USERS_PER_PAGE);

  // Get users for the current page
  const getUsersForPage = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  // Group users into pairs for display
  const groupUsersIntoPairs = (users) => {
    const pairs = [];
    for (let i = 0; i < users.length; i += 2) {
      pairs.push(users.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <div className="UserInfoDiv">
      <h1>Users Detail</h1>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="UserInfo">
          {groupUsersIntoPairs(getUsersForPage()).map((pair, index) => (
            <div className="UserPair" key={index}>
              {pair.map((user, idx) => (
                <div className="UserCard" key={idx}>
                  <p><strong>Name:</strong> {user.Username}</p>
                  <p><strong>Email:</strong> {user.Email}</p>
                  <p><strong>Phone:</strong> {user.MobileNumber}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`PageButton ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserInfo;