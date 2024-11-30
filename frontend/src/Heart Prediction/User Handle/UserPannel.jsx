import { useContext, useState, useEffect } from "react";
import "../CSS/UserPannel.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../DataContext.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UserPannel() {
  const { setUserLogin, userCredentials, setUserCredentials } = useContext(DataContext);
  const [userLogIn, setUserLogIn] = useState(false);
  const [signInPassShow, setSignInPassShow] = useState(false);
  const [logInPassShow, setLogInPassShow] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const ChangeUserSignIn = (e) => {
    e.preventDefault();
    setUserLogIn(!userLogIn);
  };

  useEffect(() => {
    if (userCredentials.username) {
      console.log("User credentials updated:", userCredentials);
    }
  }, [userCredentials]);

  const onSignInSubmit = async (data) => {
    try {
      const response = await fetch("https://heart-predection-portal-server.onrender.com/UserPannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, action: "signup" }),
      });
      const result = await response.json();

      if (result.user) {
        setUserCredentials({
          id: result.user.Id,
          username: result.user.Username,
          email: result.user.Email,
          mobile_number: result.user.MobileNumber
        });
        setUserLogin(true);
        reset();
        navigate("/UserAccess"); // Navigate to UserAccess on success
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const onLogInSubmit = async (data) => {
    try {
      const response = await fetch("https://heart-predection-portal-server.onrender.com/UserPannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, action: "login" }),
      });
      const result = await response.json();

      if (result.user) {
        setUserCredentials({
          id: result.user.Id,
          username: result.user.Username,
          email: result.user.Email,
          mobile_number: result.user.MobileNumber,
        });
        setUserLogin(true);
        reset();
        navigate("/UserAccess"); // Navigate to UserAccess on success
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const LoginPassword = () => {
    setLogInPassShow(!logInPassShow);
  };
  const SigninPassword = () => {
    setSignInPassShow(!signInPassShow);
  };

  return (
    <div className="UserPannel">
      <div className="UserSignUp">
        {userLogIn ? <h1>User Login</h1> : <h1>User Sign in</h1>}
        {userLogIn ? (
          <form className="UserLogIn" onSubmit={handleSubmit(onLogInSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                {...register("username", {
                  required: "Username or Email is required",
                })}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div>
              <input
                type={logInPassShow ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password", { required: "Password is required" })}
              />
              {logInPassShow ? (
                <FontAwesomeIcon icon={faEyeSlash} onClick={LoginPassword} />
              ) : (
                <FontAwesomeIcon icon={faEye} onClick={LoginPassword} />
              )}
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <button type="submit">Verify</button>
          </form>
        ) : (
          <form className="UserSignIn" onSubmit={handleSubmit(onSignInSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Mobile number"
                {...register("mobile", {
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
              {errors.mobile && (
                <p className="error">{errors.mobile.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type={signInPassShow ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password", { required: "Password is required" })}
              />
              {signInPassShow ? (
                <FontAwesomeIcon icon={faEyeSlash} onClick={SigninPassword} />
              ) : (
                <FontAwesomeIcon icon={faEye} onClick={SigninPassword} />
              )}
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
        {userLogIn ? (
          <p>
            Create account!{" "}
            <a href="/UserPannel" onClick={ChangeUserSignIn}>
              Signup
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/UserPannel" onClick={ChangeUserSignIn}>
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserPannel;