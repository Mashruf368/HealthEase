import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear the token
    navigate("/login"); // redirect to login
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to the Dashboard</h2>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <button
          onClick={() => handleNavigate("/doctors")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Find Doctor
        </button>

        <button
          onClick={() => handleNavigate("/profile")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
          }}
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
