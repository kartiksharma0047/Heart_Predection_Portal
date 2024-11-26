import DoctorAPI from "../Models/DoctorAPI.js";

async function CreateDoctorAPI(req, res) {
  const { name, age, phone_number, email, gender, experience } = req.body;

  try {
    await DoctorAPI.create({
      Name: name,
      Age: age,
      Phone_Number: phone_number,
      Email: email,
      Gender: gender,
      Experience: experience,
    });
    return res.json({ message: "Doctor Entry In Added" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error processing request", error: err.message });
  }
}

async function DisplayDoctorData(req, res) {
  try {
    const { requestType } = req.body;
    if (requestType !== "getDoctors") {
      return res.status(400).json({ message: "Invalid request type" });
    }
    const DocData = await DoctorAPI.find();
    res.status(200).json(DocData);
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { CreateDoctorAPI, DisplayDoctorData };
