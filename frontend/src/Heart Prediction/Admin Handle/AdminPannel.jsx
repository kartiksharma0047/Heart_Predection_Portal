import { useState } from "react";
import "../CSS/AdminPannel.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AdminPannel() {
  const [showPassword, setShowPassword] = useState(false);

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="AdminPage">
      <div className="AdminInfoPannel">
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Admin Control Pannel</h1>
      </div>
      <form className="AdminVerification">
        <div>
          <input type="text" placeholder="Enter Admin name" />
        </div>
        <div className="AdminPassInput">
          <input
            maxLength={10}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Admin Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={ShowPassword}
          />
        </div>
        <button>Verify</button>
      </form>
    </div>
  );
}

export default AdminPannel;
