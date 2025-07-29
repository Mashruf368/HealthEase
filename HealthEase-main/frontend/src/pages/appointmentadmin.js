// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Admin/AdminAppointment.css";

// const AdminAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/admin/appointments",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setAppointments(data);
//         } else {
//           setMessage(data);
//         }
//       } catch (err) {
//         setMessage("Failed to fetch appointments");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [token, navigate]);

//   const approveAppointment = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/admin/appointments/${id}/approve`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({}),
//         }
//       );

//       const resText = await response.text();
//       if (response.ok) {
//         setMessage("Appointment approved");
//         setAppointments((prev) => prev.filter((a) => a.appointment_id !== id));
//       } else {
//         setMessage(resText);
//       }
//     } catch (err) {
//       setMessage("Error approving appointment");
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToDashboard = () => {
//     navigate("/admin/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="admin-appointments">
//         <header className="appointments-header">
//           <div className="header-content">
//             <div className="logo">
//               <h1>HealthEase</h1>
//               <span className="logo-subtitle">Admin Portal</span>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </header>
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading appointments...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-appointments">
//       {/* Header */}
//       <header className="appointments-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Admin Portal</span>
//           </div>
//           <div className="header-actions">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Dashboard
//             </button>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="appointments-main">
//         <div className="page-header">
//           <h2>Pending Appointments</h2>
//           <p>Manage and review pending patient appointments</p>
//         </div>

//         {message && (
//           <div
//             className={`message ${
//               message.includes("approved") ? "success" : "error"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <div className="appointments-container">
//           {appointments.length === 0 ? (
//             <div className="no-appointments">
//               <div className="no-appointments-icon">📅</div>
//               <h3>No Pending Appointments</h3>
//               <p>
//                 All appointments have been processed or no new appointments are
//                 available.
//               </p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="appointments-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Patient</th>
//                     <th>Doctor</th>
//                     <th>Branch</th>
//                     <th>Details</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments.map((appt) => (
//                     <tr key={appt.appointment_id}>
//                       <td>
//                         <span className="appointment-id">
//                           #{appt.appointment_id}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="appointment-date">{appt.date}</span>
//                       </td>
//                       <td>
//                         <span className="appointment-time">
//                           {appt.scheduled_time || "Not Set"}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="patient-name">
//                           {appt.patient_name}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="doctor-name">{appt.doctor_name}</span>
//                       </td>
//                       <td>
//                         <span className="branch-name">{appt.branch_name}</span>
//                       </td>
//                       <td>
//                         <div className="details-cell">{appt.details}</div>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() =>
//                             navigate(`/admin/doctor/${appt.doctor_id}/schedule`)
//                           }
//                           className="action-btn schedule-btn"
//                         >
//                           <span className="btn-icon">📋</span>
//                           View Schedule
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminAppointments;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin/AdminAppointment.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/appointments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          setMessage(data);
        }
      } catch (err) {
        setMessage("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, navigate]);

  const approveAppointment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/appointments/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({}),
        }
      );

      const resText = await response.text();
      if (response.ok) {
        setMessage("Appointment approved");
        setAppointments((prev) => prev.filter((a) => a.appointment_id !== id));
      } else {
        setMessage(resText);
      }
    } catch (err) {
      setMessage("Error approving appointment");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="admin-appointments">
        <header className="admin-appointments-header">
          <div className="admin-appointments-header-content">
            <div className="admin-appointments-logo">
              <h1>HealthEase</h1>
              <span className="admin-appointments-logo-subtitle">
                Admin Portal
              </span>
            </div>
            <button
              className="admin-appointments-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
        <div className="admin-appointments-loading-container">
          <div className="admin-appointments-loading-spinner"></div>
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-appointments">
      {/* Header */}
      <header className="admin-appointments-header">
        <div className="admin-appointments-header-content">
          <div className="admin-appointments-logo">
            <h1>HealthEase</h1>
            <span className="admin-appointments-logo-subtitle">
              Admin Portal
            </span>
          </div>
          <div className="admin-appointments-header-actions">
            <button
              className="admin-appointments-back-btn"
              onClick={handleBackToDashboard}
            >
              ← Dashboard
            </button>
            <button
              className="admin-appointments-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-appointments-main">
        <div className="admin-appointments-page-header">
          <h2>Pending Appointments</h2>
          <p>Manage and review pending patient appointments</p>
        </div>

        {message && (
          <div
            className={`admin-appointments-message ${
              message.includes("approved")
                ? "admin-appointments-success"
                : "admin-appointments-error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="admin-appointments-container">
          {appointments.length === 0 ? (
            <div className="admin-appointments-no-appointments">
              <div className="admin-appointments-no-appointments-icon">📅</div>
              <h3>No Pending Appointments</h3>
              <p>
                All appointments have been processed or no new appointments are
                available.
              </p>
            </div>
          ) : (
            <div className="admin-appointments-table-container">
              <table className="admin-appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Branch</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.appointment_id}>
                      <td>
                        <span className="admin-appointments-id">
                          #{appt.appointment_id}
                        </span>
                      </td>
                      <td>
                        <span className="admin-appointments-date">
                          {appt.date}
                        </span>
                      </td>
                      <td>
                        <span className="admin-appointments-time">
                          {appt.scheduled_time || "Not Set"}
                        </span>
                      </td>
                      <td>
                        <span className="admin-appointments-patient-name">
                          {appt.patient_name}
                        </span>
                      </td>
                      <td>
                        <span className="admin-appointments-doctor-name">
                          {appt.doctor_name}
                        </span>
                      </td>
                      <td>
                        <span className="admin-appointments-branch-name">
                          {appt.branch_name}
                        </span>
                      </td>
                      <td>
                        <div className="admin-appointments-details-cell">
                          {appt.details}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/admin/doctor/${appt.doctor_id}/schedule`)
                          }
                          className="admin-appointments-action-btn admin-appointments-schedule-btn"
                        >
                          <span className="admin-appointments-btn-icon">
                            📋
                          </span>
                          View Schedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAppointments;
