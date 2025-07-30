// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const Dashboard = () => {
// //   const navigate = useNavigate();

// //   const handleNavigate = (path) => {
// //     navigate(path);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // clear the token
// //     navigate("/login"); // redirect to login
// //   };

// //   return (
// //     <div style={{ padding: "2rem", textAlign: "center" }}>
// //       <h2>Welcome to the Dashboard</h2>

// //       <div
// //         style={{
// //           marginTop: "2rem",
// //           display: "flex",
// //           justifyContent: "center",
// //           gap: "2rem",
// //         }}
// //       >
// //         <button
// //           onClick={() => handleNavigate("/doctors")}
// //           style={{
// //             padding: "1rem 2rem",
// //             fontSize: "1rem",
// //             cursor: "pointer",
// //             borderRadius: "8px",
// //             backgroundColor: "#007bff",
// //             color: "white",
// //             border: "none",
// //           }}
// //         >
// //           Find Doctor
// //         </button>

// //         <button
// //           onClick={() => handleNavigate("/profile")}
// //           style={{
// //             padding: "1rem 2rem",
// //             fontSize: "1rem",
// //             cursor: "pointer",
// //             borderRadius: "8px",
// //             backgroundColor: "#28a745",
// //             color: "white",
// //             border: "none",
// //           }}
// //         >
// //           Profile
// //         </button>

// //         <button
// //           onClick={handleLogout}
// //           style={{
// //             padding: "1rem 2rem",
// //             fontSize: "1rem",
// //             cursor: "pointer",
// //             borderRadius: "8px",
// //             backgroundColor: "#dc3545",
// //             color: "white",
// //             border: "none",
// //           }}
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css"; // ✅ import the new CSS

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <div className="brand">HealthEase</div>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       <div className="dashboard-content">
//         <div className="dashboard-buttons">
//           <button
//             className="find-doctor"
//             onClick={() => handleNavigate("/doctors")}
//           >
//             Find Doctor
//           </button>
//           <button
//             className="profile"
//             onClick={() => handleNavigate("/profile")}
//           >
//             Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Import the updated CSS

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="user-dashboard-container">
      <header className="user-dashboard-header">
        <div className="user-dashboard-header-content">
          <div className="user-dashboard-logo">
            <h1>HealthEase</h1>
            <span className="user-dashboard-logo-subtitle">Patient Portal</span>
          </div>
          <button onClick={handleLogout} className="user-dashboard-logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="user-dashboard-main">
        <div className="user-dashboard-welcome-section">
          <h2>Welcome to Your Dashboard</h2>
          <p>
            Manage your healthcare needs and find the right medical
            professionals
          </p>
        </div>

        <div className="user-dashboard-actions-container">
          <div className="user-dashboard-action-card">
            <span className="user-dashboard-card-icon">🔍</span>
            <h3 className="user-dashboard-card-title">Find Doctor</h3>
            <p className="user-dashboard-card-description">
              Search and book appointments with qualified doctors
            </p>
            <button
              className="user-dashboard-action-btn user-dashboard-find-doctor-btn"
              onClick={() => handleNavigate("/doctors")}
            >
              Find Doctor
            </button>
          </div>

          <div className="user-dashboard-action-card">
            <span className="user-dashboard-card-icon">👤</span>
            <h3 className="user-dashboard-card-title">My Profile</h3>
            <p className="user-dashboard-card-description">
              View and update your personal information and medical history
            </p>
            <button
              className="user-dashboard-action-btn user-dashboard-profile-btn"
              onClick={() => handleNavigate("/profile")}
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="user-dashboard-stats-section">
          <h3 className="user-dashboard-stats-title">
            Your Healthcare Summary
          </h3>
          <div className="user-dashboard-stats-grid">
            <div className="user-dashboard-stat-card">
              <div className="user-dashboard-stat-number">5</div>
              <div className="user-dashboard-stat-label">
                Total Appointments
              </div>
            </div>
            <div className="user-dashboard-stat-card">
              <div className="user-dashboard-stat-number">2</div>
              <div className="user-dashboard-stat-label">Upcoming Visits</div>
            </div>
            <div className="user-dashboard-stat-card">
              <div className="user-dashboard-stat-number">3</div>
              <div className="user-dashboard-stat-label">Doctors Consulted</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
