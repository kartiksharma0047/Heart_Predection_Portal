import { useEffect, useState } from "react";
import "../CSS/UserInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

function UserInfo() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const USERS_PER_PAGE = 6;

  useEffect(() => {
    const UserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://heart-predection-portal-server.onrender.com/AdminAccess/UserInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error("Failed to fetch Users:", response.statusText);
        }
      } catch (err) {
        console.error("Error while fetching Users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    UserDetails();
  }, []);

  const totalPages = Math.ceil(data.length / USERS_PER_PAGE);

  const getUsersForPage = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

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
                  <div className="UserProfile" title={user.Username}>
                    <FontAwesomeIcon icon={faUser} />
                    <h2>{user.Username.length>15 ? user.Username.slice(0,15)+"...":user.Username}</h2>
                  </div>
                  <div className="User_Mail_Num">
                    <div title={user.Email}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{user.Email.length>18 ? user.Email.slice(0,18)+"...":user.Email}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faPhone} />
                      <p>{user.MobileNumber}</p>
                    </div>
                  </div>
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
            className={`PageButton ${
              currentPage === index + 1 ? "active" : ""
            }`}
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
