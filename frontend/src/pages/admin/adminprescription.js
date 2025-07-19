// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const AdminPrescriptions = () => {
// //   const [prescriptions, setPrescriptions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (!token) {
// //       navigate("/login");
// //       return;
// //     }

// //     const fetchPrescriptions = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:3001/admin/prescriptions",
// //           {
// //             method: "GET",
// //             headers: {
// //               "Content-Type": "application/json",
// //               token: token,
// //             },
// //           }
// //         );

// //         const data = await response.json();

// //         if (response.ok) {
// //           setPrescriptions(data);
// //         } else {
// //           setMessage(data.message || "Failed to fetch prescriptions");
// //         }
// //       } catch (err) {
// //         console.error("Fetch error:", err);
// //         setMessage("Failed to fetch prescriptions");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPrescriptions();
// //   }, [token, navigate]);

// //   if (loading) {
// //     return <p style={{ padding: "2rem" }}>Loading prescriptions...</p>;
// //   }

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Prescriptions</h2>
// //       {message && <p style={{ color: "red" }}>{message}</p>}
// //       {prescriptions.length === 0 ? (
// //         <p>No prescriptions found.</p>
// //       ) : (
// //         <table
// //           border="1"
// //           cellPadding="10"
// //           style={{ marginTop: "1rem", width: "100%" }}
// //         >
// //           <thead>
// //             <tr>
// //               <th>Patient Name</th>
// //               <th>Doctor Name</th>
// //               <th>Appointment ID</th>
// //               <th>Consultation ID</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {prescriptions.map((p, idx) => (
// //               <tr key={idx}>
// //                 <td>{p.patient_name}</td>
// //                 <td>{p.doctor_name}</td>
// //                 <td>{p.appointment_id}</td>
// //                 <td>{p.consultation_id}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPrescriptions;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/prescriptions",
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
          setPrescriptions(data);
        } else {
          setMessage(data.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading prescriptions...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prescriptions</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Appointment ID</th>
              <th>Consultation ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p, idx) => (
              <tr key={idx}>
                <td>{p.patient_name}</td>
                <td>{p.doctor_name}</td>
                <td>{p.appointment_id}</td>
                <td>{p.consultation_id}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/prescription/${p.consultation_id}`)
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
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

export default AdminPrescriptions;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Admin/AdminPrescription.css";

// const AdminPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Since we can't use localStorage in Claude artifacts, we'll simulate it
//   // In your actual app, keep: const token = localStorage.getItem("token");
//   const token = "simulated-token"; // Replace with actual localStorage implementation

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchPrescriptions = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/admin/prescriptions",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setPrescriptions(data);
//         } else {
//           setMessage(data.message || "Failed to fetch prescriptions");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setMessage("Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [token, navigate]);

//   const handleLogout = () => {
//     // localStorage.removeItem("token"); // Uncomment in actual app
//     navigate("/login");
//   };

//   const handleBackToDashboard = () => {
//     navigate("/admin/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="admin-prescriptions">
//         <div className="prescriptions-header">
//           <div className="header-content">
//             <div className="logo">
//               <h1>MedCare Admin</h1>
//               <div className="logo-subtitle">Healthcare Management System</div>
//             </div>
//             <div className="header-actions">
//               <button className="back-btn" onClick={handleBackToDashboard}>
//                 ← Dashboard
//               </button>
//               <button className="logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="prescriptions-main">
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <div className="loading-text">Loading prescriptions...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-prescriptions">
//       {/* Header Section */}
//       <div className="prescriptions-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>MedCare Admin</h1>
//             <div className="logo-subtitle">Healthcare Management System</div>
//           </div>
//           <div className="header-actions">
//             <button className="back-btn" onClick={handleBackToDashboard}>
//               ← Dashboard
//             </button>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="prescriptions-main">
//         {/* Page Header */}
//         <div className="page-header">
//           <h2>Prescription Management</h2>
//           <p>View and manage all patient prescriptions</p>
//         </div>

//         {/* Stats Summary */}
//         <div className="prescriptions-stats">
//           <div className="stat-card">
//             <h3>{prescriptions.length}</h3>
//             <p>Total Prescriptions</p>
//           </div>
//           <div className="stat-card">
//             <h3>{new Set(prescriptions.map((p) => p.patient_name)).size}</h3>
//             <p>Unique Patients</p>
//           </div>
//           <div className="stat-card">
//             <h3>{new Set(prescriptions.map((p) => p.doctor_name)).size}</h3>
//             <p>Prescribing Doctors</p>
//           </div>
//         </div>

//         {/* Error Message */}
//         {message && (
//           <div className="message error">
//             <strong>Error:</strong> {message}
//           </div>
//         )}

//         {/* Prescriptions Container */}
//         <div className="prescriptions-container">
//           {prescriptions.length === 0 ? (
//             <div className="no-prescriptions">
//               <div className="no-prescriptions-icon">📋</div>
//               <h3>No Prescriptions Found</h3>
//               <p>There are currently no prescriptions in the system.</p>
//             </div>
//           ) : (
//             <div className="table-container">
//               <table className="prescriptions-table">
//                 <thead>
//                   <tr>
//                     <th>Patient Information</th>
//                     <th>Doctor Information</th>
//                     <th>Appointment Details</th>
//                     <th>Consultation Details</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {prescriptions.map((prescription, idx) => (
//                     <tr key={idx}>
//                       <td>
//                         <div className="patient-name">
//                           <span className="patient-icon">👤</span>
//                           <div>
//                             <div>{prescription.patient_name}</div>
//                             <small className="text-muted">Patient</small>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="doctor-name">
//                           <span className="doctor-icon">👨‍⚕️</span>
//                           <div>
//                             <div>{prescription.doctor_name}</div>
//                             <small className="text-muted">
//                               Prescribing Doctor
//                             </small>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="appointment-id">
//                           <strong>ID:</strong> {prescription.appointment_id}
//                         </div>
//                         <div className="prescription-badge mt-2">
//                           <span className="prescription-badge-icon">📅</span>
//                           Appointment
//                         </div>
//                       </td>
//                       <td>
//                         <div className="consultation-id">
//                           <strong>ID:</strong> {prescription.consultation_id}
//                         </div>
//                         <div className="prescription-badge mt-2">
//                           <span className="prescription-badge-icon">💬</span>
//                           Consultation
//                         </div>
//                       </td>
//                       <td>
//                         <button
//                           className="action-btn"
//                           onClick={() =>
//                             navigate(
//                               `/admin/prescription/${prescription.consultation_id}`
//                             )
//                           }
//                           title="View detailed prescription information"
//                         >
//                           <span className="btn-icon">👁️</span>
//                           View Prescription
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Footer Info */}
//         {prescriptions.length > 0 && (
//           <div className="text-center text-muted mt-2">
//             Showing {prescriptions.length} prescription
//             {prescriptions.length !== 1 ? "s" : ""}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPrescriptions;
