"use client"

// App.jsx
// ok add this all in header and not here

import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import ReceptionDashboard from "./pages/ReceptionDashboard"
import PatientRegisterForm from "./pages/PatientRegisterForm"
import CredentialsForm from "./pages/CredentialsForm"
import PatientAppointmentForm from "./pages/PatientAppointmentForm"
import Home from "./pages/Home"
import DailyTreatment from "./pages/DailyTreatment"
import ProtectedRoute from "./components/ProtectedRoute"
import Unauthorized from "./components/Unauthorized"
import SendMessage from "./pages/SendMessage"
import { ToastContainer } from "react-toastify"
import TreatmentManagement from "./pages/TreatmentManagement.jsx"
import PrescriptionManagement from "./pages/PrescriptionManagement.jsx"
import PatientDatabase from "./pages/PatientDatabase.jsx"
import DoctorDashboard from "./pages/DoctorDashboard.jsx"
import InventoryDashboard from "./pages/InventoryDashboard.jsx"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [patients, setPatients] = React.useState([])

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient])
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <div>
        <nav className="bg-[var(--darkgreen)] p-4 flex justify-between ">
          <div>
            <Link to="/Home" className="p-2">
              HomePage
            </Link>
            <Link to="/" className="mr-4 ">
              AdminDashboard
            </Link>
            <Link to="/dailytreat" className="p-2">
              docDailyTreatment
            </Link>
            <Link to="/patientdb" className="p-2">
              SearcPatient
            </Link>
          </div>
          <div>
            <Link to="/register" className="p-2">
              RegisterPatient
            </Link>
            <Link to="/login" className="p-2">
              Login
            </Link>
            <Link to="/signup" className="p-2">
              Signup
            </Link>
            <Link to="/appointment" className="p-2">
              Appointment
            </Link>
            <Link to="/sendmessage" className="p-2">
              SendMessage
            </Link>
            <Link to="/treatmentcrud" className="p-2">
              EditTreatment
            </Link>
            <Link to="/prescriptioncrud" className="p-2">
              EditPrescription
            </Link>
            <Link to="/doctordashboard" className="p-2">
              DoctorDashboard
            </Link>
            <Link to="/inventory" className="p-2">
              Inventory
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ReceptionDashboard patients={patients} />} />
          <Route element={<ProtectedRoute allowedRoles={["admin", "dentist"]} />}>
            <Route path="/register" element={<PatientRegisterForm addPatient={addPatient} />} />
          </Route>
          <Route path="/login" element={<CredentialsForm formAction="login" />} />
          <Route path="/signup" element={<CredentialsForm formAction="signup" />} />
          <Route path="/appointment" element={<PatientAppointmentForm />} />
          <Route path="/Home" element={<Home />} />
          <Route element={<ProtectedRoute allowedRoles={["dentist"]} />}>
            <Route path="/dailytreat" element={<DailyTreatment />} />
            <Route path="/doctordashboard" element={<DoctorDashboard />} />
            <Route path="/inventory" element={<InventoryDashboard />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/sendmessage" element={<SendMessage />} />
          <Route path="/treatmentcrud" element={<TreatmentManagement />} />
          <Route path="/prescriptioncrud" element={<PrescriptionManagement />} />
          <Route path="/patientdb" element={<PatientDatabase />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

