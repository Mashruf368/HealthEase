import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const { id } = useParams(); // doctor ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    schedule: "",
    branch_id: "",
    details: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing. Please log in again.");

      const created_at = new Date().toISOString();

      const res = await fetch(`http://localhost:3001/doctors/${id}/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify({
          ...formData,
          created_at
        })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Error ${res.status}: ${msg}`);
      }

      setSuccess("Appointment requested successfully.");

      // Optional: Reset form (not strictly necessary)
      setFormData({ date: "", schedule: "", branch_id: "", details: "" });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Book Appointment with Doctor ID: {id}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Scheduled Time:
          <input
            type="time"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Branch ID:
          <input
            type="number"
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Submit Appointment
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
    </div>
  );
};

export default AppointmentPage;
