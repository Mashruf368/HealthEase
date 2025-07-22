import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PathologistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/pathologist/prescriptions",
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPrescriptions(data);
        } else {
          setError(data.error || "Failed to fetch prescriptions.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching prescriptions.");
      }
    };

    fetchPrescriptions();
  }, []);

  const handleView = (consultationId) => {
    navigate(`/pathologist/prescriptions/${consultationId}`);
  };

  return (
    <div className="prescriptions-page">
      <h2>Prescriptions</h2>

      {error && <p className="error-message">{error}</p>}

      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <table className="prescriptions-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Doctor Name</th>
              <th>Appointment ID</th>
              <th>Consultation ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p, index) => (
              <tr key={index}>
                <td>{p.patient_name}</td>
                <td>{p.patient_id}</td>
                <td>{p.doctor_name}</td>
                <td>{p.appointment_id}</td>
                <td>{p.consultation_id}</td>
                <td>
                  <button onClick={() => handleView(p.consultation_id)}>
                    View Prescription
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

export default PathologistPrescriptions;
