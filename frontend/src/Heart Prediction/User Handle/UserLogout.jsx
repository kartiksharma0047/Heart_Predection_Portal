import "../CSS/UserLogout.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const {
    setUserLogin,
    setPredectionBtn,
    userCredentials,
    setUserCredentials,
  } = useContext(DataContext);
  const [dataUpdation, setDataUpdation] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [UserEnteredPassword, setUserEnteredPassword] = useState("");
  const [UserEnteredIncorrectPassword,setUserEnteredIncorrectPassword]=useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: userCredentials.username,
      email: userCredentials.email,
      mobile_number: userCredentials.mobile_number,
    },
  });

  // Update form default values when userCredentials changes
  useEffect(() => {
    reset({
      username: userCredentials.username,
      email: userCredentials.email,
      mobile_number: userCredentials.mobile_number,
    });
  }, [userCredentials, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://heart-predection-portal-server.onrender.com/UserAccess/UserLogout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userCredentials.id, ...data }),
        }
      );

      const result = await response.json();
      if (result.message === "User data updated successfully") {
        setUserCredentials({
          id: result.updatedUser.Id,
          username: result.updatedUser.Username,
          email: result.updatedUser.Email,
          mobile_number: result.updatedUser.MobileNumber,
        });
        setDataUpdation(false);
      } else {
        console.error("Update failed:", result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const UpdateUserInfo = () => {
    setDataUpdation(true);
  };

  const ConfirmDeleteUserAccount = () => {
    setDeleteAccount(true);
  };

  const DeleteUserAccount = async () => {
    try {
      const response = await fetch(
        "https://heart-predection-portal-server.onrender.com/UserAccess/UserLogout",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userCredentials.id,
            password: UserEnteredPassword,
          }),
        }
      );

      const result = await response.json();
      if (result.message === "User deleted successfully") {
        setUserCredentials({
          id: "",
          username: "",
          email: "",
          mobile_number: null,
        });
        setUserLogin(false);
        setPredectionBtn(false);
        setUserEnteredIncorrectPassword(false);
        navigate('/');
      } else {
        setUserEnteredIncorrectPassword(true);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const UserLogoutBtn=()=>{
    setUserCredentials({
      id: "",
      username: "",
      email: "",
      mobile_number: null,
    });
    setUserLogin(false);
    setPredectionBtn(false);
    setDataUpdation(false);
    setUserEnteredIncorrectPassword(false);
    navigate('/');
  }

  return (
    <div className="UserLogoutContainer">
      <div className={`UserLogout ${deleteAccount ? "BlurUserLogout" : ""}`}>
        <FontAwesomeIcon icon={faUser} />
        <div className="UserNameDiv">
          {dataUpdation ? (
            <>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </>
          ) : (
            <h1>{userCredentials.username}</h1>
          )}
        </div>
        <div className="EmailAndNumberDiv">
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            {dataUpdation ? (
              <>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </>
            ) : (
              <p>{userCredentials.email}</p>
            )}
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} />
            {dataUpdation ? (
              <>
                <input
                  type="number"
                  {...register("mobile_number", {
                    required: "Mobile number is required",
                    minLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                  })}
                />
                {errors.mobile_number && (
                  <p className="error">{errors.mobile_number.message}</p>
                )}
              </>
            ) : (
              <p>{userCredentials.mobile_number}</p>
            )}
          </div>
        </div>
        <div className="UpdationAndDeletion">
          {dataUpdation ? (
            <button onClick={handleSubmit(onSubmit)}>Confirm Changes</button>
          ) : (
            <button onClick={UpdateUserInfo}>Update Account</button>
          )}
          <button onClick={ConfirmDeleteUserAccount}>Delete Account</button>
        </div>
        <button className="LogoutBtn" onClick={UserLogoutBtn}>Logout</button>
      </div>
      {deleteAccount && (
        <div className="FinalLogoutDiv">
          <h5>
            This Account will be deleted, along with all the information it
            holds.
          </h5>
          <p>Warning: This action is not reversible. Please be certain.</p>
          <div className="EnterPasswordDiv">
            <input
              value={UserEnteredPassword}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setUserEnteredPassword(e.target.value);
              }}
            />
            {UserEnteredIncorrectPassword && <p>Entered password dosen't match</p>}
          </div>
          <button className="FinalDeleteBtn" onClick={DeleteUserAccount}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

export default UserLogout;
