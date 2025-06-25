import React, { useEffect, useState } from "react";
//import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch("http://localhost:3001/admin/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

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
          body: JSON.stringify({}), // optionally send new time
        }
      );

      const resText = await response.text();
      if (response.ok) {
        setMessage("Appointment approved");
        // Remove approved appointment from list
        setAppointments((prev) => prev.filter((a) => a.appointment_id !== id));
      } else {
        setMessage(resText);
      }
    } catch (err) {
      setMessage("Error approving appointment");
      console.error(err);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading appointments...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pending Appointments</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {appointments.length === 0 ? (
        <p>No pending appointments</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <td>{appt.appointment_id}</td>
                <td>{appt.date}</td>
                <td>{appt.scheduled_time || "Not Set"}</td>
                <td>{appt.patient_name}</td>
                <td>{appt.doctor_name}</td>
                <td>{appt.branch_name}</td>
                <td>{appt.details}</td>
                <td>
                  <button
  onClick={() => approveAppointment(appt.appointment_id)}
  disabled={message === "Appointment approved"} // optional
  style={{
    padding: "0.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: message === "Appointment approved" ? 0.6 : 1,
  }}
>
  Approve
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAppointments;
