import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/patients/")
      .then((response) => {
        setPatients(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Patient = (props) => {
    return (
      <tr>
        <td className={props.patient.patient_relieved ? "relieved" : ""}>
          {props.patient.patient_name}
        </td>
        <td className={props.patient.patient_relieved ? "relieved" : ""}>
          {props.patient.illness}
        </td>
        <td className={props.patient.patient_relieved ? "relieved" : ""}>
          {props.patient.illness_severity}
        </td>
        <td className={props.patient.patient_relieved ? "relieved" : ""}>
          {props.patient.assigned_to_doctor}
        </td>
        <td>
          <Link to={"/edit/" + props.patient._id}>Edit</Link>
        </td>
      </tr>
    );
  };

  const PatientList = (props) => {
    return patients?.map((patient, i) => {
      return <Patient patient={patient} key={i} />;
    });
  };

  return (
    <div>
      <h3>Admitted Patients List</h3>
      {patients && patients?.length > 0 ? (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Illness</th>
              <th>Illness Severity</th>
              <th>Assigned To Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{<PatientList />}</tbody>
        </table>
      ) : (
        <p>No patients admitted yet</p>
      )}
    </div>
  );
}
