import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdmitPatient from "./components/admit-patient.component";
import EditPatient from "./components/edit-patient.component";
import PatientsList from "./components/patients-list.component";
import logo from "./logo.png";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="px-3 navbar navbar-expand-lg navbar-light bg-light">
            <a
              className="navbar-brand"
              href="https://codingthesmartway.com"
              target="_blank"
            >
              <img
                src={logo}
                width="30"
                height="30"
                alt="CodingTheSmartWay.com"
              />
            </a>
            <Link to="/" className="navbar-brand">
              Krishi Hospital
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Admitted Patients
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/admit" className="nav-link">
                    Admit Patient
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Routes>
            <Route path="/" exact element={<PatientsList />} />
            <Route path="/edit/:id" element={<EditPatient />} />
            <Route path="/admit" element={<AdmitPatient />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
