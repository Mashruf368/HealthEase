// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     todayAppointments: 0,
//     totalAppointments: 0,
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3001/admin/stats", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: token, // Changed from Authorization to token
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setStats(data);
//         } else {
//           setError(data.error || "Failed to fetch stats.");
//         }
//       } catch (err) {
//         setError("Something went wrong while fetching stats.");
//         console.error(err);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleViewAppointments = () => {
//     navigate("/admin/appointments");
//   };

//   const handleViewPrescriptions = () => {
//     navigate("/admin/prescriptions");
//   };

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h2>Welcome to the Admin Dashboard</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
//         <p style={{ fontSize: "1.2rem" }}>
//           <strong>Today's Appointments:</strong> {stats.todayAppointments}
//         </p>
//         <p style={{ fontSize: "1.2rem" }}>
//           <strong>Total Appointments:</strong> {stats.totalAppointments}
//         </p>
//       </div>

//       <button
//         onClick={handleViewAppointments}
//         style={{
//           padding: "1rem 2rem",
//           fontSize: "1rem",
//           cursor: "pointer",
//           borderRadius: "8px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           marginTop: "2rem",
//           marginRight: "1rem",
//         }}
//       >
//         View Appointments
//       </button>

//       <button
//         onClick={handleViewPrescriptions}
//         style={{
//           padding: "1rem 2rem",
//           fontSize: "1rem",
//           cursor: "pointer",
//           borderRadius: "8px",
//           backgroundColor: "#28a745",
//           color: "white",
//           border: "none",
//           marginTop: "2rem",
//         }}
//       >
//         View Prescriptions
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admindashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalAppointments: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/admin/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStats(data);
        } else {
          setError(data.error || "Failed to fetch stats.");
        }
      } catch (err) {
        setError("Something went wrong while fetching stats.");
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const handleViewAppointments = () => {
    navigate("/admin/appointments");
  };

  const handleViewPrescriptions = () => {
    navigate("/admin/prescriptions");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <span className="logo-subtitle">Admin Portal</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Manage your healthcare system efficiently</p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={handleViewAppointments}
            className="action-btn appointments-btn"
          >
            <div className="btn-icon">📅</div>
            <div className="btn-content">
              <h3>View Appointments</h3>
              <p>Manage patient appointments</p>
            </div>
          </button>

          <button
            onClick={handleViewPrescriptions}
            className="action-btn prescriptions-btn"
          >
            <div className="btn-icon">💊</div>
            <div className="btn-content">
              <h3>View Prescriptions</h3>
              <p>Manage medical prescriptions</p>
            </div>
          </button>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <h3>Today's Overview</h3>
          <div className="stats-grid">
            <div className="stat-card today-appointments">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h4>Today's Appointments</h4>
                <span className="stat-number">{stats.todayAppointments}</span>
              </div>
            </div>

            <div className="stat-card total-appointments">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h4>Total Appointments</h4>
                <span className="stat-number">{stats.totalAppointments}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
