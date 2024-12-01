import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToMongoDBAtlas from "./connect.js";
import { UserData, GetUserData } from "./Routes/UserPannel.js";
import { DeleteUserData, UpdateUserData } from "./Routes/UserLogout.js";
import { UserFeedback, ShowFeedback } from "./Routes/UserFeedback.js";
import {
  DoctorData,
  GetDoctorData,
  UpdateDoctorData,
  DeleteDoctorData,
} from "./Routes/DoctorAPI.js";

const app = express();
const corsOptions = {
  origin: `${process.env.Frontend_URL}`, // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

configDotenv();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User Handling :-
//        Creating User Data
app.use("/UserPannel", UserData);
//        Logout User funcationality
app.use("/UserAccess/UserLogout", UpdateUserData);
//        User Data Changes
app.use("/UserAccess/UserLogout", DeleteUserData);
//        User Feedback Storing
app.use("/UserAccess/UserFeedback", UserFeedback);
//        Show Users Feedback
app.use("/UserAccess/userFeedback", ShowFeedback);
//        Get Doctor Data
app.use("/UserAccess/DoctorInfo", GetDoctorData);

// Admin Handling
//        Creating Doctor Data
app.use("/AdminAccess", DoctorData);
//        Displaying Doctor Data
app.use("/AdminAccess/AdminDoctorInfo", GetDoctorData);
//        Updating Doctor Data
app.use("/AdminAccess/AdminDoctorInfo", UpdateDoctorData);
//        Delete Doctor Data
app.use("/AdminAccess/AdminDoctorInfo", DeleteDoctorData);
//        Get User Data
app.use("/AdminAccess/UserInfo", GetUserData);
//        Get User Feedback
app.use("/AdminAccess/FeedbackInfo", ShowFeedback);

// Connect to MongoDB Atlas and start the server
try {
  connectToMongoDBAtlas(`${process.env.mongoDBConnectionAPI}`);
  app.listen(process.env.PORT, () => {
    console.log(`Server running is Running at PORT : ${process.env.PORT}`);
  });
} catch (err) {
  console.log(err);
}
