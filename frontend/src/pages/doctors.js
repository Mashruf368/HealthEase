import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/doctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Error ${res.status}: ${msg}`);
        }

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Doctor fetch failed:", err.message);
        setError("Failed to fetch doctors: " + err.message);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = (id) => {
    navigate(`/doctor/${id}/appointment`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find a Doctor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {doctors.length === 0 && !error ? (
        <p>Loading doctors...</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {doctors.map((doc, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>{doc.name}</h3>
              <p><strong>Age:</strong> {doc.age}</p>
              <p><strong>Gender:</strong> {doc.gender}</p>
              <p><strong>Phone:</strong> {doc.contacts}</p>
              {doc.details && <p><strong>Details:</strong> {doc.details}</p>}
              
              <button
                onClick={() => handleAppointment(doc.doctor_id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Make Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
