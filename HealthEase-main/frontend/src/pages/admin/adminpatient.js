import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminPatientProfile = () => {
  const { id } = useParams(); // patient_id from route
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/admin/patient/${id}`, {
          method: "GET",
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
        setPatient(data.patient);
        setPrescriptions(data.prescriptions);
      } catch (err) {
        console.error("Fetch failed:", err.message);
        setError("Failed to load patient data: " + err.message);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleViewDetails = (consultationId) => {
    navigate(`/admin/prescription/${consultationId}`);
  };

  return (
    <div className="patient-profile-container">
      <h2>Patient Profile</h2>

      {error && <div className="error-message">{error}</div>}

      {patient && (
        <div className="patient-info">
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Contact:</strong> {patient.contact_no}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>
        </div>
      )}

      <h3>Prescriptions</h3>
      {prescriptions.length > 0 ? (
        <table className="prescription-table">
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Doctor ID</th>
              <th>Consultation ID</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((presc) => (
              <tr key={presc.prescription_id}>
                <td>{presc.prescription_id}</td>
                <td>{presc.doctor_id}</td>
                <td>{presc.consultation_id}</td>
                <td>{new Date(presc.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(presc.consultation_id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
};

export default AdminPatientProfile;
