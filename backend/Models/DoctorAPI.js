import mongoose from "mongoose";

const DoctorData = new mongoose.Schema({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Phone_Number: { type: Number, required: true },
  Email: { type: String, required: true },
  Gender: { type: String, required: true },
  Experience: { type: Number, required: true },
});

const DoctorAPI = mongoose.model("Doctor-Data", DoctorData);

export default DoctorAPI;
