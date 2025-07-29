// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // //import "../styles/admindashboard.css";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();

// //   const [stats, setStats] = useState({
// //     todayAppointments: 0,
// //     totalAppointments: 0,
// //   });
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const response = await fetch("http://localhost:3001/admin/stats", {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         });

// //         const data = await response.json();
// //         if (response.ok) {
// //           setStats(data);
// //         } else {
// //           setError(data.error || "Failed to fetch stats.");
// //         }
// //       } catch (err) {
// //         setError("Something went wrong while fetching stats.");
// //         console.error(err);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   const handleViewAppointments = () => {
// //     navigate("/admin/appointments");
// //   };

// //   const handleViewPrescriptions = () => {
// //     navigate("/admin/prescriptions");
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="admin-dashboard">
// //       {/* Header */}
// //       <header className="dashboard-header">
// //         <div className="header-content">
// //           <div className="logo">
// //             <h1>HealthEase</h1>
// //             <span className="logo-subtitle">Admin Portal</span>
// //           </div>
// //           <button className="logout-btn" onClick={handleLogout}>
// //             Logout
// //           </button>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="dashboard-main">
// //         <div className="welcome-section">
// //           <h2>Welcome to the Admin Dashboard</h2>
// //           <p>Manage your healthcare system efficiently</p>
// //         </div>

// //         {error && (
// //           <div className="error-message">
// //             <p>{error}</p>
// //           </div>
// //         )}

// //         {/* Action Buttons */}
// //         <div className="action-buttons">
// //           <button
// //             onClick={handleViewAppointments}
// //             className="action-btn appointments-btn"
// //           >
// //             <div className="btn-icon">📅</div>
// //             <div className="btn-content">
// //               <h3>View Appointments</h3>
// //               <p>Manage patient appointments</p>
// //             </div>
// //           </button>

// //           <button
// //             onClick={handleViewPrescriptions}
// //             className="action-btn prescriptions-btn"
// //           >
// //             <div className="btn-icon">💊</div>
// //             <div className="btn-content">
// //               <h3>View Prescriptions</h3>
// //               <p>Manage medical prescriptions</p>
// //             </div>
// //           </button>
// //         </div>

// //         {/* Statistics */}
// //         <div className="stats-section">
// //           <h3>Today's Overview</h3>
// //           <div className="stats-grid">
// //             <div className="stat-card today-appointments">
// //               <div className="stat-icon">📊</div>
// //               <div className="stat-content">
// //                 <h4>Today's Appointments</h4>
// //                 <span className="stat-number">{stats.todayAppointments}</span>
// //               </div>
// //             </div>

// //             <div className="stat-card total-appointments">
// //               <div className="stat-icon">📈</div>
// //               <div className="stat-content">
// //                 <h4>Total Appointments</h4>
// //                 <span className="stat-number">{stats.totalAppointments}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
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
//             token: token,
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

//   const handleViewPending = () => {
//     navigate("/admin/pending");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <header className="dashboard-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Admin Portal</span>
//           </div>
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="dashboard-main">
//         <div className="welcome-section">
//           <h2>Welcome to the Admin Dashboard</h2>
//           <p>Manage your healthcare system efficiently</p>
//         </div>

//         {error && (
//           <div className="error-message">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button
//             onClick={handleViewAppointments}
//             className="action-btn appointments-btn"
//           >
//             <div className="btn-icon">📅</div>
//             <div className="btn-content">
//               <h3>View Appointments</h3>
//               <p>Manage patient appointments</p>
//             </div>
//           </button>

//           <button
//             onClick={handleViewPrescriptions}
//             className="action-btn prescriptions-btn"
//           >
//             <div className="btn-icon">💊</div>
//             <div className="btn-content">
//               <h3>View Prescriptions</h3>
//               <p>Manage medical prescriptions</p>
//             </div>
//           </button>

//           <button
//             onClick={handleViewPending}
//             className="action-btn pending-btn"
//           >
//             <div className="btn-icon">📝</div>
//             <div className="btn-content">
//               <h3>Pending Registrations</h3>
//               <p>Review admin registration requests</p>
//             </div>
//           </button>
//         </div>

//         {/* Statistics */}
//         <div className="stats-section">
//           <h3>Today's Overview</h3>
//           <div className="stats-grid">
//             <div className="stat-card today-appointments">
//               <div className="stat-icon">📊</div>
//               <div className="stat-content">
//                 <h4>Today's Appointments</h4>
//                 <span className="stat-number">{stats.todayAppointments}</span>
//               </div>
//             </div>

//             <div className="stat-card total-appointments">
//               <div className="stat-icon">📈</div>
//               <div className="stat-content">
//                 <h4>Total Appointments</h4>
//                 <span className="stat-number">{stats.totalAppointments}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
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

  const handleViewPending = () => {
    navigate("/admin/pending");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h1>HealthEase</h1>
            <span className="admin-subtitle">Admin Portal</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="admin-dashboard-main">
        <div className="admin-welcome">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Manage your healthcare system efficiently</p>
        </div>

        {error && (
          <div className="admin-error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="admin-action-buttons">
          <button
            onClick={handleViewAppointments}
            className="admin-btn admin-appointments-btn"
          >
            <div className="admin-btn-icon">📅</div>
            <div className="admin-btn-text">
              <h3>View Appointments</h3>
              <p>Manage patient appointments</p>
            </div>
          </button>

          <button
            onClick={handleViewPrescriptions}
            className="admin-btn admin-prescriptions-btn"
          >
            <div className="admin-btn-icon">💊</div>
            <div className="admin-btn-text">
              <h3>View Prescriptions</h3>
              <p>Manage medical prescriptions</p>
            </div>
          </button>

          <button
            onClick={handleViewPending}
            className="admin-btn admin-pending-btn"
          >
            <div className="admin-btn-icon">📝</div>
            <div className="admin-btn-text">
              <h3>Pending Registrations</h3>
              <p>Review admin registration requests</p>
            </div>
          </button>
        </div>

        <div className="admin-stats-section">
          <h3>Today's Overview</h3>
          <div className="admin-stats-grid">
            <div className="admin-stat-card admin-stat-blue">
              <div className="admin-stat-icon">📊</div>
              <div className="admin-stat-text">
                <h4>Today's Appointments</h4>
                <span>{stats.todayAppointments}</span>
              </div>
            </div>
            <div className="admin-stat-card admin-stat-green">
              <div className="admin-stat-icon">📈</div>
              <div className="admin-stat-text">
                <h4>Total Appointments</h4>
                <span>{stats.totalAppointments}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
