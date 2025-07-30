// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const DoctorDashboard = () => {
// // //   const navigate = useNavigate();

// // //   const handleViewAppointments = () => {
// // //     navigate("/doctor/appointments");
// // //   };

// // //   return (
// // //     <div style={{ padding: "2rem", textAlign: "center" }}>
// // //       <h2>Doctor Dashboard</h2>
// // //       <button
// // //         onClick={handleViewAppointments}
// // //         style={{
// // //           padding: "1rem 2rem",
// // //           fontSize: "1rem",
// // //           cursor: "pointer",
// // //           borderRadius: "8px",
// // //           backgroundColor: "#007bff",
// // //           color: "white",
// // //           border: "none",
// // //           marginTop: "2rem",
// // //         }}
// // //       >
// // //         View My Appointments
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default DoctorDashboard;
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/Doctor/DoctorDashboard.css"; // Import the CSS file

// // const DoctorDashboard = () => {
// //   const navigate = useNavigate();

// //   const handleViewAppointments = () => {
// //     navigate("/doctor/appointments");
// //   };

// //   return (
// //     <div className="doctordash-container">
// //       <header className="doctordash-header">
// //         <div className="doctordash-header-content">
// //           <div className="doctordash-logo">
// //             <h1>HealthEase</h1>
// //             <span className="doctordash-logo-subtitle">Doctor Portal</span>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="doctordash-main">
// //         <div className="doctordash-welcome-section">
// //           <h2>Welcome to the Doctor Dashboard</h2>
// //           <p>Manage your appointments and patient consultations</p>
// //         </div>

// //         <div className="doctordash-action-container">
// //           <div className="doctordash-appointment-card">
// //             <span className="doctordash-card-icon">📅</span>
// //             <h3 className="doctordash-card-title">My Appointments</h3>
// //             <p className="doctordash-card-description">
// //               View and manage all your scheduled patient appointments
// //             </p>
// //             <button
// //               onClick={handleViewAppointments}
// //               className="doctordash-appointment-btn"
// //             >
// //               View My Appointments
// //             </button>
// //           </div>
// //         </div>

// //         {/* Optional: Quick Stats Section */}
// //         <div className="doctordash-stats-section">
// //           <h3 className="doctordash-stats-title">Today's Overview</h3>
// //           <div className="doctordash-stats-grid">
// //             <div className="doctordash-stat-card">
// //               <div className="doctordash-stat-number">8</div>
// //               <div className="doctordash-stat-label">Appointments Today</div>
// //             </div>
// //             <div className="doctordash-stat-card">
// //               <div className="doctordash-stat-number">3</div>
// //               <div className="doctordash-stat-label">Pending Consultations</div>
// //             </div>
// //             <div className="doctordash-stat-card">
// //               <div className="doctordash-stat-number">12</div>
// //               <div className="doctordash-stat-label">Total Patients</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Optional: Quick Actions Section */}
// //         <div className="doctordash-quick-actions">
// //           <h3 className="doctordash-quick-actions-title">Quick Actions</h3>
// //           <div className="doctordash-quick-actions-grid">
// //             <div className="doctordash-quick-action-card">
// //               <span className="doctordash-quick-action-icon">👥</span>
// //               <h4 className="doctordash-quick-action-title">Patient History</h4>
// //               <p className="doctordash-quick-action-desc">
// //                 View patient medical history and records
// //               </p>
// //             </div>
// //             <div className="doctordash-quick-action-card">
// //               <span className="doctordash-quick-action-icon">💊</span>
// //               <h4 className="doctordash-quick-action-title">Prescriptions</h4>
// //               <p className="doctordash-quick-action-desc">
// //                 Manage and create patient prescriptions
// //               </p>
// //             </div>
// //             <div className="doctordash-quick-action-card">
// //               <span className="doctordash-quick-action-icon">📊</span>
// //               <h4 className="doctordash-quick-action-title">Reports</h4>
// //               <p className="doctordash-quick-action-desc">
// //                 Generate and view medical reports
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default DoctorDashboard;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Doctor/DoctorDashboard.css"; // Import the CSS file

