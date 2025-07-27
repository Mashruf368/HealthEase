import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleViewAppointments = () => {
    navigate("/doctor/appointments");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Doctor Dashboard</h2>
      <button
        onClick={handleViewAppointments}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          marginTop: "2rem",
        }}
      >
        View My Appointments
      </button>
    </div>
  );
};

export default DoctorDashboard;
