import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

  const [predectionBtn, setPredectionBtn] = useState(false);
  
  // User Login Control
  const [userLogin, setUserLogin] = useState(() => {
    return JSON.parse(localStorage.getItem("UserLogin")) || false;
  });

  // Admin Login Control
  const [adminLogin,setAdminLogin]=useState(()=>{
    return JSON.parse(localStorage.getItem("AdminLogin")) || false
  })

  const [userCredentials, setUserCredentials] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("UserCredentials")) || {
        username: "",
        email: "",
        mobile_number: null,
      }
    );
  });

  useEffect(() => {
    Object.keys(localStorage).forEach(key => {
      if (key.includes("UserCredentials") && key !== "UserCredentials") {
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("UserCredentials", JSON.stringify(userCredentials));
  }, [userCredentials]);

  useEffect(() => {
    localStorage.setItem("UserLogin", JSON.stringify(userLogin));
  }, [userLogin]);

  useEffect(() => {
    localStorage.setItem("AdminLogin", JSON.stringify(adminLogin));
  }, [adminLogin]);

  return (
    <DataContext.Provider
      value={{ userLogin, setUserLogin, userCredentials, setUserCredentials,predectionBtn, setPredectionBtn ,adminLogin,setAdminLogin}}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };