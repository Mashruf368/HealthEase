// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css"; // Import the updated CSS

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
//     <div className="user-dashboard-container">
//       <header className="user-dashboard-header">
//         <div className="user-dashboard-header-content">
//           <div className="user-dashboard-logo">
//             <h1>HealthEase</h1>
//             <span className="user-dashboard-logo-subtitle">Patient Portal</span>
//           </div>
//           <button onClick={handleLogout} className="user-dashboard-logout-btn">
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="user-dashboard-main">
//         <div className="user-dashboard-welcome-section">
//           <h2>Welcome to Your Dashboard</h2>
//           <p>
//             Manage your healthcare needs and find the right medical
//             professionals
//           </p>
//         </div>

//         <div className="user-dashboard-actions-container">
//           <div className="user-dashboard-action-card">
//             <span className="user-dashboard-card-icon">🔍</span>
//             <h3 className="user-dashboard-card-title">Find Doctor</h3>
//             <p className="user-dashboard-card-description">
//               Search and book appointments with qualified doctors
//             </p>
//             <button
//               className="user-dashboard-action-btn user-dashboard-find-doctor-btn"
//               onClick={() => handleNavigate("/doctors")}
//             >
//               Find Doctor
//             </button>
//           </div>

//           <div className="user-dashboard-action-card">
//             <span className="user-dashboard-card-icon">👤</span>
//             <h3 className="user-dashboard-card-title">My Profile</h3>
//             <p className="user-dashboard-card-description">
//               View and update your personal information and medical history
//             </p>
//             <button
//               className="user-dashboard-action-btn user-dashboard-profile-btn"
//               onClick={() => handleNavigate("/profile")}
//             >
//               View Profile
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats Section */}
//         <div className="user-dashboard-stats-section">
//           <h3 className="user-dashboard-stats-title">
//             Your Healthcare Summary
//           </h3>
//           <div className="user-dashboard-stats-grid">
//             <div className="user-dashboard-stat-card">
//               <div className="user-dashboard-stat-number">5</div>
//               <div className="user-dashboard-stat-label">
//                 Total Appointments
//               </div>
//             </div>
//             <div className="user-dashboard-stat-card">
//               <div className="user-dashboard-stat-number">2</div>
//               <div className="user-dashboard-stat-label">Upcoming Visits</div>
//             </div>
//             <div className="user-dashboard-stat-card">
//               <div className="user-dashboard-stat-number">3</div>
//               <div className="user-dashboard-stat-label">Doctors Consulted</div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/dash/stats", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

        {/* Dynamic Stats Section */}
        <div className="user-dashboard-stats-section">
          <h3 className="user-dashboard-stats-title">
            Your Healthcare Summary
          </h3>
          {loading ? (
            <p>Loading stats...</p>
          ) : (
            <div className="user-dashboard-stats-grid">
              <div className="user-dashboard-stat-card">
                <div className="user-dashboard-stat-number">
                  {stats.totalAppointments}
                </div>
                <div className="user-dashboard-stat-label">
                  Total Appointments
                </div>
              </div>
              <div className="user-dashboard-stat-card">
                <div className="user-dashboard-stat-number">
                  {stats.upcomingAppointments}
                </div>
                <div className="user-dashboard-stat-label">Upcoming Visits</div>
              </div>
              <div className="user-dashboard-stat-card">
                <div className="user-dashboard-stat-number">
                  {stats.completedAppointments}
                </div>
                <div className="user-dashboard-stat-label">
                  Completed Consultations
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
