import { useContext, useState } from "react";
import "../CSS/AdminPannel.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { DataContext } from "../DataContext";

function AdminPannel() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAdminLogin } = useContext(DataContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const CheckAdminHandle = (data) => {
    const { adminId, adminPassword } = data;

    if (
      adminId.trim().toLowerCase() === "Kartik_Sharma".toLowerCase() &&
      adminPassword.trim().toLowerCase() === "Kartik_Sharma".toLowerCase()
    ) {
      setAdminLogin(true);
      navigate("/AdminAccess");
    } else {
      alert("Admin name or password is not matched!");
    }
  };

  return (
    <div className="AdminPage">
      <div className="AdminInfoPannel">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Admin Control Pannel</h1>
      </div>
      <form
        className="AdminVerification"
        onSubmit={handleSubmit(CheckAdminHandle)}
      >
        <div>
          <input
            type="text"
            placeholder="Enter Admin name"
            {...register("adminId", { required: "Admin name is required" })}
          />
          {errors.adminId && <p className="error">{errors.adminId.message}</p>}
        </div>
        <div className="AdminPassInput">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Admin Password"
            {...register("adminPassword", { required: "Password is required" })}
          />
          {errors.adminPassword && (
            <p className="error">{errors.adminPassword.message}</p>
          )}
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={ShowPassword}
          />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default AdminPannel;
