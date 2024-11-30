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
//        Get Doctor Data
app.use('/UserAccess/DoctorInfo',GetDoctorData);

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
//        Get User Feedback
app.use("/AdminAccess/FeedbackInfo",ShowFeedback);


// Connect to MongoDB Atlas and start the server
try {
  connectToMongoDBAtlas(
    "mongodb+srv://kartiksharma55109:ykwpuDHNZrXErf3Q@cluster0.ko9yu.mongodb.net/UserData?retryWrites=true&w=majority&appName=Cluster0"
  );
  app.listen(PORT, () => {
    console.log(`Server running is Running at PORT : ${PORT}`);
  });
} catch (err) {
  console.log(err);
}
