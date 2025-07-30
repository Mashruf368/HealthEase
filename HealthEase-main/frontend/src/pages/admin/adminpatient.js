// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const AdminPatientProfile = () => {
// //   const { id } = useParams(); // patient_id from route
// //   const [patient, setPatient] = useState(null);
// //   const [prescriptions, setPrescriptions] = useState([]);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchPatientData = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         setError("Unauthorized. Please log in.");
// //         return;
// //       }

// //       try {
// //         const res = await fetch(`http://localhost:3001/admin/patient/${id}`, {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         });

// //         if (!res.ok) {
// //           const msg = await res.text();
// //           throw new Error(`Error ${res.status}: ${msg}`);
// //         }

// //         const data = await res.json();
// //         setPatient(data.patient);
// //         setPrescriptions(data.prescriptions);
// //       } catch (err) {
// //         console.error("Fetch failed:", err.message);
// //         setError("Failed to load patient data: " + err.message);
// //       }
// //     };

// //     fetchPatientData();
// //   }, [id]);

// //   const handleViewDetails = (consultationId) => {
// //     navigate(`/admin/prescription/${consultationId}`);
// //   };

// //   return (
// //     <div className="patient-profile-container">
// //       <h2>Patient Profile</h2>

// //       {error && <div className="error-message">{error}</div>}

// //       {patient && (
// //         <div className="patient-info">
// //           <p>
// //             <strong>Name:</strong> {patient.name}
// //           </p>
// //           <p>
// //             <strong>Gender:</strong> {patient.gender}
// //           </p>
// //           <p>
// //             <strong>Age:</strong> {patient.age}
// //           </p>
// //           <p>
// //             <strong>Contact:</strong> {patient.contact_no}
// //           </p>
// //           <p>
// //             <strong>Address:</strong> {patient.address}
// //           </p>
// //         </div>
// //       )}

