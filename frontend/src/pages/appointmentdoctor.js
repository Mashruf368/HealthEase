// --- DoctorAppointments.js ---
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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

  if (loading)
    return <p style={{ padding: "2rem" }}>Loading appointments...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Appointments</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Scheduled Time</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.appointment_id}>
                <td>{appt.appointment_id}</td>
                <td>{appt.date}</td>
                <td>{appt.scheduled_time}</td>
                <td>{appt.patient_name}</td>
                <td>{appt.status}</td>
                <td>{appt.details}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/doctor/appointments/${appt.appointment_id}/prescribe`
                      )
                    }
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Write Prescription
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

export default DoctorAppointments;
