import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Pathologist/PathologistPrescriptionDetails.css";

const PathologistPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const navigate = useNavigate();
  const [data, setData] = useState({
    prescription: {},
    medicines: [],
    tests: [],
  });
  const [testResults, setTestResults] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/prescriptions/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prescription data");
      }

      const result = await response.json();
      setData(result);

      const initialResults = {};
      result.tests.forEach((test) => {
        initialResults[test.test_id] = test.test_result || "";
      });
      setTestResults(initialResults);
      setLoading(false);
    } catch (error) {
      setMessage("Error: " + error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (testId, value) => {
    setTestResults((prev) => ({
      ...prev,
      [testId]: value,
    }));
  };

  const handleSaveResult = async (testId) => {
    const result = testResults[testId];

    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/test-result/${testId}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ result }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save test result");
      }

      alert("Test result saved!");
      fetchData();
    } catch (error) {
      alert("Error saving result: " + error.message);
    }
  };

  const handleConfirmPayment = async (testNumber) => {
    if (!testNumber) {
      alert("Missing test number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/test/payment/${testNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment failed");
      }

      alert("Payment successful!");
      fetchData();
    } catch (err) {
      alert("Payment error: " + err.message);
    }
  };

  const handleViewProfile = () => {
    navigate(`/pathologist/patient/${data.prescription.patient_id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToList = () => {
    navigate("/pathologist/prescriptions");
  };

  if (loading) {
    return (
      <div className="pathologist-details">
        <div className="pathologist-details-header">
          <div className="pathologist-details-header-content">
            <div className="pathologist-details-logo">
              <h1>HealthEase</h1>
              <span className="pathologist-details-logo-subtitle">
                Laboratory Management System
              </span>
            </div>
            <div className="pathologist-details-header-actions">
              <button
                className="pathologist-details-back-btn"
                onClick={handleBackToList}
              >
                Back to List
              </button>
              <button
                className="pathologist-details-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="pathologist-details-main">
          <div className="pathologist-details-loading">
            <div className="pathologist-details-loading-spinner"></div>
            <p>Loading prescription details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="pathologist-details">
        <div className="pathologist-details-header">
          <div className="pathologist-details-header-content">
            <div className="pathologist-details-logo">
              <h1>HealthEase</h1>
              <span className="pathologist-details-logo-subtitle">
                Laboratory Management System
              </span>
            </div>
            <div className="pathologist-details-header-actions">
              <button
                className="pathologist-details-back-btn"
                onClick={handleBackToList}
              >
                Back to List
              </button>
              <button
                className="pathologist-details-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="pathologist-details-main">
          <div className="pathologist-details-message">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pathologist-details">
      <div className="pathologist-details-header">
        <div className="pathologist-details-header-content">
          <div className="pathologist-details-logo">
            <h1>HealthEase</h1>
            <span className="pathologist-details-logo-subtitle">
              Laboratory Management System
            </span>
          </div>
          <div className="pathologist-details-header-actions">
            <button
              className="pathologist-details-back-btn"
              onClick={handleBackToList}
            >
              Back to List
            </button>
            <button
              className="pathologist-details-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="pathologist-details-main">
        <div className="pathologist-details-page-header">
          <h2>Prescription Details</h2>
          <p>Review patient information and process laboratory tests</p>
        </div>

        {/* Prescription Information Card */}
        <div className="pathologist-details-prescription-card">
          <h3>Patient & Prescription Information</h3>
          <div className="pathologist-details-info-grid">
            <div className="pathologist-details-info-item">
              <div className="pathologist-details-info-label">Patient Name</div>
              <div className="pathologist-details-info-value">
                {data.prescription.patient_name}
              </div>
            </div>
            <div className="pathologist-details-info-item">
              <div className="pathologist-details-info-label">Doctor Name</div>
              <div className="pathologist-details-info-value">
                {data.prescription.name}
              </div>
            </div>
            <div className="pathologist-details-info-item">
              <div className="pathologist-details-info-label">Symptoms</div>
              <div className="pathologist-details-info-value">
                {data.prescription.symptoms || "Not specified"}
              </div>
            </div>
            <div className="pathologist-details-info-item">
              <div className="pathologist-details-info-label">Comments</div>
              <div className="pathologist-details-info-value">
                {data.prescription.comments || "No comments"}
              </div>
            </div>
            <div className="pathologist-details-info-item">
              <div className="pathologist-details-info-label">
                Appointment Details
              </div>
              <div className="pathologist-details-info-value">
                {data.prescription.details || "No details available"}
              </div>
            </div>
          </div>
          <button
            className="pathologist-details-profile-btn"
            onClick={handleViewProfile}
          >
            View Patient Profile
          </button>
        </div>

        {/* Medicines Section */}
        <div className="pathologist-details-section-card">
          <div className="pathologist-details-section-header">
            <h3>💊 Prescribed Medicines</h3>
          </div>
          <div className="pathologist-details-section-content">
            {data.medicines.length === 0 ? (
              <div className="pathologist-details-no-items">
                No medicines prescribed.
              </div>
            ) : (
              <ul className="pathologist-details-medicine-list">
                {data.medicines.map((med) => (
                  <li
                    key={med.medicine_id}
                    className="pathologist-details-medicine-item"
                  >
                    <div className="pathologist-details-medicine-icon">💊</div>
                    <div className="pathologist-details-medicine-info">
                      <strong>{med.name}</strong> - {"Dosage "}
                      {med.dosage}
                      {" for "}
                      {med.duration}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Tests Section */}
        <div className="pathologist-details-section-card">
          <div className="pathologist-details-section-header">
            <h3>🔬 Laboratory Tests</h3>
          </div>
          <div className="pathologist-details-section-content">
            {data.tests.length === 0 ? (
              <div className="pathologist-details-no-items">
                No laboratory tests recommended.
              </div>
            ) : (
              <ul className="pathologist-details-test-list">
                {data.tests.map((test) => (
                  <li
                    key={test.test_number}
                    className="pathologist-details-test-item"
                  >
                    <div className="pathologist-details-test-header">
                      <div className="pathologist-details-test-icon">🔬</div>
                      <div className="pathologist-details-test-title">
                        {test.test_name || test.name || "Laboratory Test"}
                      </div>
                      <div className="pathologist-details-test-number">
                        #{test.test_number}
                      </div>
                    </div>

                    <div className="pathologist-details-test-body">
                      <div className="pathologist-details-test-info">
                        <div className="pathologist-details-test-field">
                          <div className="pathologist-details-test-field-label">
                            Current Result
                          </div>
                          <div className="pathologist-details-test-field-value">
                            {test.test_result || "No result entered"}
                          </div>
                        </div>
                      </div>

                      <div className="pathologist-details-result-form">
                        <label className="pathologist-details-result-label">
                          Enter/Update Test Result:
                        </label>
                        <input
                          type="text"
                          className="pathologist-details-result-input"
                          value={testResults[test.test_id] || ""}
                          onChange={(e) =>
                            handleInputChange(test.test_id, e.target.value)
                          }
                          placeholder="Enter test result here..."
                        />

                        <div className="pathologist-details-action-buttons">
                          <button
                            className="pathologist-details-save-btn"
                            onClick={() => handleSaveResult(test.test_id)}
                          >
                            Save Result
                          </button>

                          {test.payment_state !== "C" ? (
                            <button
                              className="pathologist-details-payment-btn"
                              onClick={() =>
                                handleConfirmPayment(test.test_number)
                              }
                            >
                              Confirm Payment
                            </button>
                          ) : (
                            <div className="pathologist-details-paid-status">
                              Payment Confirmed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathologistPrescriptionDetails;
