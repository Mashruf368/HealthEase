// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const DoctorSchedulePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [appointments, setAppointments] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null); // to track which row is being edited
//   const [editedTime, setEditedTime] = useState(""); // holds new time input

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const res1 = await fetch(
//           `http://localhost:3001/doctor/${id}/schedule`,
//           {
//             headers: { token },
//           }
//         );

//         if (!res1.ok) throw new Error("Failed to fetch appointments");
//         const appointmentsData = await res1.json();
//         setAppointments(appointmentsData);

//         const res2 = await fetch(`http://localhost:3001/doctors/${id}`, {
//           headers: { token },
//         });

//         if (!res2.ok) throw new Error("Failed to fetch schedule");
//         const scheduleData = await res2.json();
//         setSchedule(scheduleData.schedule);
//       } catch (err) {
//         setMessage(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, navigate]);

//   const formatTime = (time) => {
//     if (!time) return "";
//     const date = new Date(`1970-01-01T${time}`);
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const handleApprove = async (appointmentId) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(
//         `http://localhost:3001/admin/appointments/${appointmentId}/approve`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             token,
//           },
//           body: JSON.stringify({ scheduled_time: editedTime }),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to approve appointment");

//       const updated = appointments.map((appt) =>
//         appt.appointment_id === appointmentId
//           ? {
//               ...appt,
//               status: "A",
//               scheduled_time: editedTime,
//             }
//           : appt
//       );
//       setAppointments(updated);
//       setEditingId(null);
//       setEditedTime("");
//     } catch (err) {
//       alert("Error approving appointment: " + err.message);
//     }
//   };

//   const handleCancel = (appointmentId) => {
//     // Future: You can implement cancel route here
//     alert("Cancel functionality not implemented yet.");
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Doctor Schedule & Appointments</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <h3>Appointments</h3>
//           {appointments.length === 0 ? (
//             <p>No appointments found.</p>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Patient</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.map((appt) => (
//                   <tr key={appt.appointment_id}>
//                     <td>{appt.appointment_id}</td>
//                     <td>{appt.patient_name}</td>
//                     <td>
//                       {new Date(appt.date).toISOString().slice(0, 10)} (
//                       {new Date(appt.date).toLocaleDateString("en-US", {
//                         weekday: "long",
//                       })}
//                       )
//                     </td>

//                     <td>{appt.scheduled_time || "Not Set"}</td>
//                     <td>{appt.status}</td>
//                     <td>
//                       {appt.status === "P" &&
//                       editingId !== appt.appointment_id ? (
//                         <button
//                           onClick={() => {
//                             setEditingId(appt.appointment_id);
//                             setEditedTime(appt.scheduled_time || "");
//                           }}
//                         >
//                           Approve
//                         </button>
//                       ) : appt.status === "P" &&
//                         editingId === appt.appointment_id ? (
//                         <div>
//                           <input
//                             type="time"
//                             value={editedTime}
//                             onChange={(e) => setEditedTime(e.target.value)}
//                           />
//                           <button
//                             onClick={() => handleApprove(appt.appointment_id)}
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             onClick={() => {
//                               setEditingId(null);
//                               setEditedTime("");
//                             }}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : appt.status === "A" ? (
//                         <button
//                           onClick={() => handleCancel(appt.appointment_id)}
//                         >
//                           Cancel
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           <h3 style={{ marginTop: "2rem" }}>Weekly Schedule</h3>
//           <ul>
//             {schedule.map((s, index) => (
//               <li key={index}>
//                 {s.day_of_week} - {s.name} ({formatTime(s.start_time)} -{" "}
//                 {formatTime(s.end_time)})
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default DoctorSchedulePage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin/DoctorSchedulePage.css";

const DoctorSchedulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTime, setEditedTime] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `http://localhost:3001/doctor/${id}/schedule`,
          {
            headers: { token },
          }
        );

        if (!res1.ok) throw new Error("Failed to fetch appointments");
        const appointmentsData = await res1.json();
        setAppointments(appointmentsData);

        const res2 = await fetch(`http://localhost:3001/doctors/${id}`, {
          headers: { token },
        });

        if (!res2.ok) throw new Error("Failed to fetch schedule");
        const scheduleData = await res2.json();
        setSchedule(scheduleData.schedule);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleApprove = async (appointmentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:3001/admin/appointments/${appointmentId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ scheduled_time: editedTime }),
        }
      );

      if (!res.ok) throw new Error("Failed to approve appointment");

      const updated = appointments.map((appt) =>
        appt.appointment_id === appointmentId
          ? {
              ...appt,
              status: "A",
              scheduled_time: editedTime,
            }
          : appt
      );
      setAppointments(updated);
      setEditingId(null);
      setEditedTime("");
      setMessage("Appointment approved successfully!");
    } catch (err) {
      setMessage("Error approving appointment: " + err.message);
    }
  };

  const handleCancel = (appointmentId) => {
    setMessage("Cancel functionality not implemented yet.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToAppointments = () => {
    navigate("/admin/appointments");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "P":
        return <span className="status-badge pending">Pending</span>;
      case "A":
        return <span className="status-badge approved">Approved</span>;
      case "C":
        return <span className="status-badge cancelled">Cancelled</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="doctor-schedule">
        <header className="schedule-header">
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
          <p>Loading doctor schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-schedule">
      {/* Header */}
      <header className="schedule-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <span className="logo-subtitle">Admin Portal</span>
          </div>
          <div className="header-actions">
            <button className="back-btn" onClick={handleBackToAppointments}>
              ← Appointments
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="schedule-main">
        <div className="page-header">
          <h2>Doctor Schedule & Appointments</h2>
          <p>Manage doctor appointments and view weekly schedule</p>
        </div>

        {message && (
          <div
            className={`message ${
              message.includes("successfully") || message.includes("approved")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        {/* Appointments Section */}
        <section className="appointments-section">
          <div className="section-header">
            <h3>Appointments</h3>
            <span className="appointments-count">
              {appointments.length} total
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="no-appointments">
              <div className="no-appointments-icon">📅</div>
              <h4>No Appointments Found</h4>
              <p>This doctor currently has no scheduled appointments.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr
                      key={appt.appointment_id}
                      className={`row-${appt.status.toLowerCase()}`}
                    >
                      <td>
                        <span className="appointment-id">
                          #{appt.appointment_id}
                        </span>
                      </td>
                      <td>
                        <span className="patient-name">
                          {appt.patient_name}
                        </span>
                      </td>
                      <td>
                        <div className="date-info">
                          <span className="date-value">
                            {new Date(appt.date).toISOString().slice(0, 10)}
                          </span>
                          <span className="day-name">
                            {new Date(appt.date).toLocaleDateString("en-US", {
                              weekday: "long",
                            })}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="appointment-time">
                          {appt.scheduled_time || "Not Set"}
                        </span>
                      </td>
                      <td>{getStatusBadge(appt.status)}</td>
                      <td>
                        {appt.status === "P" &&
                        editingId !== appt.appointment_id ? (
                          <button
                            className="action-btn approve-btn"
                            onClick={() => {
                              setEditingId(appt.appointment_id);
                              setEditedTime(appt.scheduled_time || "");
                            }}
                          >
                            <span className="btn-icon">✓</span>
                            Approve
                          </button>
                        ) : appt.status === "P" &&
                          editingId === appt.appointment_id ? (
                          <div className="time-editor">
                            <input
                              type="time"
                              value={editedTime}
                              onChange={(e) => setEditedTime(e.target.value)}
                              className="time-input"
                            />
                            <div className="editor-buttons">
                              <button
                                className="confirm-btn"
                                onClick={() =>
                                  handleApprove(appt.appointment_id)
                                }
                              >
                                Confirm
                              </button>
                              <button
                                className="cancel-btn"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditedTime("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : appt.status === "A" ? (
                          <button
                            className="action-btn cancel-btn"
                            onClick={() => handleCancel(appt.appointment_id)}
                          >
                            <span className="btn-icon">✕</span>
                            Cancel
                          </button>
                        ) : (
                          <span className="no-action">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Schedule Section */}
        <section className="schedule-section">
          <div className="section-header">
            <h3>Weekly Schedule</h3>
            <span className="schedule-count">{schedule.length} time slots</span>
          </div>

          {schedule.length === 0 ? (
            <div className="no-schedule">
              <div className="no-schedule-icon">📋</div>
              <h4>No Schedule Available</h4>
              <p>Weekly schedule has not been set for this doctor.</p>
            </div>
          ) : (
            <div className="schedule-grid">
              {schedule.map((s, index) => (
                <div key={index} className="schedule-card">
                  <div className="schedule-day">{s.day_of_week}</div>
                  <div className="schedule-name">{s.name}</div>
                  <div className="schedule-time">
                    {formatTime(s.start_time)} - {formatTime(s.end_time)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DoctorSchedulePage;
