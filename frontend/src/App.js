import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/dashboard";
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

        {/* Add more protected routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
