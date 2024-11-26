import express from "express";
import {UserDataUpdateFunction,DeleteUserDataFunction} from "../Controllers/UserLogout.js";

const UpdateUserData = express.Router();
const DeleteUserData=express.Router();

UpdateUserData.post("/", UserDataUpdateFunction);
DeleteUserData.delete("/",DeleteUserDataFunction);

export {UpdateUserData , DeleteUserData};