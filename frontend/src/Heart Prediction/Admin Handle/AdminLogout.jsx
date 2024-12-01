import { useContext } from "react";
import "../CSS/AdminLogout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";

function AdminLogout() {
  const { setAdminLogin } = useContext(DataContext);
  const navigate=useNavigate();

  const handleLogout=()=>{
    setAdminLogin(false);
    navigate('/');
  }

  return (
    <div className="AdminLogoutDiv">
      <div className="AdminLogoutProfile">
        <FontAwesomeIcon icon={faUserTie} />
        <h1>Kartik Sharma</h1>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminLogout;
