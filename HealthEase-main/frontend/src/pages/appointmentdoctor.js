// // --- DoctorAppointments.js ---
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Doctor/DoctorAppointment.css";
// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login/doctor");
//       return;
//     }

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/doctor/appointments",
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

//   if (loading)
//     return <p style={{ padding: "2rem" }}>Loading appointments...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>My Appointments</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}

//       {appointments.length === 0 ? (
//         <p>No appointments found</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Scheduled Time</th>
//               <th>Patient</th>
//               <th>Details</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.appointment_id}>
//                 <td>{appt.appointment_id}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.scheduled_time}</td>
//                 <td>{appt.patient_name}</td>
//                 <td>{appt.details}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/doctor/appointments/${appt.appointment_id}/prescribe`
//                       )
//                     }
//                     style={{
//                       padding: "0.5rem",
//                       backgroundColor: "#007bff",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Write Prescription
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default DoctorAppointments;
// --- DoctorAppointments.js ---
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Doctor/DoctorAppointment.css";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/doctor");
  };

  const handleBack = () => {
    navigate("/doctor/dashboard");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login/doctor");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/doctor/appointments",
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

  if (loading) {
    return (
      <div className="doctor-appointments">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-appointments">
      {/* Header */}
      <header className="appointments-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <div className="logo-subtitle">Doctor Portal</div>
          </div>
          <div className="header-actions">
            <button className="back-btn" onClick={handleBack}>
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
          <h2>My Appointments</h2>
          <p>Manage your scheduled patient appointments</p>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`message ${
              message.includes("Failed") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}

        {/* Appointments Container */}
        <div className="appointments-container">
          {appointments.length === 0 ? (
            <div className="no-appointments">
              <div className="no-appointments-icon">📅</div>
              <h3>No Appointments Scheduled</h3>
              <p>You don't have any appointments scheduled at the moment.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Scheduled Time</th>
                    <th>Patient</th>
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
                        <span className="appointment-date">
                          {new Date(appt.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td>
                        <span className="appointment-time">
                          {appt.scheduled_time}
                        </span>
                      </td>
                      <td>
                        <span className="patient-name">
                          {appt.patient_name}
                        </span>
                      </td>
                      <td>
                        <div className="details-cell">
                          {appt.details || "No additional details"}
                        </div>
                      </td>
                      <td>
                        <button
                          className="prescription-btn"
                          onClick={() =>
                            navigate(
                              `/doctor/appointments/${appt.appointment_id}/prescribe`
                            )
                          }
                        >
                          <span className="btn-icon">📝</span>
                          Write Prescription
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

export default DoctorAppointments;
