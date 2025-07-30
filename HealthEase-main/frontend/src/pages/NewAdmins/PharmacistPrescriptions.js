import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Pharmacist/PharmacistPrescription.css";

const PharmacistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchPrescriptions(currentPage);
  }, [currentPage, token, navigate]);

  const fetchPrescriptions = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
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
        setPrescriptions(data.prescriptions || []);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setError("");
      } else {
        setError(data.error || "Failed to fetch prescriptions.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (consultationId) => {
    navigate(`/pharmacist/prescriptions/${consultationId}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/pharmacist/dashboard");
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pharmacist-pagination-btn ${
            i === currentPage ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pharmacist-pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pharmacist-pagination-btn pharmacist-prev-btn"
        >
          ← Prev
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pharmacist-pagination-btn pharmacist-next-btn"
        >
          Next →
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="pharmacist-prescriptions">
        <header className="pharmacist-prescriptions-header">
          <div className="pharmacist-header-content">
            <div className="pharmacist-logo">
              <h1>HealthEase</h1>
              <span className="pharmacist-logo-subtitle">
                Pharmacist Portal
              </span>
            </div>
            <button className="pharmacist-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="pharmacist-prescriptions-main">
          <div className="pharmacist-loading-container">
            <div className="pharmacist-loading-spinner"></div>
            <p>Loading prescriptions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pharmacist-prescriptions">
      {/* Header */}
      <header className="pharmacist-prescriptions-header">
        <div className="pharmacist-header-content">
          <div className="pharmacist-logo">
            <h1>HealthEase</h1>
            <span className="pharmacist-logo-subtitle">Pharmacist Portal</span>
          </div>
          <div className="pharmacist-header-actions">
            <button
              className="pharmacist-back-btn"
              onClick={handleBackToDashboard}
            >
              ← Dashboard
            </button>
            <button className="pharmacist-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pharmacist-prescriptions-main">
        <div className="pharmacist-page-header">
          <h2>Patient Prescriptions</h2>
          <p>View and manage all patient prescriptions for dispensing</p>
        </div>

        {error && <div className="pharmacist-message error">{error}</div>}

        <div className="pharmacist-prescriptions-container">
          {prescriptions.length === 0 ? (
            <div className="pharmacist-no-prescriptions">
              <div className="pharmacist-no-prescriptions-icon">💊</div>
              <h3>No Prescriptions Found</h3>
              <p>
                No prescriptions are available at the moment or no results match
                your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="pharmacist-table-container">
                <table className="pharmacist-prescriptions-table">
                  <thead>
                    <tr>
                      <th>Patient Information</th>
                      {/* <th>Patient ID</th> */}
                      <th>Doctor</th>
                      {/* <th>Appointment ID</th> */}
                      <th>Consultation ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription, idx) => (
                      <tr key={`${prescription.consultation_id}-${idx}`}>
                        <td data-label="Patient Information">
                          <div className="pharmacist-patient-cell">
                            <span className="pharmacist-patient-name">
                              {prescription.patient_name}
                            </span>
                          </div>
                        </td>
                        {/* <td data-label="Patient ID">
                          <span className="pharmacist-patient-id">
                            #{prescription.patient_id}
                          </span>
                        </td> */}
                        <td data-label="Doctor">
                          <span className="pharmacist-doctor-name">
                            Dr. {prescription.doctor_name}
                          </span>
                        </td>
                        {/* <td data-label="Appointment ID">
                          <span className="pharmacist-appointment-id">
                            #{prescription.appointment_id}
                          </span>
                        </td> */}
                        <td data-label="Consultation ID">
                          <span className="pharmacist-consultation-id">
                            #{prescription.consultation_id}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <button
                            onClick={() =>
                              handleView(prescription.consultation_id)
                            }
                            className="pharmacist-action-btn pharmacist-prescription-btn"
                            aria-label={`View prescription for ${prescription.patient_name}`}
                          >
                            View Prescription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PharmacistPrescriptions;