// //       <h3>Prescriptions</h3>
// //       {prescriptions.length > 0 ? (
// //         <table className="prescription-table">
// //           <thead>
// //             <tr>
// //               <th>Doctor Name</th>
// //               <th>Consultation ID</th>
// //               <th>Date</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {prescriptions.map((presc, index) => (
// //               <tr key={index}>
// //                 <td>{presc.name}</td>
// //                 <td>{presc.consultation_id}</td>
// //                 <td>{new Date(presc.date).toLocaleDateString()}</td>
// //                 <td>
// //                   <button
// //                     onClick={() => handleViewDetails(presc.consultation_id)}
// //                   >
// //                     View Details
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       ) : (
// //         <p>No prescriptions found for this patient.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPatientProfile;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/Admin/AdminPatientProfile.css";

// const AdminPatientProfile = () => {
//   const { id } = useParams(); // patient_id from route
//   const [patient, setPatient] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchPatientData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`http://localhost:3001/admin/patient/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });

//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.message || `Error ${res.status}`);
//         }

//         const data = await res.json();
//         setPatient(data.patient);
//         setPrescriptions(data.prescriptions || []);
//       } catch (err) {
//         console.error("Fetch failed:", err.message);
//         setError("Failed to load patient data: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [id, token, navigate]);

//   const handleViewDetails = (consultationId) => {
//     navigate(`/admin/prescription/${consultationId}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToPrescriptions = () => {
//     navigate("/admin/prescriptions");
//   };

//   const handleBackToDashboard = () => {
//     navigate("/admin/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="patient-profile-container">
//         <header className="patient-profile-header">
//           <div className="header-content">
//             <div className="logo">
//               <h1>HealthEase</h1>
//               <span className="logo-subtitle">Admin Portal</span>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </header>
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading patient profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="patient-profile-container">
//       {/* Header */}
//       <header className="patient-profile-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Admin Portal</span>
//           </div>
//           <div className="header-actions">
//             <button className="back-btn" onClick={handleBackToPrescriptions}>
//               ← Prescriptions
//             </button>
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Dashboard
//             </button>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="patient-profile-main">
//         <div className="page-header">
//           <h2>Patient Profile</h2>
//           <p>View detailed patient information and prescription history</p>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         {patient && (
//           <>
//             {/* Patient Information Card */}
//             <div className="patient-info-card">
//               <div className="card-header">
//                 <h3>
//                   <span className="patient-icon">👤</span>
//                   Patient Information
//                 </h3>
//               </div>
//               <div className="patient-info">
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Full Name</span>
//                   <span className="patient-detail-value">{patient.name}</span>
//                 </div>
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Gender</span>
//                   <span className="patient-detail-value">{patient.gender}</span>
//                 </div>
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Age</span>
//                   <span className="patient-detail-value">
//                     {patient.age} years
//                   </span>
//                 </div>
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Contact Number</span>
//                   <span className="patient-detail-value">
//                     {patient.contact_no}
//                   </span>
//                 </div>
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Address</span>
//                   <span className="patient-detail-value">
//                     {patient.address}
//                   </span>
//                 </div>
//                 <div className="patient-detail">
//                   <span className="patient-detail-label">Patient ID</span>
//                   <span className="patient-detail-value">#{id}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Prescriptions Section */}
//             <div className="prescriptions-section">
//               <div className="prescriptions-header">
//                 <h3>
//                   <span className="prescriptions-icon">📋</span>
//                   Prescription History
//                 </h3>
//               </div>

//               {prescriptions.length === 0 ? (
//                 <div className="no-prescriptions">
//                   <div className="no-prescriptions-icon">📋</div>
//                   <h4>No Prescriptions Found</h4>
//                   <p>
//                     This patient doesn't have any prescriptions in the system
//                     yet.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="table-container">
//                   <table className="prescription-table">
//                     <thead>
//                       <tr>
//                         <th>Doctor Name</th>
//                         <th>Consultation ID</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {prescriptions.map((presc, index) => (
//                         <tr key={index}>
//                           <td>
//                             <span className="doctor-name">
//                               Dr. {presc.name}
//                             </span>
//                           </td>
//                           <td>
//                             <span className="consultation-id">
//                               #{presc.consultation_id}
//                             </span>
//                           </td>
//                           <td>
//                             <span className="prescription-date">
//                               {new Date(presc.date).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   year: "numeric",
//                                   month: "short",
//                                   day: "numeric",
//                                 }
//                               )}
//                             </span>
//                           </td>
//                           <td>
//                             <span className="status-badge active">Active</span>
//                           </td>
//                           <td>
//                             <button
//                               className="view-details-btn"
//                               onClick={() =>
//                                 handleViewDetails(presc.consultation_id)
//                               }
//                             >
//                               View Details
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {!patient && !loading && !error && (
//           <div className="no-patient">
//             <div className="no-patient-icon">👤</div>
//             <h3>Patient Not Found</h3>
//             <p>The requested patient profile could not be found.</p>
//             <button className="back-btn" onClick={handleBackToPrescriptions}>
//               ← Back to Prescriptions
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminPatientProfile;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Admin/AdminPatientProfile.css";

const AdminPatientProfile = () => {
  const { id } = useParams(); // patient_id from route
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/admin/patient/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Error ${res.status}`);
        }

        const data = await res.json();
        setPatient(data.patient);
        setPrescriptions(data.prescriptions || []);
      } catch (err) {
        console.error("Fetch failed:", err.message);
        setError("Failed to load patient data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id, token, navigate]);

  const handleViewDetails = (consultationId) => {
    navigate(`/admin/prescription/${consultationId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToPrescriptions = () => {
    navigate("/admin/prescriptions");
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="admin-patient-profile-container">
        <header className="admin-patient-profile-header">
          <div className="admin-patient-header-content">
            <div className="admin-patient-logo">
              <h1>HealthEase</h1>
              <span className="admin-patient-logo-subtitle">Admin Portal</span>
            </div>
            <button className="admin-patient-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="admin-patient-loading-container">
          <div className="admin-patient-loading-spinner"></div>
          <p>Loading patient profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-patient-profile-container">
      {/* Header */}
      <header className="admin-patient-profile-header">
        <div className="admin-patient-header-content">
          <div className="admin-patient-logo">
            <h1>HealthEase</h1>
            <span className="admin-patient-logo-subtitle">Admin Portal</span>
          </div>
          <div className="admin-patient-header-actions">
            <button
              className="admin-patient-back-btn"
              onClick={handleBackToPrescriptions}
            >
              ← Prescriptions
            </button>
            <button
              className="admin-patient-back-btn"
              onClick={handleBackToDashboard}
            >
              ← Dashboard
            </button>
            <button className="admin-patient-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-patient-profile-main">
        <div className="admin-patient-page-header">
          <h2>Patient Profile</h2>
          <p>View detailed patient information and prescription history</p>
        </div>

        {error && <div className="admin-patient-error-message">{error}</div>}

        {patient && (
          <>
            {/* Patient Information Card */}
            <div className="admin-patient-info-card">
              <div className="admin-patient-card-header">
                <h3>
                  <span className="admin-patient-icon">👤</span>
                  Patient Information
                </h3>
              </div>
              <div className="admin-patient-info">
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">Full Name</span>
                  <span className="admin-patient-detail-value">
                    {patient.name}
                  </span>
                </div>
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">Gender</span>
                  <span className="admin-patient-detail-value">
                    {patient.gender}
                  </span>
                </div>
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">Age</span>
                  <span className="admin-patient-detail-value">
                    {patient.age} years
                  </span>
                </div>
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">
                    Contact Number
                  </span>
                  <span className="admin-patient-detail-value">
                    {patient.contact_no}
                  </span>
                </div>
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">Address</span>
                  <span className="admin-patient-detail-value">
                    {patient.address}
                  </span>
                </div>
                <div className="admin-patient-detail">
                  <span className="admin-patient-detail-label">Patient ID</span>
                  <span className="admin-patient-detail-value">#{id}</span>
                </div>
              </div>
            </div>

            {/* Prescriptions Section */}
            <div className="admin-patient-prescriptions-section">
              <div className="admin-patient-prescriptions-header">
                <h3>
                  <span className="admin-patient-prescriptions-icon">📋</span>
                  Prescription History
                </h3>
              </div>

              {prescriptions.length === 0 ? (
                <div className="admin-patient-no-prescriptions">
                  <div className="admin-patient-no-prescriptions-icon">📋</div>
                  <h4>No Prescriptions Found</h4>
                  <p>
                    This patient doesn't have any prescriptions in the system
                    yet.
                  </p>
                </div>
              ) : (
                <div className="admin-patient-table-container">
                  <table className="admin-patient-prescription-table">
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Consultation ID</th>
                        <th>Date</th>
                        {/* <th>Status</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions.map((presc, index) => (
                        <tr key={index}>
                          <td>
                            <span className="admin-patient-doctor-name">
                              Dr. {presc.name}
                            </span>
                          </td>
                          <td>
                            <span className="admin-patient-consultation-id">
                              #{presc.consultation_id}
                            </span>
                          </td>
                          <td>
                            <span className="admin-patient-prescription-date">
                              {new Date(presc.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </td>
                          {/* <td>
                            <span className="admin-patient-status-badge admin-patient-active">
                              Active
                            </span>
                          </td> */}
                          <td>
                            <button
                              className="admin-patient-view-details-btn"
                              onClick={() =>
                                handleViewDetails(presc.consultation_id)
                              }
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {!patient && !loading && !error && (
          <div className="admin-patient-no-patient">
            <div className="admin-patient-no-patient-icon">👤</div>
            <h3>Patient Not Found</h3>
            <p>The requested patient profile could not be found.</p>
            <button
              className="admin-patient-back-btn"
              onClick={handleBackToPrescriptions}
            >
              ← Back to Prescriptions
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPatientProfile;
