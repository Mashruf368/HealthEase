// import React, { useEffect, useState } from "react";
// //import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";

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
//           body: JSON.stringify({}), // optionally send new time
//         }
//       );

//       const resText = await response.text();
//       if (response.ok) {
//         setMessage("Appointment approved");
//         // Remove approved appointment from list
//         setAppointments((prev) => prev.filter((a) => a.appointment_id !== id));
//       } else {
//         setMessage(resText);
//       }
//     } catch (err) {
//       setMessage("Error approving appointment");
//       console.error(err);
//     }
//   };

//   if (loading)
//     return <p style={{ padding: "2rem" }}>Loading appointments...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Pending Appointments</h2>
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       {appointments.length === 0 ? (
//         <p>No pending appointments</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Branch</th>
//               <th>Details</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.appointment_id}>
//                 <td>{appt.appointment_id}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.scheduled_time || "Not Set"}</td>
//                 <td>{appt.patient_name}</td>
//                 <td>{appt.doctor_name}</td>
//                 <td>{appt.branch_name}</td>
//                 <td>{appt.details}</td>
//                 {
//                   /* <td>
//                   <button
//   onClick={() => approveAppointment(appt.appointment_id)}
//   disabled={message === "Appointment approved"} // optional
//   style={{
//     padding: "0.5rem",
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     opacity: message === "Appointment approved" ? 0.6 : 1,
//   }}
// >
//   Approve
// </button>
//                 </td> */
//                   <td>
//                     <button
//                       onClick={() =>
//                         navigate(`/admin/doctor/${appt.doctor_id}/schedule`)
//                       }
//                       style={{
//                         padding: "0.5rem",
//                         backgroundColor: "#007bff",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       View Doctor Schedule
//                     </button>
//                   </td>
//                 }
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
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
        <header className="appointments-header">
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
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-appointments">
      {/* Header */}
      <header className="appointments-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <span className="logo-subtitle">Admin Portal</span>
          </div>
          <div className="header-actions">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Dashboard
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="appointments-main">
        <div className="page-header">
          <h2>Pending Appointments</h2>
          <p>Manage and review pending patient appointments</p>
        </div>

        {message && (
          <div
            className={`message ${
              message.includes("approved") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="appointments-container">
          {appointments.length === 0 ? (
            <div className="no-appointments">
              <div className="no-appointments-icon">📅</div>
              <h3>No Pending Appointments</h3>
              <p>
                All appointments have been processed or no new appointments are
                available.
              </p>
            </div>
          ) : (
            <div className="table-container">
              <table className="appointments-table">
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
                        <span className="appointment-id">
                          #{appt.appointment_id}
                        </span>
                      </td>
                      <td>
                        <span className="appointment-date">{appt.date}</span>
                      </td>
                      <td>
                        <span className="appointment-time">
                          {appt.scheduled_time || "Not Set"}
                        </span>
                      </td>
                      <td>
                        <span className="patient-name">
                          {appt.patient_name}
                        </span>
                      </td>
                      <td>
                        <span className="doctor-name">{appt.doctor_name}</span>
                      </td>
                      <td>
                        <span className="branch-name">{appt.branch_name}</span>
                      </td>
                      <td>
                        <div className="details-cell">{appt.details}</div>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/admin/doctor/${appt.doctor_id}/schedule`)
                          }
                          className="action-btn schedule-btn"
                        >
                          <span className="btn-icon">📋</span>
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
