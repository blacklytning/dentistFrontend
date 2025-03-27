"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PatientRegisterForm from "./PatientRegisterForm" // Assuming this component exists

const DentistDashboard = () => {
  // State variables for appointments, follow-ups, loading, errors, and UI controls
  const [appointments, setAppointments] = useState([])
  const [followups, setFollowups] = useState([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(true)
  const [followupsLoading, setFollowupsLoading] = useState(true)
  const [appointmentsError, setAppointmentsError] = useState(null)
  const [followupsError, setFollowupsError] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    fetchAppointments()
    fetchFollowups()
  }, [])

  // Fetch appointments from the same endpoint as patient dashboard
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/p/complaints/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch appointments")
      }
      const data = await response.json()
      const appointmentList = Array.isArray(data.complaints) ? data.complaints : [data]
      setAppointments(appointmentList)
    } catch (err) {
      setAppointmentsError(err.message)
    } finally {
      setAppointmentsLoading(false)
    }
  }

  // Fetch follow-ups from the same endpoint as patient dashboard
  const fetchFollowups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/p/followup/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch follow-ups")
      }
      const data = await response.json()
      const followupList = Array.isArray(data.followups) ? data.followups : [data]
      setFollowups(followupList)
    } catch (err) {
      setFollowupsError(err.message)
    } finally {
      setFollowupsLoading(false)
    }
  }

  // Quick Action Button component
  const QuickActionButton = () => (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setShowQuickActions(!showQuickActions)}
        className="bg-[var(--darkgreen)] h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[var(--darkergreen)] transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      {showQuickActions && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-64 transform transition-all duration-300">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Register New Patient
            </button>
            <Link
              to="/appointment"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule Appointment
            </Link>
            <Link
              to="/patientdb"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Patient
            </Link>
            <Link
              to="/dailytreat"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              View Daily Treatments
            </Link>
            <Link
              to="/inventory"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              Manage Inventory
            </Link>
          </div>
        </div>
      )}
    </div>
  )

  // Action Cards component
  const ActionCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Register Patient */}
      <button
        onClick={() => setIsRegisterModalOpen(true)}
        className="bg-white rounded-lg shadow-md p-6 hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Register Patient</h3>
            <p className="text-gray-600">Add a new patient to the system</p>
          </div>
        </div>
      </button>

      {/* Schedule Appointment */}
      <Link
        to="/appointment"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Schedule Appointment</h3>
            <p className="text-gray-600">Book a new appointment</p>
          </div>
        </div>
      </Link>

      {/* Search Patient */}
      <Link
        to="/patientdb"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Search Patient</h3>
            <p className="text-gray-600">Find patient records</p>
          </div>
        </div>
      </Link>

      {/* View Daily Treatments */}
      <Link
        to="/dailytreat"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">View Daily Treatments</h3>
            <p className="text-gray-600">Manage today's treatments</p>
          </div>
        </div>
      </Link>

      {/* Manage Treatments */}
      <Link
        to="/treatmentcrud"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Manage Treatments</h3>
            <p className="text-gray-600">Manage treatment details</p>
          </div>
        </div>
      </Link>

      {/* Manage Prescriptions */}
      <Link
        to="/prescriptioncrud"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Manage Prescriptions</h3>
            <p className="text-gray-600">Manage prescription records</p>
          </div>
        </div>
      </Link>

      {/* Inventory Management - New Card */}
      <Link
        to="/inventory"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">Inventory Management</h3>
            <p className="text-gray-600">Track and manage clinic supplies</p>
          </div>
        </div>
      </Link>
    </div>
  )

  // Dashboard Stats component
  const DashboardStats = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Today's Appointments</h3>
          <p className="text-3xl font-bold text-white">{appointments.length}</p>
        </div>
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Today's Follow-ups</h3>
          <p className="text-3xl font-bold text-white">{followups.length}</p>
        </div>
      </div>
    </div>
  )

  // Main render
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-center text-[var(--txt)] my-10">Dentist Dashboard</h1>
        <ActionCards />
        <DashboardStats />

        {/* Appointments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Appointments</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {appointmentsLoading ? (
              <p className="text-[var(--txt)]">Loading appointments...</p>
            ) : appointmentsError ? (
              <p className="text-red-600">Error: {appointmentsError}</p>
            ) : appointments.length === 0 ? (
              <p className="text-[var(--txt)]">No appointments for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Phone Number</th>
                      <th className="border border-gray-300 p-2">Age</th>
                      <th className="border border-gray-300 p-2">Complaint</th>
                      <th className="border border-gray-300 p-2">Time</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-2">{appointment.name || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{appointment.phonenumber || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{appointment.age || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{appointment.complaint || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {appointment.time ? appointment.time.split(".")[0].slice(0, 5) : "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Link to={`/dailytreatment/${appointment.id}`} className="text-blue-500 hover:underline">
                            View Treatment
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Follow-ups Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Follow-ups</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {followupsLoading ? (
              <p className="text-[var(--txt)]">Loading follow-ups...</p>
            ) : followupsError ? (
              <p className="text-red-600">Error: {followupsError}</p>
            ) : followups.length === 0 ? (
              <p className="text-[var(--txt)]">No follow-ups for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Phone Number</th>
                      <th className="border border-gray-300 p-2">Age</th>
                      <th className="border border-gray-300 p-2">Follow-up</th>
                      <th className="border border-gray-300 p-2">Time</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followups.map((followup, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-2">{followup.name || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{followup.phonenumber || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{followup.age || "N/A"}</td>
                        <td className="border border-gray-300 p-2">{followup.followup || "N/A"}</td>
                        <td className="border border-gray-300 p-2">
                          {followup.time ? followup.time.split(".")[0].slice(0, 5) : "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Link to={`/dailytreatment/${followup.id}`} className="text-blue-500 hover:underline">
                            View Treatment
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <QuickActionButton />

        {/* Patient Registration Modal */}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[var(--txt)]">Register Patient</h2>
                <button onClick={() => setIsRegisterModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <PatientRegisterForm />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DentistDashboard

