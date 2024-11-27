import express from "express";
import {handleUserRequest,GetUserDataFunction} from "../Controllers/UserPannel.js";

const UserData = express.Router();
const GetUserData=express.Router();

UserData.post("/", handleUserRequest);
GetUserData.get("/", GetUserDataFunction);

export {UserData,GetUserData};
