import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../CSS/UserAccess.css";

function UserAccess() {
  const { userLogin, predectionBtn, setPredectionBtn } =
    useContext(DataContext);
  const location = useLocation();
  const isRootUserAccess = location.pathname === "/UserAccess";
  const [diseaseChance, setDiseaseChance] = useState();

  const weights = [
    1.5, 2, 1.2, 1.1, 1.5, 2, 1.7, 1.3, 1.4, 1.6, 1.4, 1.3, 1.2, 1.1,
  ];
  const [riskFactors, setRiskFactors] = useState(Array(14).fill("UnSelected"));
  const [errors, setErrors] = useState(Array(14).fill(""));

  const handleSelectChange = (index, value) => {
    const updatedFactors = [...riskFactors];
    updatedFactors[index] = value;
    setRiskFactors(updatedFactors);

    if (value !== "UnSelected") {
      const updatedErrors = [...errors];
      updatedErrors[index] = "";
      setErrors(updatedErrors);
    }
  };

  const calculateRisk = () => {
    let allSelected = true;
    const updatedErrors = [...errors];

    riskFactors.forEach((factor, index) => {
      if (factor === "UnSelected") {
        updatedErrors[index] = "This field is required.";
        allSelected = false;
      } else {
        updatedErrors[index] = "";
      }
    });

    setErrors(updatedErrors);

    if (allSelected) {
      setPredectionBtn(true);
      const weightedSum = riskFactors.reduce(
        (sum, value, index) => sum + parseInt(value) * weights[index],
        0
      );
      const maxScore = weights.reduce((sum, weight) => sum + 5 * weight, 0);
      const riskPercentage = (weightedSum / maxScore) * 100;
      setDiseaseChance(riskPercentage.toFixed(2));
    }
  };

  const ResetFormData = () => {
    setDiseaseChance("");
    setPredectionBtn(false);
  };

  return (
    <div className="UserAccessDiv">
      {userLogin ? (
        <div className="UserAccessLogged">
          <div className="UserAccessContainer">
            <NavLink to="/UserAccess" end>
              Heart Analysis
            </NavLink>
            <NavLink to="DoctorInfo">View Doctor</NavLink>
            <NavLink to="UserFeedback">Feedback</NavLink>
            <NavLink to="UserLogout">Logout</NavLink>
          </div>

          {isRootUserAccess && (
            <div className="UserAccessMainContent">
              <h1>Welcome to the Heart Analysis Platform!</h1>
              <p className="RedFill">
                *Kindly fill up all the details given below
              </p>
              {predectionBtn ? (
                <div className="PredectionResult">
                  <h1>{diseaseChance} %</h1>
                  <h2>Chances for getting a heart disease in next 10 years</h2>
                  <button onClick={ResetFormData}>Check Again</button>
                </div>
              ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="TwoUserInputs">
                    <div className="GenderInput">
                      <select
                        onChange={(e) => handleSelectChange(0, e.target.value)}
                        defaultValue="UnSelected"
                      >
                        <option value="UnSelected" disabled>
                          Select Gender
                        </option>
                        <option value="3">Male</option>
                        <option value="1">Female</option>
                      </select>
                      {errors[0] && <p className="error">{errors[0]}</p>}
                    </div>
                    <div className="Age">
                      <select
                        onChange={(e) => handleSelectChange(1, e.target.value)}
                        defaultValue="UnSelected"
                      >
                        <option value="UnSelected" disabled>
                          Select Age
                        </option>
                        <option value="0">Less than 20 years</option>
                        <option value="1">Between 20-40 years</option>
                        <option value="2">Between 40-60 years</option>
                        <option value="4">More than 60 years</option>
                      </select>
                      {errors[1] && <p className="error">{errors[1]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="CurrentSmoking">
                      <select
                        onChange={(e) => handleSelectChange(2, e.target.value)}
                        defaultValue="UnSelected"
                      >
                        <option value="UnSelected" disabled>
                          Current Smoking Status
                        </option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors[2] && <p className="error">{errors[2]}</p>}
                    </div>
                    <div className="CigsPerDay">
                      <select
                        onChange={(e) => handleSelectChange(3, e.target.value)}
                        defaultValue="UnSelected"
                      >
                        <option value="UnSelected" disabled>
                          Cigarettes Per Day
                        </option>
                        <option value="0">None</option>
                        <option value="1">Less than 5</option>
                        <option value="2">Between 5-10</option>
                        <option value="3">Between 10-20</option>
                        <option value="4">More than 20</option>
                      </select>
                      {errors[3] && <p className="error">{errors[3]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="BpMeds">
                      <select
                        onChange={(e) => handleSelectChange(4, e.target.value)}
                        defaultValue="UnSelected"
                      >
                        <option value="UnSelected" disabled>
                          Blood Pressure Medication
                        </option>
                        <option value="2">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors[4] && <p className="error">{errors[4]}</p>}
                    </div>
                    <div className="PrevalentStroke">
                      <select
                        onChange={(e) => handleSelectChange(5, e.target.value)}
                      defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          History of Stroke
                        </option>
                        <option value="3">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors[5] && <p className="error">{errors[5]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="PrevalentHypertension">
                      <select
                        onChange={(e) => handleSelectChange(6, e.target.value)}
                      defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Hypertension Issues
                        </option>
                        <option value="2">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors[6] && <p className="error">{errors[6]}</p>}
                    </div>
                    <div className="Diabetes">
                      <select
                        onChange={(e) => handleSelectChange(7, e.target.value)}
                      defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Diabetes Issues
                        </option>
                        <option value="4">Type 2</option>
                        <option value="2">Type 1</option>
                        <option value="0">No</option>
                      </select>
                      {errors[7] && <p className="error">{errors[7]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="totChol">
                      <select
                        onChange={(e) => handleSelectChange(8, e.target.value)}
                      defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Total Cholesterol
                        </option>
                        <option value="0">Below 200 mg/dl</option>
                        <option value="2">200-239 mg/dl</option>
                        <option value="3">Above 240 mg/dl</option>
                      </select>
                      {errors[8] && <p className="error">{errors[8]}</p>}
                    </div>
                    <div className="SysBP">
                      <select
                        onChange={(e) => handleSelectChange(9, e.target.value)}
                      defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Systolic Blood Pressure
                        </option>
                        <option value="0">Below 120 mmHg</option>
                        <option value="1">120-129 mmHg</option>
                        <option value="3">130-139 mmHg</option>
                        <option value="4">Over 140 mmHg</option>
                      </select>
                      {errors[9] && <p className="error">{errors[9]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="DiaBP">
                      <select
                        onChange={(e) => handleSelectChange(10, e.target.value)}
                        defaultValue='UnSelected'
                      >
                        <option value="UnSelected"  disabled>
                          Diastolic Blood Pressure
                        </option>
                        <option value="0">Below 80 mmHg</option>
                        <option value="2">80-89 mmHg</option>
                        <option value="3">Over 90 mmHg</option>
                      </select>
                      {errors[10] && <p className="error">{errors[10]}</p>}
                    </div>
                    <div className="BMI">
                      <select
                        onChange={(e) => handleSelectChange(11, e.target.value)}
                        defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Body Mass Index (BMI)
                        </option>
                        <option value="0">18.5-24.9</option>
                        <option value="1">25-29.9</option>
                        <option value="3">Over 30</option>
                      </select>
                      {errors[11] && <p className="error">{errors[11]}</p>}
                    </div>
                  </div>
                  <div className="TwoUserInputs">
                    <div className="HeartRate">
                      <select
                        onChange={(e) => handleSelectChange(12, e.target.value)}
                        defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Heart Rate
                        </option>
                        <option value="0">60-80 bpm</option>
                        <option value="1">80-100 bpm</option>
                        <option value="2">Over 100 bpm</option>
                      </select>
                      {errors[12] && <p className="error">{errors[12]}</p>}
                    </div>
                    <div className="Glucose">
                      <select
                        onChange={(e) => handleSelectChange(13, e.target.value)}
                        defaultValue='UnSelected'
                      >
                        <option value="UnSelected" disabled>
                          Glucose Levels
                        </option>
                        <option value="0">70-99 mg/dl</option>
                        <option value="1">100-125 mg/dl</option>
                        <option value="3">More than 126 mg/dl</option>
                      </select>
                      {errors[13] && <p className="error">{errors[13]}</p>}
                    </div>
                  </div>
                  <div className="SubmitUserhealthForm">
                    <button onClick={calculateRisk}>Calculate Risk</button>
                  </div>
                </form>
              )}
            </div>
          )}

          <Outlet />
        </div>
      ) : (
        <div className="UserAccessNotLogged">
          <h1>Login To Access Our Features</h1>
          <NavLink to="/UserPannel">Click Here !!!</NavLink>
        </div>
      )}
    </div>
  );
}

export default UserAccess;
