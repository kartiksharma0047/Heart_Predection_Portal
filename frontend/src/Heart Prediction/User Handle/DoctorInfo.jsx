import { useEffect, useState } from "react";
import "../CSS/UserDoctorInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

function DoctorInfo() {
  const [docData, setDocData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          "https://heart-predection-portal-server.onrender.com/UserAccess/DoctorInfo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestType: "getDoctors" }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDocData(data);
        } else {
          console.error("Failed to fetch doctors:", response.statusText);
        }
      } catch (err) {
        console.error("Error while fetching doctors:", err);
      }
    };

    fetchDoctorData();
  }, []);

  const totalPages = Math.ceil(docData.length / itemsPerPage);

  const currentPageData = docData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Group data into pairs
  const groupedData = [];
  for (let i = 0; i < currentPageData.length; i += 2) {
    groupedData.push(currentPageData.slice(i, i + 2));
  }

  return (
    <div className="UserDoctorDiv">
      <h1 className={`DoctorsDatah1 ${!groupedData.length > 0 && `DoctorsDatah1Special`}`}>
        Doctor's Data
      </h1>
      <div className="UserDoctor">
        {groupedData.length > 0 ? (
          groupedData.map((group, index) => (
            <div className="DoctorDiv" key={index}>
              {group.map((doctor, idx) => (
                <div className="DoctorCard" key={idx}>
                  <div className="UserDocDiv">
                    <FontAwesomeIcon icon={faUser} />
                    <p>{doctor.Name}</p>
                  </div>
                  <div className="Doc_Num_Mail">
                    <div>
                      <FontAwesomeIcon icon={faPhone} />
                      <p>{doctor.Phone_Number}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{doctor.Email}</p>
                    </div>
                  </div>
                  <div className="Doc_Age_Gen_Exp">
                    <div>
                      <h5>Age</h5>
                      <p>{doctor.Age}</p>
                    </div>
                    <div>
                      <h5>Gender</h5>
                      <p>{doctor.Gender}</p>
                    </div>
                    <div>
                      <h5>Experience</h5>
                      <p>{doctor.Experience} years</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="DocPaginationButtons">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DoctorInfo;
