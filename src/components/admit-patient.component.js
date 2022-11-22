import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdmitPatient() {
  const [patientName, setPatientName] = useState("");
  const [illness, setIllness] = useState("");
  const [assignedToDoctor, setAssignedToDoctor] = useState("");
  const [illnessSeverity, setIllnessSeverity] = useState("");
  const [patientRelieved, setPatientRelieved] = useState(false);

  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Admit New Patient</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          console.log(`Form submitted:`);
          console.log(`Patient Name: ${patientName}`);
          console.log(`Illness: ${illness}`);
          console.log(`Assigned To Doctor: ${assignedToDoctor}`);
          console.log(`Illness Severity: ${illnessSeverity}`);

          const newPatient = {
            patient_name: patientName,
            illness: illness,
            assigned_to_doctor: assignedToDoctor,
            illness_severity: illnessSeverity,
            patient_relieved: patientRelieved,
          };

          axios
            .post("http://localhost:4000/patients/add", newPatient)
            .then((res) => console.log(res.data));

          setPatientName("");
          setIllness("");
          setAssignedToDoctor("");
          setIllnessSeverity("");
          setPatientRelieved(false);

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

        <div className="form-group mt-4">
          <input
            type="submit"
            value="Admit Patient"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
