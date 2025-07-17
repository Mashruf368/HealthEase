import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
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

  // Extract unique specialities
  const specialities = [
    ...new Set(doctors.map((doc) => doc.speciality).filter(Boolean)),
  ];

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesSpeciality = specialityFilter
      ? doc.speciality === specialityFilter
      : true;
    return matchesName && matchesSpeciality;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find a Doctor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Inputs */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={specialityFilter}
          onChange={(e) => setSpecialityFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Specialities</option>
          {specialities.map((spec, idx) => (
            <option key={idx} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {filteredDoctors.length === 0 && !error ? (
        <p>No doctors found.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredDoctors.map((doc) => (
            <div
              key={doc.doctor_id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>{doc.name}</h3>

              {doc.speciality && (
                <p>
                  <strong>Speciality:</strong> {doc.speciality}
                </p>
              )}

              {/* Degrees list (only degree_name and institute) */}
              {doc.degrees && doc.degrees.length > 0 && (
                <ul>
                  {doc.degrees.map((deg, idx) => (
                    <li key={idx}>
                      {deg.degree_name} ({deg.institute})
                    </li>
                  ))}
                </ul>
              )}

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
