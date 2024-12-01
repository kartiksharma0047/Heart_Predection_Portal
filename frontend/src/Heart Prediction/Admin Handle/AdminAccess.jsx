import { useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../DataContext";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../CSS/AdminAccess.css";

function AdminAccess() {
  const { adminLogin } = useContext(DataContext);
  const location = useLocation();
  const isRootAdminAccess = location.pathname === "/AdminAccess";

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch("https://heart-predection-portal-server.onrender.com/AdminAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Doctor Data is Uploaded");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AdminAccessDiv">
      {adminLogin ? (
        <div className="AdminAccessLogged">
          <div className="AdminAccessContainer">
            <NavLink to="/AdminAccess" end>
              Add Doctor
            </NavLink>
            <NavLink to="AdminDoctorInfo">View Doctor</NavLink>
            <NavLink to="UserInfo">View User</NavLink>
            <NavLink to="FeedbackInfo">View Feedback</NavLink>
            <NavLink to="AdminLogout">Logout</NavLink>
          </div>

          {isRootAdminAccess && (
            <div className="AdminAccessMainContent">
              <h1 className="AdminShowCase">Welcome Kartik Sharma</h1>
              <form className="DocDetails" onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Doctor Details</h2>

                <div className="DocDetailDiv">
                  <input
                    type="text"
                    placeholder="Enter Doctor's Name"
                    {...register("name", {
                      required: "Doctor's Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message}</p>
                  )}
                </div>

                <div className="DocDetailDiv">
                  <input
                    type="number"
                    placeholder="Enter Doctor's Age"
                    {...register("age", {
                      required: "Doctor's Age is required",
                      min: { value: 18, message: "Age must be at least 18" },
                    })}
                  />
                  {errors.age && <p className="error">{errors.age.message}</p>}
                </div>

                <div className="DocDetailDiv">
                  <input
                    type="number"
                    placeholder="Enter Doctor's Number"
                    {...register("phone_number", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="error">{errors.phone.message}</p>
                  )}
                </div>

                <div className="DocDetailDiv">
                  <input
                    type="email"
                    placeholder="Enter Doctor's Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>

                <div className="RadioBtn">
                  <h4>Gender :</h4>
                  <div className="RadioInputDiv">
                    <div>
                      <input
                        type="radio"
                        id="Male"
                        value="Male"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                      />
                      <label htmlFor="Male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="Female"
                        value="Female"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                      />
                      <label htmlFor="Female">Female</label>
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="error">{errors.gender.message}</p>
                  )}
                </div>

                <div className="DocDetailDiv">
                  <input
                    type="number"
                    placeholder="Enter Doctor's Years Of Experience"
                    {...register("experience", {
                      required: "Experience is required",
                      min: {
                        value: 0,
                        message: "Experience must be a positive number",
                      },
                    })}
                  />
                  {errors.experience && (
                    <p className="error">{errors.experience.message}</p>
                  )}
                </div>

                <button type="submit">Submit Details</button>
              </form>
            </div>
          )}

          <Outlet />
        </div>
      ) : (
        <div className="AdminAccessNotLogged">
          <h1>Admin Login Should Be Required</h1>
          <NavLink to="/AdminPannel">Click Here !!!</NavLink>
        </div>
      )}
    </div>
  );
}

export default AdminAccess;
