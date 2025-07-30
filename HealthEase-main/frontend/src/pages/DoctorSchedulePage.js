// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/Admin/DoctorSchedulePage.css";

// const DoctorSchedulePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [appointments, setAppointments] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editedTime, setEditedTime] = useState("");

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
//       setMessage("Appointment approved successfully!");
//     } catch (err) {
//       setMessage("Error approving appointment: " + err.message);
//     }
//   };

//   const handleCancel = (appointmentId) => {
//     setMessage("Cancel functionality not implemented yet.");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToAppointments = () => {
//     navigate("/admin/appointments");
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "P":
//         return <span className="status-badge pending">Pending</span>;
//       case "A":
//         return <span className="status-badge approved">Approved</span>;
//       case "C":
//         return <span className="status-badge cancelled">Cancelled</span>;
//       default:
//         return <span className="status-badge unknown">Unknown</span>;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="doctor-schedule">
//         <header className="schedule-header">
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
//           <p>Loading doctor schedule...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-schedule">
//       {/* Header */}
//       <header className="schedule-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Admin Portal</span>
//           </div>
//           <div className="header-actions">
//             <button className="back-btn" onClick={handleBackToAppointments}>
//               ← Appointments
//             </button>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="schedule-main">
//         <div className="page-header">
//           <h2>Doctor Schedule & Appointments</h2>
//           <p>Manage doctor appointments and view weekly schedule</p>
//         </div>

//         {message && (
//           <div
//             className={`message ${
//               message.includes("successfully") || message.includes("approved")
//                 ? "success"
//                 : "error"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {/* Appointments Section */}
//         <section className="appointments-section">
//           <div className="section-header">
//             <h3>Appointments</h3>
//             <span className="appointments-count">
//               {appointments.length} total
//             </span>
//           </div>

