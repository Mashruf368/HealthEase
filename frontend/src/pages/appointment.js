import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    schedule: "",
    branch_id: "",
    details: "",
  });

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableBranches, setAvailableBranches] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   const selectedDate = new Date(formData.date);
  //   const selectedTime = formData.schedule;
  //   const selectedBranchId = parseInt(formData.branch_id, 10);
  //   const selectedDay = selectedDate.getDay(); // 0-6

  //   const scheduleForDay = doctorInfo.schedule.filter(
  //     (s) =>
  //       s.day_of_week === selectedDay &&
  //       parseInt(s.branch_id) === selectedBranchId &&
  //       selectedTime >= s.start_time &&
  //       selectedTime <= s.end_time
  //   );

  //   if (scheduleForDay.length === 0) {
  //     setError("Invalid time selected for this branch and day.");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("Token missing. Please log in again.");

  //     const created_at = new Date().toISOString();

  //     const res = await fetch(
  //       `http://localhost:3001/doctors/${id}/appointment`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //         body: JSON.stringify({
  //           ...formData,
  //           created_at,
  //         }),
  //       }
  //     );

  //     if (!res.ok) {
  //       const msg = await res.text();
  //       throw new Error(`Error ${res.status}: ${msg}`);
  //     }

  //     setSuccess("Appointment requested successfully.");
  //     setFormData({ date: "", schedule: "", branch_id: "", details: "" });

  //     setTimeout(() => navigate("/dashboard"), 2000);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing. Please log in again.");

      const created_at = new Date().toISOString();

      const res = await fetch(
        `http://localhost:3001/doctors/${id}/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            ...formData,
            created_at,
          }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Error ${res.status}: ${msg}`);
      }

      setSuccess("Appointment requested successfully.");
      setFormData({ date: "", schedule: "", branch_id: "", details: "" });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Missing token");

        const res = await fetch(`http://localhost:3001/doctors/${id}`, {
          headers: { token },
        });

        const data = await res.json();
        setDoctorInfo(data);

        // Extract unique branches
        const uniqueBranches = [];
        const seen = new Set();

        data.schedule.forEach((s) => {
          if (!seen.has(s.branch_id)) {
            seen.add(s.branch_id);
            uniqueBranches.push({
              branch_id: s.branch_id,
              name: s.name,
              address: s.branch_address,
            });
          }
        });

        setAvailableBranches(uniqueBranches);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctorInfo();
  }, [id]);

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const date = new Date(`1970-01-01T${timeStr}`);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dayToText = (day) =>
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][day];

  return (
    <div style={{ display: "flex", padding: "2rem", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h2>Book Appointment with Doctor ID: {id}</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
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
            Branch:
            <select
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              {availableBranches.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.name} ({branch.address})
                </option>
              ))}
            </select>
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
              borderRadius: "5px",
            }}
          >
            Submit Appointment
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>
        )}
      </div>

      <div
        style={{
          flex: 1,
          background: "#f8f9fa",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {doctorInfo ? (
          <>
            <h3>Doctor Profile</h3>
            <p>
              <strong>Name:</strong> {doctorInfo.doctor.name}
            </p>
            <p>
              <strong>Age:</strong> {doctorInfo.doctor.age}
            </p>
            <p>
              <strong>Gender:</strong> {doctorInfo.doctor.gender}
            </p>
            <p>
              <strong>Contacts:</strong> {doctorInfo.doctor.contacts}
            </p>
            <p>
              <strong>Speciality:</strong> {doctorInfo.doctor.speciality}
            </p>
            <p>
              <strong>Details:</strong> {doctorInfo.doctor.details}
            </p>

            <h4>Degrees</h4>
            <ul>
              {doctorInfo.doctor.degrees.map((deg, index) => (
                <li key={index}>
                  {deg.degree_name} from {deg.institute} ({deg.year})
                </li>
              ))}
            </ul>

            <h4>Schedule</h4>
            <ul>
              {doctorInfo.schedule.map((s, index) => (
                <li key={index}>
                  {s.day_of_week} - {s.name} ({formatTime(s.start_time)} -{" "}
                  {formatTime(s.end_time)})
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading doctor info...</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
