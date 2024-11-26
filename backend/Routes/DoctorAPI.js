import express from "express";
import {CreateDoctorAPI,DisplayDoctorData} from "../Controllers/DoctorAPI.js";

const DoctorData = express.Router();
const GetDoctorData=express.Router();

DoctorData.post("/", CreateDoctorAPI);
GetDoctorData.post("/",DisplayDoctorData)

export {DoctorData,GetDoctorData};