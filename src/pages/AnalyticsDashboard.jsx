"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaUserInjured, FaCalendarCheck, FaMoneyBillWave, FaSpinner } from "react-icons/fa"

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalPatients: 0,
    newPatientsThisMonth: 0,
    appointmentsToday: 0,
    appointmentsThisMonth: 0,
    revenueThisMonth: 0,
    revenueLastMonth: 0,
  })
  const [timeFrame, setTimeFrame] = useState("month")
  const [chartData, setChartData] = useState({
    appointments: [],
    revenue: [],
  })

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch this data from your API
        // For now, we'll simulate a delay and use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockStats = {
          totalPatients: 342,
          newPatientsThisMonth: 28,
          appointmentsToday: 12,
          appointmentsThisMonth: 156,
          revenueThisMonth: 125000,
          revenueLastMonth: 118000,
        }

        const mockChartData = {
          appointments: [
            { date: "Jan", count: 120 },
            { date: "Feb", count: 145 },
            { date: "Mar", count: 132 },
            { date: "Apr", count: 156 },
            { date: "May", count: 142 },
            { date: "Jun", count: 158 },
          ],
          revenue: [
            { date: "Jan", amount: 95000 },
            { date: "Feb", amount: 102000 },
            { date: "Mar", amount: 110000 },
            { date: "Apr", amount: 105000 },
            { date: "May", amount: 118000 },
            { date: "Jun", amount: 125000 },
          ],
        }

        setStats(mockStats)
        setChartData(mockChartData)
        setLoading(false)
      } catch (err) {
        setError("Failed to load analytics data")
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeFrame])

  // Calculate growth percentages
  const patientGrowth = (
    (stats.newPatientsThisMonth / (stats.totalPatients - stats.newPatientsThisMonth)) *
    100
  ).toFixed(1)
  const revenueGrowth = (((stats.revenueThisMonth - stats.revenueLastMonth) / stats.revenueLastMonth) * 100).toFixed(1)

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
          <h1 className="text-3xl font-bold text-[var(--txt)]">Analytics Dashboard</h1>
          <Link
            to="/doctordashboard"
            className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Time frame selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setTimeFrame("week")}
              className={`px-4 py-2 rounded-lg ${
                timeFrame === "week"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeFrame("month")}
              className={`px-4 py-2 rounded-lg ${
                timeFrame === "month"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeFrame("quarter")}
              className={`px-4 py-2 rounded-lg ${
                timeFrame === "quarter"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setTimeFrame("year")}
              className={`px-4 py-2 rounded-lg ${
                timeFrame === "year"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Patients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <h3 className="text-3xl font-bold">{stats.totalPatients}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUserInjured className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className={`font-semibold ${Number(patientGrowth) >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {patientGrowth}% {Number(patientGrowth) >= 0 ? "↑" : "↓"}
                </span>
                <span className="text-gray-500"> from last month</span>
              </p>
            </div>
          </div>

          {/* New Patients */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">New Patients</p>
                <h3 className="text-3xl font-bold">{stats.newPatientsThisMonth}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUserInjured className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Appointments</p>
                <h3 className="text-3xl font-bold">{stats.appointmentsToday}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCalendarCheck className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Today</p>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <h3 className="text-3xl font-bold">₹{stats.revenueThisMonth.toLocaleString()}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-yellow-500 text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className={`font-semibold ${Number(revenueGrowth) >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {revenueGrowth}% {Number(revenueGrowth) >= 0 ? "↑" : "↓"}
                </span>
                <span className="text-gray-500"> from last month</span>
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Appointments</h3>
            <div className="h-64 flex items-end justify-between">
              {chartData.appointments.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-[var(--darkgreen)] rounded-t w-12"
                    style={{ height: `${(item.count / 200) * 100}%` }}
                  ></div>
                  <p className="text-xs mt-2">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Revenue</h3>
            <div className="h-64 flex items-end justify-between">
              {chartData.revenue.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-[var(--darkgreen)] rounded-t w-12"
                    style={{ height: `${(item.amount / 150000) * 100}%` }}
                  ></div>
                  <p className="text-xs mt-2">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Most Common Treatments */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Most Common Treatments</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Treatment</th>
                  <th className="p-2 text-left">Count</th>
                  <th className="p-2 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-t">Root Canal Treatment</td>
                  <td className="p-2 border-t">42</td>
                  <td className="p-2 border-t">₹42,000</td>
                </tr>
                <tr>
                  <td className="p-2 border-t">Scaling</td>
                  <td className="p-2 border-t">38</td>
                  <td className="p-2 border-t">₹19,000</td>
                </tr>
                <tr>
                  <td className="p-2 border-t">Cavity Filling</td>
                  <td className="p-2 border-t">35</td>
                  <td className="p-2 border-t">₹17,500</td>
                </tr>
                <tr>
                  <td className="p-2 border-t">Tooth Extraction</td>
                  <td className="p-2 border-t">28</td>
                  <td className="p-2 border-t">₹14,000</td>
                </tr>
                <tr>
                  <td className="p-2 border-t">Orthodontic Treatment</td>
                  <td className="p-2 border-t">15</td>
                  <td className="p-2 border-t">₹75,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard


