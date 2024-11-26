import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DataProvider } from "./DataContext.jsx";
import FirstPage from "./FirstPage.jsx";
import AdminPannel from "./Admin Handle/AdminPannel.jsx";
import UserPannel from "./User Handle/UserPannel.jsx";
import UserAccess from "./User Handle/UserAccess.jsx";
import DoctorInfo from "./User Handle/DoctorInfo.jsx";
import UserFeedback from "./User Handle/UserFeedback.jsx";
import UserLogout from "./User Handle/UserLogout.jsx";
import AdminAccess from "./Admin Handle/AdminAccess.jsx";
import AdminLogout from "./Admin Handle/AdminLogout.jsx";
import AdminDoctorInfo from "./Admin Handle/AdminDoctorInfo.jsx";
import FeedbackInfo from "./Admin Handle/FeedbackInfo.jsx";
import UserInfo from "./Admin Handle/UserInfo.jsx"

function App() {
  document.title = "Heart Disease Prediction";
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/AdminPannel" element={<AdminPannel />} />
          <Route path="/AdminAccess" element={<AdminAccess />}>
            <Route path="AdminDoctorInfo" element={<AdminDoctorInfo />} />
            <Route path="AdminLogout" element={<AdminLogout />} />
            <Route path="FeedbackInfo" element={<FeedbackInfo />} />
            <Route path="UserInfo" element={<UserInfo />} />
          </Route>
          <Route path="/UserPannel" element={<UserPannel />} />
          <Route path="/UserAccess" element={<UserAccess />}>
            <Route path="DoctorInfo" element={<DoctorInfo />} />
            <Route path="UserFeedback" element={<UserFeedback />} />
            <Route path="UserLogout" element={<UserLogout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
