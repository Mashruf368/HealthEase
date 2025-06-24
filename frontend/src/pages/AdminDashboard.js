import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleViewAppointments = () => {
    navigate("/admin/appointments");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to the Admin Dashboard</h2>

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
        View Appointments
      </button>
    </div>
  );
};

export default AdminDashboard;
