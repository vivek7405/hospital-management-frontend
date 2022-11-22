import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient(props) {
  const [patientName, setPatientName] = useState("");
  const [illness, setIllness] = useState("");
  const [assignedToDoctor, setAssignedToDoctor] = useState("");
  const [illnessSeverity, setIllnessSeverity] = useState("");
  const [patientRelieved, setPatientRelieved] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/patients/" + id)
      .then((response) => {
        setPatientName(response.data.patient_name);
        setIllness(response.data.illness);
        setAssignedToDoctor(response.data.assigned_to_doctor);
        setIllnessSeverity(response.data.illness_severity);
        setPatientRelieved(response.data.patient_relieved);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3 align="center">Update Patient</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const obj = {
            patient_name: patientName,
            illness: illness,
            assigned_to_doctor: assignedToDoctor,
            illness_severity: illnessSeverity,
            patient_relieved: patientRelieved,
          };
          console.log(obj);

          axios
            .post("http://localhost:4000/patients/update/" + id, obj)
            .then((res) => console.log(res.data));

          navigate("/");
        }}
      >
        <div className="form-group">
          <label className="mb-1">Name</label>
          <input
            type="text"
            className="form-control"
            value={patientName}
            onChange={(e) => {
              setPatientName(e.target.value);
            }}
          />
        </div>

        <div className="form-group mt-3">
          <label className="mb-1">Illness</label>
          <input
            type="text"
            className="form-control"
            value={illness}
            onChange={(e) => {
              setIllness(e.target.value);
            }}
          />
        </div>

        <div className="form-group mt-3">
          <label className="me-3">Severity:</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={illnessSeverity === "Low"}
              onChange={(e) => {
                setIllnessSeverity(e.target.value);
              }}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={illnessSeverity === "Medium"}
              onChange={(e) => {
                setIllnessSeverity(e.target.value);
              }}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={illnessSeverity === "High"}
              onChange={(e) => {
                setIllnessSeverity(e.target.value);
              }}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>

        <div className="form-group mt-3">
          <label className="mb-1">Assigned to Doctor</label>
          <input
            type="text"
            className="form-control"
            value={assignedToDoctor}
            onChange={(e) => {
              setAssignedToDoctor(e.target.value);
            }}
          />
        </div>

        <div className="form-check mt-3">
          <input
            className="form-check-input"
            id="completedCheckbox"
            type="checkbox"
            name="completedCheckbox"
            onChange={(e) => {
              setPatientRelieved(!patientRelieved);
            }}
            checked={patientRelieved}
            value={patientRelieved}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            Relieved
          </label>
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Patient"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
