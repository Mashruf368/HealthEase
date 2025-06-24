import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import LoginDoctor from "./pages/LoginDoctor";
import Signup from "./pages/signup";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/appointmentadmin";
import Doctors from "./pages/doctors";
import AppointmentPage from "./pages/appointment";
import PrivateRoute from "./component/privateroute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/doctor" element={<LoginDoctor />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/:id/appointment"
          element={
            <PrivateRoute>
              <AppointmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <PrivateRoute>
              <AdminAppointments />
            </PrivateRoute>
          }
        />

        {/* Add more protected routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
