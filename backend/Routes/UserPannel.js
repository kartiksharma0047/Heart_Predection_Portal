import express from "express";
import handleUserRequest from "../Controllers/UserPannel.js";

const UserData = express.Router();

UserData.post("/", handleUserRequest);

export default UserData;
