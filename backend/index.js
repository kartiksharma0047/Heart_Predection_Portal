import express from "express";
import cors from "cors";
import connectToMongoDBAtlas from "./connect.js";
import {UserData,GetUserData} from "./Routes/UserPannel.js";
import { DeleteUserData, UpdateUserData } from "./Routes/UserLogout.js";
import {UserFeedback,ShowFeedback} from './Routes/UserFeedback.js'
import {DoctorData,GetDoctorData,UpdateDoctorData,DeleteDoctorData} from "./Routes/DoctorAPI.js";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User Handling :-
//        Creating User Data
app.use("/UserPannel", UserData);
//        Logout User funcationality
app.use("/UserAccess/UserLogout", UpdateUserData);
//        User Data Changes
app.use("/UserAccess/UserLogout",DeleteUserData);
//        User Feedback Storing
app.use("/UserAccess/UserFeedback",UserFeedback);
//        Show Users Feedback
app.use("/UserAccess/userFeedback",ShowFeedback);

// Admin Handling
//        Creating Doctor Data
app.use("/AdminAccess",DoctorData);
//        Displaying Doctor Data
app.use("/AdminAccess/AdminDoctorInfo",GetDoctorData);
//        Updating Doctor Data
app.use("/AdminAccess/AdminDoctorInfo",UpdateDoctorData);
//        Delete Doctor Data
app.use("/AdminAccess/AdminDoctorInfo",DeleteDoctorData);
//        Get User Data
app.use("/AdminAccess/UserInfo",GetUserData);


// Connect to MongoDB Atlas and start the server
try {
  connectToMongoDBAtlas(
    "mongodb+srv://rahulsitaram0013:<db_password>@cluster0.r7pif.mongodb.net/Heart-Predection?retryWrites=true&w=majority&appName=Cluster0"
  );
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log(err);
}
