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
import DoctorDashboard from "./pages/DoctorDashboard";
import PrivateRoute from "./component/privateroute";
import PrivateRouteAdmin from "./component/privaterouteadmin";
import PrivateRouteDoctor from "./component/privateroutedoctor";
import DoctorAppointment from "./pages/appointmentdoctor";
import Profile from "./pages/Patient/profile";
import WritePrescription from "./pages/Prescription/prescription";
import Patviewpresc from "./pages/Patient/PrescriptionDetails";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import AdminPrescriptions from "./pages/admin/adminprescription";
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
        <Route path="/admin/prescriptions" element={<AdminPrescriptions />} />

        <Route
          path="/admin/doctor/:id/schedule"
          element={<DoctorSchedulePage />}
        />

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
            <PrivateRouteAdmin>
              <AdminDashboard />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <PrivateRouteAdmin>
              <AdminAppointments />
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRouteDoctor>
              <DoctorDashboard />
            </PrivateRouteDoctor>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <PrivateRouteDoctor>
              <DoctorAppointment />
            </PrivateRouteDoctor>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Add more protected routes here as needed */}

        <Route
          path="/doctor/appointments/:id/prescribe"
          element={
            <PrivateRouteDoctor>
              <WritePrescription />
            </PrivateRouteDoctor>
          }
        />
        <Route
          path="/prescription/:id"
          element={
            <PrivateRoute>
              <Patviewpresc />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
