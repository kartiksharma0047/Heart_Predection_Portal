import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../CSS/AdminDoctorInfo.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

function AdminDoctorInfo() {
  const [docData, setDocData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDoctorId, setEditingDoctorId] = useState(null); // Track the doctor being updated
  const itemsPerPage = 10;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          "https://heart-predection-portal-server.onrender.com/AdminAccess/AdminDoctorInfo",
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

  const handleUpdateClick = (doctor) => {
    setEditingDoctorId(doctor._id);
    setValue("Name", doctor.Name);
    setValue("Phone_Number", doctor.Phone_Number);
    setValue("Email", doctor.Email);
    setValue("Age", doctor.Age);
    setValue("Gender", doctor.Gender);
    setValue("Experience", doctor.Experience);
  };

  const handleDeleteClick = async (doctor) => {
    try {
      const response = await fetch("https://heart-predection-portal-server.onrender.com/AdminAccess/AdminDoctorInfo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: doctor._id }),
      });
  
      if (response.ok) {
        setDocData((prevDocData) => prevDocData.filter((doc) => doc._id !== doctor._id));
        alert("Doctor successfully deleted.");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete doctor:", errorData.message);
        alert("Error deleting doctor: " + errorData.message);
      }
    } catch (err) {
      console.error("Error while deleting doctor:", err);
      alert("An unexpected error occurred.");
    }
  };
  

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...data, _id: editingDoctorId };
      const response = await fetch(
        "https://heart-predection-portal-server.onrender.com/AdminAccess/AdminDoctorInfo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedDoctor = await response.json();
        setDocData((prevDocData) =>
          prevDocData.map((doc) =>
            doc._id === editingDoctorId ? updatedDoctor : doc
          )
        );
      } else {
        console.error("Failed to update doctor:", response.statusText);
      }
    } catch (err) {
      console.error("Error while updating doctor:", err);
    }
    setEditingDoctorId(null);
  };

  return (
    <div className="DoctorInfoDiv">
      <h1 className={`DoctorsDatah1 ${!groupedData.length > 0 && `DoctorsDatah1Special`}`}>Doctor's Data</h1>
      <div className="DoctorInfo">
        {groupedData.length > 0 ? (
          groupedData.map((group, index) => (
            <div className="DoctorDiv" key={index}>
              {group.map((doctor, idx) => (
                <div className="DoctorCard" key={idx}>
                  {editingDoctorId === doctor._id ? (
                    // Render inputs when editing
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="UpdateDoctorForm"
                    >
                      <div>
                        <label>Name:</label>
                        <input
                          type="text"
                          {...register("Name", {
                            required: "Name is required",
                          })}
                        />
                        {errors.Name && <p title={errors.Name.message}>*</p>}
                      </div>
                      <div>
                        <label>Phone:</label>
                        <input
                          type="text"
                          {...register("Phone_Number", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Enter a valid 10-digit number",
                            },
                          })}
                        />
                        {errors.Phone_Number && (
                          <p title={errors.Phone_Number.message}>*</p>
                        )}
                      </div>
                      <div>
                        <label>Email:</label>
                        <input
                          type="email"
                          {...register("Email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Enter a valid email",
                            },
                          })}
                        />
                        {errors.Email && <p title={errors.Email.message}>*</p>}
                      </div>
                      <div>
                        <label>Age:</label>
                        <input
                          type="number"
                          {...register("Age", {
                            required: "Age is required",
                            min: {
                              value: 18,
                              message: "Age must be at least 18",
                            },
                          })}
                        />
                        {errors.Age && <p title={errors.Age.message}>*</p>}
                      </div>
                      <div>
                        <label>Gender:</label>
                        <select
                          {...register("Gender", {
                            required: "Gender is required",
                          })}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {errors.Gender && (
                          <p title={errors.Gender.message}>*</p>
                        )}
                      </div>
                      <div>
                        <label>Experience:</label>
                        <input
                          type="number"
                          {...register("Experience", {
                            required: "Experience is required",
                            min: {
                              value: 0,
                              message: "Experience must be positive",
                            },
                          })}
                        />
                        {errors.Experience && (
                          <p title={errors.Experience.message}>*</p>
                        )}
                      </div>
                      <button type="submit">Save Changes</button>
                    </form>
                  ) : (
                    // Render static details when not editing
                    <>
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
                      <div className="Doc_Update_Delete">
                        <button
                          className="DocUpdateBtn"
                          onClick={() => handleUpdateClick(doctor)}
                        >
                          Update
                        </button>
                        <button className="DocDeleteBtn" onClick={() => handleDeleteClick(doctor)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <Link className="DoctorInfoA" to="/AdminAccess">
            Loading...
          </Link>
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

export default AdminDoctorInfo;
