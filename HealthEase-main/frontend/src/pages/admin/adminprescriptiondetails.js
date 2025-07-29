// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const AdminPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
//   const [data, setData] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3001/admin/prescriptions/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token,
//             },
//           }
//         );

//         const result = await res.json();
//         if (res.ok) {
//           setData(result);
//         } else {
//           setMessage(result.error || "Failed to fetch prescription");
//         }
//       } catch (err) {
//         setMessage("Server error while fetching prescription");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
//   if (message)
//     return <p style={{ padding: "2rem", color: "red" }}>{message}</p>;
//   if (!data || !data.prescription)
//     return <p style={{ padding: "2rem" }}>No data found.</p>;

//   const { prescription, medicines, tests } = data;

//   return (
//     <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h2>Prescription Details (Admin View)</h2>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "1rem",
//           marginBottom: "1rem",
//         }}
//       >
//         <p>
//           <strong>Doctor:</strong> {prescription.name}
//         </p>
//         <p>
//           <strong>Symptoms:</strong> {prescription.symptoms}
//         </p>
//         <p>
//           <strong>Comments:</strong> {prescription.comments}
//         </p>
//         <p>
//           <strong>Appointment Details:</strong> {prescription.details}
//         </p>
//       </div>

//       <h3>Prescribed Medicines</h3>
//       {medicines && medicines.length > 0 ? (
//         medicines.map((med, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "1rem",
//               borderBottom: "1px solid #eee",
//               paddingBottom: "0.5rem",
//             }}
//           >
//             <p>
//               <strong>Medicine:</strong> {med.name} <br />
//               <strong>Dosage:</strong> {med.dosage} <br />
//               <strong>Duration:</strong> {med.duration}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No medicines prescribed.</p>
//       )}

//       <h3>Recommended Tests</h3>
//       {tests && tests.length > 0 ? (
//         tests.map((test, index) => (
//           <div key={index} style={{ marginBottom: "1rem" }}>
//             <p>
//               <strong>Test:</strong> {test.test_name} <br />
//               <strong>Result:</strong> {test.test_result || "Pending"} <br />
//               <strong>Comments:</strong> {test.comments}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No tests recommended.</p>
//       )}
//     </div>
//   );
// };

// export default AdminPrescriptionDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Admin/AdminPrescriptionDetails.css";

const AdminPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/admin/prescriptions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          setMessage(result.error || "Failed to fetch prescription");
        }
      } catch (err) {
        setMessage("Server error while fetching prescription");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToPrescriptions = () => {
    navigate("/admin/prescriptions");
  };

  if (loading) {
    return (
      <div className="admin-prescription-details">
        <header className="prescription-details-header">
          <div className="header-content">
            <div className="logo">
              <h1>HealthEase</h1>
              <span className="logo-subtitle">Admin Portal</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading prescription details...</p>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="admin-prescription-details">
        <header className="prescription-details-header">
          <div className="header-content">
            <div className="logo">
              <h1>HealthEase</h1>
              <span className="logo-subtitle">Admin Portal</span>
            </div>
            <div className="header-actions">
              <button className="back-btn" onClick={handleBackToPrescriptions}>
                ← Prescriptions
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="prescription-details-main">
          <div className="message error">{message}</div>
        </main>
      </div>
    );
  }

  if (!data || !data.prescription) {
    return (
      <div className="admin-prescription-details">
        <header className="prescription-details-header">
          <div className="header-content">
            <div className="logo">
              <h1>HealthEase</h1>
              <span className="logo-subtitle">Admin Portal</span>
            </div>
            <div className="header-actions">
              <button className="back-btn" onClick={handleBackToPrescriptions}>
                ← Prescriptions
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="prescription-details-main">
          <div className="message error">No prescription data found.</div>
        </main>
      </div>
    );
  }

  const { prescription, medicines, tests } = data;

  return (
    <div className="admin-prescription-details">
      {/* Header */}
      <header className="prescription-details-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <span className="logo-subtitle">Admin Portal</span>
          </div>
          <div className="header-actions">
            <button className="back-btn" onClick={handleBackToPrescriptions}>
              ← Prescriptions
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="prescription-details-main">
        <div className="page-header">
          <h2>Prescription Details</h2>
          <p>
            Comprehensive view of patient prescription and medical information
          </p>
        </div>

        <div className="prescription-content">
          {/* Basic Information */}
          <div className="prescription-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Doctor</div>
                <div className="info-value">{prescription.name}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Consultation ID</div>
                <div className="info-value">#{id}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Symptoms</div>
                <div className="info-value">{prescription.symptoms}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Doctor Comments</div>
                <div className="info-value">{prescription.comments}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Appointment Details</div>
                <div className="info-value">{prescription.details}</div>
              </div>
            </div>
          </div>

          {/* Prescribed Medicines */}
          <div className="section">
            <div className="section-header">
              <span className="section-icon">💊</span>
              <h3 className="section-title">Prescribed Medicines</h3>
            </div>

            {medicines && medicines.length > 0 ? (
              <div className="medicines-grid">
                {medicines.map((med, index) => (
                  <div key={index} className="medicine-card">
                    <div className="medicine-name">{med.name}</div>
                    <div className="medicine-details">
                      <div className="medicine-detail">
                        <span className="detail-label">Dosage:</span>
                        <span className="detail-value">{med.dosage}</span>
                      </div>
                      <div className="medicine-detail">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{med.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💊</div>
                <div className="empty-title">No Medicines Prescribed</div>
                <p className="empty-description">
                  No medications have been prescribed for this consultation.
                </p>
              </div>
            )}
          </div>

          {/* Recommended Tests */}
          <div className="section">
            <div className="section-header">
              <span className="section-icon">🔬</span>
              <h3 className="section-title">Recommended Tests</h3>
            </div>

            {tests && tests.length > 0 ? (
              <div className="tests-grid">
                {tests.map((test, index) => (
                  <div key={index} className="test-card">
                    <div className="test-name">{test.test_name}</div>
                    <div
                      className={`test-result ${
                        test.test_result && test.test_result !== "Pending"
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      {test.test_result || "Pending"}
                    </div>
                    <div className="test-comments">
                      {test.comments || "No additional comments"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔬</div>
                <div className="empty-title">No Tests Recommended</div>
                <p className="empty-description">
                  No laboratory tests have been recommended for this
                  consultation.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPrescriptionDetails;
