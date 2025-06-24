import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/dashboard";
import Doctors from "./pages/doctors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        {/* You can add <Route path="/signup" element={<Signup />} /> later */}
      </Routes>
    </Router>
  );
}

export default App;
