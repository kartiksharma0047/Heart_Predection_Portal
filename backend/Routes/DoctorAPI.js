import express from "express";
import {CreateDoctorAPI,DisplayDoctorData,UpdateDoctorDataFunction,DeleteDoctorDataFunction} from "../Controllers/DoctorAPI.js";

const DoctorData = express.Router();
const GetDoctorData=express.Router();
const UpdateDoctorData=express.Router();
const DeleteDoctorData=express.Router();

DoctorData.post("/", CreateDoctorAPI);
GetDoctorData.post("/",DisplayDoctorData);
UpdateDoctorData.put("/",UpdateDoctorDataFunction);
DeleteDoctorData.delete("/",DeleteDoctorDataFunction);

export {DoctorData,GetDoctorData,UpdateDoctorData,DeleteDoctorData};