// const DoctorDashboard = () => {
//   const navigate = useNavigate();

//   const handleViewAppointments = () => {
//     navigate("/doctor/appointments");
//   };

//   return (
//     <div className="doctordash-container">
//       <header className="doctordash-header">
//         <div className="doctordash-header-content">
//           <div className="doctordash-logo">
//             <h1>HealthEase</h1>
//             <span className="doctordash-logo-subtitle">Doctor Portal</span>
//           </div>
//         </div>
//       </header>

//       <main className="doctordash-main">
//         <div className="doctordash-welcome-section">
//           <h2>Welcome to the Doctor Dashboard</h2>
//           <p>Manage your appointments and patient consultations</p>
//         </div>

//         <div className="doctordash-action-container">
//           <div className="doctordash-appointment-card">
//             <span className="doctordash-card-icon">📅</span>
//             <h3 className="doctordash-card-title">My Appointments</h3>
//             <p className="doctordash-card-description">
//               View and manage all your scheduled patient appointments
//             </p>
//             <button
//               onClick={handleViewAppointments}
//               className="doctordash-appointment-btn"
//             >
//               View My Appointments
//             </button>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="doctordash-stats-section">
//           <h3 className="doctordash-stats-title">Today's Overview</h3>
//           <div className="doctordash-stats-grid">
//             <div className="doctordash-stat-card">
//               <div className="doctordash-stat-number">8</div>
//               <div className="doctordash-stat-label">Appointments Today</div>
//             </div>
//             <div className="doctordash-stat-card">
//               <div className="doctordash-stat-number">3</div>
//               <div className="doctordash-stat-label">Pending Consultations</div>
//             </div>
//             <div className="doctordash-stat-card">
//               <div className="doctordash-stat-number">12</div>
//               <div className="doctordash-stat-label">Total Patients</div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Doctor/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/dash/doc/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch stats");

        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Could not load dashboard stats." + err);
      }
    };

    fetchStats();
  }, []);

  const handleViewAppointments = () => {
    navigate("/doctor/appointments");
  };

  return (
    <div className="doctordash-container">
      <header className="doctordash-header">
        <div className="doctordash-header-content">
          <div className="doctordash-logo">
            <h1>HealthEase</h1>
            <span className="doctordash-logo-subtitle">Doctor Portal</span>
          </div>
        </div>
      </header>

      <main className="doctordash-main">
        <div className="doctordash-welcome-section">
          <h2>Welcome to the Doctor Dashboard</h2>
          <p>Manage your appointments and patient consultations</p>
        </div>

        <div className="doctordash-action-container">
          <div className="doctordash-appointment-card">
            <span className="doctordash-card-icon">📅</span>
            <h3 className="doctordash-card-title">My Appointments</h3>
            <p className="doctordash-card-description">
              View and manage all your scheduled patient appointments
            </p>
            <button
              onClick={handleViewAppointments}
              className="doctordash-appointment-btn"
            >
              View My Appointments
            </button>
          </div>
        </div>

        <div className="doctordash-stats-section">
          <h3 className="doctordash-stats-title">Today's Overview</h3>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div className="doctordash-stats-grid">
              <div className="doctordash-stat-card">
                <div className="doctordash-stat-number">
                  {stats.pendingAppointments}
                </div>
                <div className="doctordash-stat-label">Appointments Today</div>
              </div>
              <div className="doctordash-stat-card">
                <div className="doctordash-stat-number">
                  {stats.completedAppointments}
                </div>
                <div className="doctordash-stat-label">
                  Completed Consultations
                </div>
              </div>
              <div className="doctordash-stat-card">
                <div className="doctordash-stat-number">
                  {stats.totalAppointments}
                </div>
                <div className="doctordash-stat-label">Total Appointments</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
