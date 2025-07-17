import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorSchedulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null); // to track which row is being edited
  const [editedTime, setEditedTime] = useState(""); // holds new time input

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
    } catch (err) {
      alert("Error approving appointment: " + err.message);
    }
  };

  const handleCancel = (appointmentId) => {
    // Future: You can implement cancel route here
    alert("Cancel functionality not implemented yet.");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Doctor Schedule & Appointments</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                  <tr key={appt.appointment_id}>
                    <td>{appt.appointment_id}</td>
                    <td>{appt.patient_name}</td>
                    <td>
                      {new Date(appt.date).toISOString().slice(0, 10)} (
                      {new Date(appt.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                      )
                    </td>

                    <td>{appt.scheduled_time || "Not Set"}</td>
                    <td>{appt.status}</td>
                    <td>
                      {appt.status === "P" &&
                      editingId !== appt.appointment_id ? (
                        <button
                          onClick={() => {
                            setEditingId(appt.appointment_id);
                            setEditedTime(appt.scheduled_time || "");
                          }}
                        >
                          Approve
                        </button>
                      ) : appt.status === "P" &&
                        editingId === appt.appointment_id ? (
                        <div>
                          <input
                            type="time"
                            value={editedTime}
                            onChange={(e) => setEditedTime(e.target.value)}
                          />
                          <button
                            onClick={() => handleApprove(appt.appointment_id)}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditedTime("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : appt.status === "A" ? (
                        <button
                          onClick={() => handleCancel(appt.appointment_id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3 style={{ marginTop: "2rem" }}>Weekly Schedule</h3>
          <ul>
            {schedule.map((s, index) => (
              <li key={index}>
                {s.day_of_week} - {s.name} ({formatTime(s.start_time)} -{" "}
                {formatTime(s.end_time)})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DoctorSchedulePage;