//           {appointments.length === 0 ? (
//             <div className="no-appointments">
//               <div className="no-appointments-icon">📅</div>
//               <h4>No Appointments Found</h4>
//               <p>This doctor currently has no scheduled appointments.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="appointments-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Patient</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments.map((appt) => (
//                     <tr
//                       key={appt.appointment_id}
//                       className={`row-${appt.status.toLowerCase()}`}
//                     >
//                       <td>
//                         <span className="appointment-id">
//                           #{appt.appointment_id}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="patient-name">
//                           {appt.patient_name}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="date-info">
//                           <span className="date-value">
//                             {new Date(appt.date).toISOString().slice(0, 10)}
//                           </span>
//                           <span className="day-name">
//                             {new Date(appt.date).toLocaleDateString("en-US", {
//                               weekday: "long",
//                             })}
//                           </span>
//                         </div>
//                       </td>
//                       <td>
//                         <span className="appointment-time">
//                           {appt.scheduled_time || "Not Set"}
//                         </span>
//                       </td>
//                       <td>{getStatusBadge(appt.status)}</td>
//                       <td>
//                         {appt.status === "P" &&
//                         editingId !== appt.appointment_id ? (
//                           <button
//                             className="action-btn approve-btn"
//                             onClick={() => {
//                               setEditingId(appt.appointment_id);
//                               setEditedTime(appt.scheduled_time || "");
//                             }}
//                           >
//                             <span className="btn-icon">✓</span>
//                             Approve
//                           </button>
//                         ) : appt.status === "P" &&
//                           editingId === appt.appointment_id ? (
//                           <div className="time-editor">
//                             <input
//                               type="time"
//                               value={editedTime}
//                               onChange={(e) => setEditedTime(e.target.value)}
//                               className="time-input"
//                             />
//                             <div className="editor-buttons">
//                               <button
//                                 className="confirm-btn"
//                                 onClick={() =>
//                                   handleApprove(appt.appointment_id)
//                                 }
//                               >
//                                 Confirm
//                               </button>
//                               <button
//                                 className="cancel-btn"
//                                 onClick={() => {
//                                   setEditingId(null);
//                                   setEditedTime("");
//                                 }}
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         ) : appt.status === "A" ? (
//                           <button
//                             className="action-btn cancel-btn"
//                             onClick={() => handleCancel(appt.appointment_id)}
//                           >
//                             <span className="btn-icon">✕</span>
//                             Cancel
//                           </button>
//                         ) : (
//                           <span className="no-action">-</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>

//         {/* Schedule Section */}
//         <section className="schedule-section">
//           <div className="section-header">
//             <h3>Weekly Schedule</h3>
//             <span className="schedule-count">{schedule.length} time slots</span>
//           </div>

//           {schedule.length === 0 ? (
//             <div className="no-schedule">
//               <div className="no-schedule-icon">📋</div>
//               <h4>No Schedule Available</h4>
//               <p>Weekly schedule has not been set for this doctor.</p>
//             </div>
//           ) : (
//             <div className="schedule-grid">
//               {schedule.map((s, index) => (
//                 <div key={index} className="schedule-card">
//                   <div className="schedule-day">{s.day_of_week}</div>
//                   <div className="schedule-name">{s.name}</div>
//                   <div className="schedule-time">
//                     {formatTime(s.start_time)} - {formatTime(s.end_time)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
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
        return <span className="ds-status-badge pending">Pending</span>;
      case "A":
        return <span className="ds-status-badge approved">Approved</span>;
      case "C":
        return <span className="ds-status-badge cancelled">Cancelled</span>;
      default:
        return <span className="ds-status-badge unknown">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="doctor-schedule">
        <header className="schedule-header">
          <div className="header-content">
            <div className="ds-logo">
              <h1>HealthEase</h1>
              <span className="ds-logo-subtitle">Admin Portal</span>
            </div>
            <button className="ds-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="ds-loading-container">
          <div className="ds-loading-spinner"></div>
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
          <div className="ds-logo">
            <h1>HealthEase</h1>
            <span className="ds-logo-subtitle">Admin Portal</span>
          </div>
          <div className="ds-header-actions">
            <button className="ds-back-btn" onClick={handleBackToAppointments}>
              ← Appointments
            </button>
            <button className="ds-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="schedule-main">
        <div className="ds-page-header">
          <h2>Doctor Schedule & Appointments</h2>
          <p>Manage doctor appointments and view weekly schedule</p>
        </div>

        {message && (
          <div
            className={`ds-message ${
              message.includes("successfully") || message.includes("approved")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        {/* Appointments Section */}
        <section className="ds-appointments-section">
          <div className="ds-section-header">
            <h3>Appointments</h3>
            <span className="ds-appointments-count">
              {appointments.length} total
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="ds-no-appointments">
              <div className="ds-no-appointments-icon">📅</div>
              <h4>No Appointments Found</h4>
              <p>This doctor currently has no scheduled appointments.</p>
            </div>
          ) : (
            <div className="ds-table-container">
              <table className="ds-appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr
                      key={appt.appointment_id}
                      className={`ds-row-${appt.status.toLowerCase()}`}
                    >
                      <td>
                        <span className="ds-appointment-id">
                          #{appt.appointment_id}
                        </span>
                      </td>
                      <td>
                        <span className="ds-patient-name">
                          {appt.patient_name}
                        </span>
                      </td>
                      <td>
                        <div className="ds-date-info">
                          <span className="ds-date-value">
                            {new Date(appt.date).toISOString().slice(0, 10)}
                          </span>
                          <span className="ds-day-name">
                            {new Date(appt.date).toLocaleDateString("en-US", {
                              weekday: "long",
                            })}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="ds-appointment-time">
                          {appt.scheduled_time || "Not Set"}
                        </span>
                      </td>
                      {/* <td>{getStatusBadge(appt.status)}</td> */}
                      <td>
                        {appt.status === "P" &&
                        editingId !== appt.appointment_id ? (
                          <button
                            className="ds-action-btn ds-approve-btn"
                            onClick={() => {
                              setEditingId(appt.appointment_id);
                              setEditedTime(appt.scheduled_time || "");
                            }}
                          >
                            <span className="ds-btn-icon">✓</span>
                            Approve
                          </button>
                        ) : appt.status === "P" &&
                          editingId === appt.appointment_id ? (
                          <div className="ds-time-editor">
                            <input
                              type="time"
                              value={editedTime}
                              onChange={(e) => setEditedTime(e.target.value)}
                              className="ds-time-input"
                            />
                            <div className="ds-editor-buttons">
                              <button
                                className="ds-confirm-btn"
                                onClick={() =>
                                  handleApprove(appt.appointment_id)
                                }
                              >
                                Confirm
                              </button>
                              <button
                                className="ds-editor-cancel-btn"
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
                            className="ds-action-btn ds-cancel-btn"
                            onClick={() => handleCancel(appt.appointment_id)}
                          >
                            <span className="ds-btn-icon">✕</span>
                            Cancel
                          </button>
                        ) : (
                          <span className="ds-no-action">-</span>
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
        <section className="ds-schedule-section">
          <div className="ds-section-header">
            <h3>Weekly Schedule</h3>
            <span className="ds-schedule-count">
              {schedule.length} time slots
            </span>
          </div>

          {schedule.length === 0 ? (
            <div className="ds-no-schedule">
              <div className="ds-no-schedule-icon">📋</div>
              <h4>No Schedule Available</h4>
              <p>Weekly schedule has not been set for this doctor.</p>
            </div>
          ) : (
            <div className="ds-schedule-grid">
              {schedule.map((s, index) => (
                <div key={index} className="ds-schedule-card">
                  <div className="ds-schedule-day">{s.day_of_week}</div>
                  <div className="ds-schedule-name">{s.name}</div>
                  <div className="ds-schedule-time">
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
