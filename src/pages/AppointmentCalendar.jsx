"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaChevronLeft, FaChevronRight, FaPlus, FaSpinner, FaCalendarAlt, FaListUl } from "react-icons/fa"
import { toast } from "react-toastify"

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState("month") // month, week, day
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    phone: "",
    time: "",
    complaint: "",
  })

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch appointments for the selected date range
        // For now, we'll simulate a delay and use mock data
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data - in a real app, this would come from your API
        const mockAppointments = [
          {
            id: 1,
            name: "John Doe",
            phone: "1234567890",
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 10, 30),
            complaint: "Tooth pain",
            status: "confirmed",
          },
          {
            id: 2,
            name: "Jane Smith",
            phone: "9876543210",
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 14, 0),
            complaint: "Regular checkup",
            status: "confirmed",
          },
          {
            id: 3,
            name: "Robert Johnson",
            phone: "5551234567",
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 11, 15),
            complaint: "Cavity filling",
            status: "confirmed",
          },
          {
            id: 4,
            name: "Emily Davis",
            phone: "7778889999",
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
            complaint: "Root canal",
            status: "confirmed",
          },
          {
            id: 5,
            name: "Michael Wilson",
            phone: "3334445555",
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 30),
            complaint: "Teeth whitening",
            status: "confirmed",
          },
        ]

        setAppointments(mockAppointments)
        setLoading(false)
      } catch (err) {
        setError("Failed to load appointments")
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [currentDate])

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Calendar array
    const calendar = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push({ day: null, date: null })
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      calendar.push({ day, date })
    }

    return calendar
  }

  // Generate week days
  const generateWeekDays = () => {
    const days = []
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push({ day: date.getDate(), date })
    }

    return days
  }

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    if (!date) return []

    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear(),
    )
  }

  // Format time (e.g., "10:30 AM")
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Navigate to previous month/week/day
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }

  // Navigate to next month/week/day
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }

  // Navigate to today
  const navigateToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  // Handle date selection
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date)
      if (viewMode === "month") {
        setViewMode("day")
      }
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAppointment((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newAppointment.name || !newAppointment.phone || !newAppointment.time) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      // In a real app, you would send this data to your API
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create appointment date from selected date and time
      const [hours, minutes] = newAppointment.time.split(":")
      const appointmentDate = new Date(selectedDate)
      appointmentDate.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10))

      const newAppointmentObj = {
        id: appointments.length + 1,
        name: newAppointment.name,
        phone: newAppointment.phone,
        date: appointmentDate,
        complaint: newAppointment.complaint,
        status: "confirmed",
      }

      setAppointments([...appointments, newAppointmentObj])
      setNewAppointment({ name: "", phone: "", time: "", complaint: "" })
      setShowAddModal(false)
      toast.success("Appointment scheduled successfully!")
    } catch (err) {
      toast.error("Failed to schedule appointment")
    }
  }

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FaSpinner className="animate-spin text-[var(--darkgreen)] text-4xl" />
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[var(--darkgreen)] text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">Appointment Calendar</h1>
          <div className="flex space-x-2">
            <Link
              to="/doctordashboard"
              className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-2" /> New Appointment
            </button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={navigatePrevious} className="p-2 rounded-full hover:bg-gray-200">
                <FaChevronLeft />
              </button>
              <h2 className="text-xl font-semibold">
                {viewMode === "month" && currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                {viewMode === "week" &&
                  `Week of ${new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toLocaleDateString()}`}
                {viewMode === "day" &&
                  selectedDate.toLocaleDateString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </h2>
              <button onClick={navigateNext} className="p-2 rounded-full hover:bg-gray-200">
                <FaChevronRight />
              </button>
              <button onClick={navigateToday} className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                Today
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 rounded flex items-center ${viewMode === "month" ? "bg-[var(--darkgreen)] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                <FaCalendarAlt className="mr-1" /> Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 rounded flex items-center ${viewMode === "week" ? "bg-[var(--darkgreen)] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                <FaCalendarAlt className="mr-1" /> Week
              </button>
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-1 rounded flex items-center ${viewMode === "day" ? "bg-[var(--darkgreen)] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                <FaListUl className="mr-1" /> Day
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {viewMode === "month" && (
            <div>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={index} className="text-center font-semibold p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((item, index) => {
                  const appointmentsForDay = item.date ? getAppointmentsForDate(item.date) : []
                  const isToday =
                    item.date &&
                    item.date.getDate() === new Date().getDate() &&
                    item.date.getMonth() === new Date().getMonth() &&
                    item.date.getFullYear() === new Date().getFullYear()

                  const isSelected =
                    item.date &&
                    item.date.getDate() === selectedDate.getDate() &&
                    item.date.getMonth() === selectedDate.getMonth() &&
                    item.date.getFullYear() === selectedDate.getFullYear()

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] border p-1 ${!item.day ? "bg-gray-100" : ""} ${isToday ? "bg-blue-50 border-blue-300" : ""} ${isSelected ? "ring-2 ring-[var(--darkgreen)]" : ""}`}
                      onClick={() => item.date && handleDateSelect(item.date)}
                    >
                      {item.day && (
                        <>
                          <div className="text-right mb-1">
                            <span
                              className={`inline-block rounded-full w-6 h-6 text-center ${isToday ? "bg-blue-500 text-white" : ""}`}
                            >
                              {item.day}
                            </span>
                          </div>
                          <div className="overflow-y-auto max-h-[80px]">
                            {appointmentsForDay.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="text-xs p-1 mb-1 rounded bg-[var(--lightgreen)] truncate"
                                title={`${appointment.name} - ${appointment.complaint}`}
                              >
                                {formatTime(appointment.date)} - {appointment.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {viewMode === "week" && (
            <div>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {generateWeekDays().map((item, index) => {
                  const dayName = item.date.toLocaleDateString("default", { weekday: "short" })
                  const isToday =
                    item.date.getDate() === new Date().getDate() &&
                    item.date.getMonth() === new Date().getMonth() &&
                    item.date.getFullYear() === new Date().getFullYear()

                  return (
                    <div key={index} className={`text-center p-2 ${isToday ? "bg-blue-100 rounded" : ""}`}>
                      <div className="font-semibold">{dayName}</div>
                      <div className={`text-lg ${isToday ? "font-bold" : ""}`}>{item.day}</div>
                    </div>
                  )
                })}
              </div>

              {/* Week View */}
              <div className="grid grid-cols-7 gap-1">
                {generateWeekDays().map((item, index) => {
                  const appointmentsForDay = getAppointmentsForDate(item.date)
                  const isToday =
                    item.date.getDate() === new Date().getDate() &&
                    item.date.getMonth() === new Date().getMonth() &&
                    item.date.getFullYear() === new Date().getFullYear()

                  return (
                    <div
                      key={index}
                      className={`min-h-[300px] border p-2 ${isToday ? "bg-blue-50" : ""}`}
                      onClick={() => handleDateSelect(item.date)}
                    >
                      {appointmentsForDay.length > 0 ? (
                        appointmentsForDay.map((appointment) => (
                          <div key={appointment.id} className="p-2 mb-2 rounded bg-[var(--lightgreen)] text-sm">
                            <div className="font-semibold">{formatTime(appointment.date)}</div>
                            <div>{appointment.name}</div>
                            <div className="text-xs text-gray-600">{appointment.complaint}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 mt-4">No appointments</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {viewMode === "day" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Appointments for{" "}
                {selectedDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}
              </h3>

              <div className="space-y-4">
                {/* Time slots */}
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
                  const timeSlot = new Date(selectedDate)
                  timeSlot.setHours(hour, 0, 0)

                  const appointmentsAtTime = appointments.filter(
                    (appointment) =>
                      appointment.date.getDate() === selectedDate.getDate() &&
                      appointment.date.getMonth() === selectedDate.getMonth() &&
                      appointment.date.getFullYear() === selectedDate.getFullYear() &&
                      appointment.date.getHours() === hour,
                  )

                  return (
                    <div key={hour} className="flex">
                      <div className="w-20 text-right pr-4 font-semibold">
                        {hour % 12 || 12}:00 {hour >= 12 ? "PM" : "AM"}
                      </div>
                      <div className="flex-1 min-h-[60px] border-l-2 border-gray-300 pl-4">
                        {appointmentsAtTime.length > 0 ? (
                          appointmentsAtTime.map((appointment) => (
                            <div key={appointment.id} className="p-3 mb-2 rounded bg-[var(--lightgreen)] relative">
                              <div className="font-semibold">{appointment.name}</div>
                              <div className="text-sm">{formatTime(appointment.date)}</div>
                              <div className="text-sm">{appointment.complaint}</div>
                              <div className="text-xs mt-1">Phone: {appointment.phone}</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400 py-2">Available</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[var(--txt)]">New Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
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

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--txt)]">Date</label>
                <input
                  type="text"
                  value={selectedDate.toLocaleDateString()}
                  readOnly
                  className="block w-full border p-2 rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--txt)]">Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newAppointment.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--txt)]">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={newAppointment.phone}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--txt)]">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                  className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--txt)]">Complaint</label>
                <textarea
                  name="complaint"
                  value={newAppointment.complaint}
                  onChange={handleInputChange}
                  className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded hover:bg-[var(--darkergreen)]"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentCalendar

