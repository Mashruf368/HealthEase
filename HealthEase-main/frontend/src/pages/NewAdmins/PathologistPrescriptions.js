// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const PathologistPrescriptions = () => {
// // // // //   const [prescriptions, setPrescriptions] = useState([]);
// // // // //   const [error, setError] = useState("");
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const fetchPrescriptions = async () => {
// // // // //       try {
// // // // //         const token = localStorage.getItem("token");
// // // // //         const response = await fetch(
// // // // //           "http://localhost:3001/pathologist/prescriptions",
// // // // //           {
// // // // //             headers: {
// // // // //               "Content-Type": "application/json",
// // // // //               token: token,
// // // // //             },
// // // // //           }
// // // // //         );

// // // // //         const data = await response.json();
// // // // //         if (response.ok) {
// // // // //           setPrescriptions(data);
// // // // //         } else {
// // // // //           setError(data.error || "Failed to fetch prescriptions.");
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error(err);
// // // // //         setError("Error fetching prescriptions.");
// // // // //       }
// // // // //     };

// // // // //     fetchPrescriptions();
// // // // //   }, []);

// // // // //   const handleView = (consultationId) => {
// // // // //     navigate(`/pathologist/prescriptions/${consultationId}`);
// // // // //   };

// // // // //   return (
// // // // //     <div className="prescriptions-page">
// // // // //       <h2>Prescriptions</h2>

// // // // //       {error && <p className="error-message">{error}</p>}

// // // // //       {prescriptions.length === 0 ? (
// // // // //         <p>No prescriptions available.</p>
// // // // //       ) : (
// // // // //         <table className="prescriptions-table">
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th>Patient Name</th>
// // // // //               <th>Patient ID</th>
// // // // //               <th>Doctor Name</th>
// // // // //               <th>Appointment ID</th>
// // // // //               <th>Consultation ID</th>
// // // // //               <th>Action</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {prescriptions.map((p, index) => (
// // // // //               <tr key={index}>
// // // // //                 <td>{p.patient_name}</td>
// // // // //                 <td>{p.patient_id}</td>
// // // // //                 <td>{p.doctor_name}</td>
// // // // //                 <td>{p.appointment_id}</td>
// // // // //                 <td>{p.consultation_id}</td>
// // // // //                 <td>
// // // // //                   <button onClick={() => handleView(p.consultation_id)}>
// // // // //                     View Prescription
// // // // //                   </button>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PathologistPrescriptions;
// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const PathologistPrescriptions = () => {
// // // //   const [prescriptions, setPrescriptions] = useState([]);
// // // //   const [error, setError] = useState("");
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const navigate = useNavigate();

// // // //   const fetchPrescriptions = async (page) => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await fetch(
// // // //         `http://localhost:3001/pathologist/prescriptions?page=${page}`,
// // // //         {
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             token: token,
// // // //           },
// // // //         }
// // // //       );

// // // //       const data = await response.json();
// // // //       if (response.ok) {
// // // //         setPrescriptions(data.prescriptions);
// // // //         setCurrentPage(data.currentPage);
// // // //         setTotalPages(data.totalPages);
// // // //         setError("");
// // // //       } else {
// // // //         setError(data.error || "Failed to fetch prescriptions.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setError("Error fetching prescriptions.");
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchPrescriptions(currentPage);
// // // //   }, [currentPage]);

// // // //   const handleView = (consultationId) => {
// // // //     navigate(`/pathologist/prescriptions/${consultationId}`);
// // // //   };

// // // //   const handlePrev = () => {
// // // //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// // // //   };

// // // //   return (
// // // //     <div className="prescriptions-page">
// // // //       <h2>Prescriptions</h2>

// // // //       {error && <p className="error-message">{error}</p>}

// // // //       {prescriptions.length === 0 ? (
// // // //         <p>No prescriptions available.</p>
// // // //       ) : (
// // // //         <>
// // // //           <table className="prescriptions-table">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>Patient Name</th>
// // // //                 <th>Patient ID</th>
// // // //                 <th>Doctor Name</th>
// // // //                 <th>Appointment ID</th>
// // // //                 <th>Consultation ID</th>
// // // //                 <th>Action</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {prescriptions.map((p, index) => (
// // // //                 <tr key={index}>
// // // //                   <td>{p.patient_name}</td>
// // // //                   <td>{p.patient_id}</td>
// // // //                   <td>{p.doctor_name}</td>
// // // //                   <td>{p.appointment_id}</td>
// // // //                   <td>{p.consultation_id}</td>
// // // //                   <td>
// // // //                     <button onClick={() => handleView(p.consultation_id)}>
// // // //                       View Prescription
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>

// // // //           {/* Pagination Controls */}
// // // //           <div className="pagination-controls">
// // // //             <button onClick={handlePrev} disabled={currentPage === 1}>
// // // //               Previous
// // // //             </button>
// // // //             <span>
// // // //               Page {currentPage} of {totalPages}
// // // //             </span>
// // // //             <button onClick={handleNext} disabled={currentPage === totalPages}>
// // // //               Next
// // // //             </button>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PathologistPrescriptions;
// // // // Updated React Component: PathologistPrescriptions.js
// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "../../styles/Pathologist/PathologistPrescription.css";

// // // const PathologistPrescriptions = () => {
// // //   const [prescriptions, setPrescriptions] = useState([]);
// // //   const [error, setError] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const navigate = useNavigate();

// // //   const fetchPrescriptions = async (page) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await fetch(
// // //         `http://localhost:3001/pathologist/prescriptions?page=${page}`,
// // //         {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //         }
// // //       );

// // //       const data = await response.json();
// // //       if (response.ok) {
// // //         setPrescriptions(data.prescriptions);
// // //         setCurrentPage(data.currentPage);
// // //         setTotalPages(data.totalPages);
// // //         setError("");
// // //       } else {
// // //         setError(data.error || "Failed to fetch prescriptions.");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("Error fetching prescriptions.");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPrescriptions(currentPage);
// // //   }, [currentPage]);

// // //   const handleView = (consultationId) => {
// // //     navigate(`/pathologist/prescriptions/${consultationId}`);
// // //   };

// // //   const handlePrev = () => {
// // //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// // //   };

// // //   const handleNext = () => {
// // //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// // //   };

// // //   return (
// // //     <div className="pathologist-prescriptions">
// // //       <div className="pathologist-prescriptions-main">
// // //         <div className="pathologist-page-header">
// // //           <h2>Prescriptions</h2>
// // //         </div>

// // //         {error && <p className="pathologist-message error">{error}</p>}

// // //         {prescriptions.length === 0 ? (
// // //           <div className="pathologist-no-prescriptions">
// // //             <div className="pathologist-no-prescriptions-icon">📄</div>
// // //             <h3>No prescriptions available.</h3>
// // //             <p>Check back later for new prescriptions.</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="pathologist-table-container">
// // //               <table className="pathologist-prescriptions-table">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Patient Name</th>
// // //                     <th>Patient ID</th>
// // //                     <th>Doctor Name</th>
// // //                     <th>Appointment ID</th>
// // //                     <th>Consultation ID</th>
// // //                     <th>Action</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {prescriptions.map((p, index) => (
// // //                     <tr key={index}>
// // //                       <td>{p.patient_name}</td>
// // //                       <td>{p.patient_id}</td>
// // //                       <td>{p.doctor_name}</td>
// // //                       <td>{p.appointment_id}</td>
// // //                       <td>{p.consultation_id}</td>
// // //                       <td>
// // //                         <button
// // //                           className="pathologist-action-btn pathologist-prescription-btn"
// // //                           onClick={() => handleView(p.consultation_id)}
// // //                         >
// // //                           View Prescription
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>

// // //             <div className="pathologist-pagination-container">
// // //               <button
// // //                 className="pathologist-pagination-btn pathologist-prev-btn"
// // //                 onClick={handlePrev}
// // //                 disabled={currentPage === 1}
// // //               >
// // //                 Previous
// // //               </button>
// // //               <span>
// // //                 Page {currentPage} of {totalPages}
// // //               </span>
// // //               <button
// // //                 className="pathologist-pagination-btn pathologist-next-btn"
// // //                 onClick={handleNext}
// // //                 disabled={currentPage === totalPages}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PathologistPrescriptions;
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../styles/Pathologist/PathologistPrescription.css";

// // const PathologistPrescriptions = () => {
// //   const [prescriptions, setPrescriptions] = useState([]);
// //   const [error, setError] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const fetchPrescriptions = async (page) => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `http://localhost:3001/pathologist/prescriptions?page=${page}`,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       const data = await response.json();
// //       if (response.ok) {
// //         setPrescriptions(data.prescriptions);
// //         setCurrentPage(data.currentPage);
// //         setTotalPages(data.totalPages);
// //         setError("");
// //       } else {
// //         setError(data.error || "Failed to fetch prescriptions.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Error fetching prescriptions.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPrescriptions(currentPage);
// //   }, [currentPage]);

// //   const handleView = (consultationId) => {
// //     navigate(`/pathologist/prescriptions/${consultationId}`);
// //   };

// //   const handlePrev = () => {
// //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// //   };

// //   const handleNext = () => {
// //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   const handleBackToDashboard = () => {
// //     navigate("/pathologist/dashboard");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="pathologist-prescriptions">
// //         <div className="pathologist-prescriptions-header">
// //           <div className="pathologist-header-content">
// //             <div className="pathologist-logo">
// //               <h1>HealthEase</h1>
// //               <span className="pathologist-logo-subtitle">
// //                 Laboratory Management System
// //               </span>
// //             </div>
// //             <div className="pathologist-header-actions">
// //               <button
// //                 className="pathologist-back-btn"
// //                 onClick={handleBackToDashboard}
// //               >
// //                 Back to Dashboard
// //               </button>
// //               <button className="pathologist-logout-btn" onClick={handleLogout}>
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="pathologist-prescriptions-main">
// //           <div className="pathologist-loading-container">
// //             <div className="pathologist-loading-spinner"></div>
// //             <p>Loading prescriptions...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pathologist-prescriptions">
// //       <div className="pathologist-prescriptions-header">
// //         <div className="pathologist-header-content">
// //           <div className="pathologist-logo">
// //             <h1>HealthEase</h1>
// //             <span className="pathologist-logo-subtitle">
// //               Laboratory Management System
// //             </span>
// //           </div>
// //           <div className="pathologist-header-actions">
// //             <button
// //               className="pathologist-back-btn"
// //               onClick={handleBackToDashboard}
// //             >
// //               Back to Dashboard
// //             </button>
// //             <button className="pathologist-logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="pathologist-prescriptions-main">
// //         <div className="pathologist-page-header">
// //           <h2>Laboratory Prescriptions</h2>
// //           <p>Review and process pathology test prescriptions from doctors</p>
// //         </div>

// //         {error && <p className="pathologist-message error">{error}</p>}

// //         {prescriptions.length === 0 ? (
// //           <div className="pathologist-prescriptions-container">
// //             <div className="pathologist-no-prescriptions">
// //               <div className="pathologist-no-prescriptions-icon">🔬</div>
// //               <h3>No prescriptions available.</h3>
// //               <p>Check back later for new laboratory test prescriptions.</p>
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="pathologist-table-container">
// //               <table className="pathologist-prescriptions-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Patient Information</th>
// //                     <th>Doctor Name</th>
// //                     <th>Appointment ID</th>
// //                     <th>Consultation ID</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {prescriptions.map((p, index) => (
// //                     <tr key={index}>
// //                       <td data-label="Patient Information">
// //                         <div className="pathologist-patient-cell">
// //                           <span className="pathologist-patient-name">
// //                             {p.patient_name}
// //                           </span>
// //                           <span className="pathologist-patient-id">
// //                             ID: {p.patient_id}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td data-label="Doctor Name">
// //                         <span className="pathologist-doctor-name">
// //                           {p.doctor_name}
// //                         </span>
// //                       </td>
// //                       <td data-label="Appointment ID">
// //                         <span className="pathologist-appointment-id">
// //                           {p.appointment_id}
// //                         </span>
// //                       </td>
// //                       <td data-label="Consultation ID">
// //                         <span className="pathologist-consultation-id">
// //                           {p.consultation_id}
// //                         </span>
// //                       </td>
// //                       <td data-label="Action">
// //                         <button
// //                           className="pathologist-action-btn pathologist-prescription-btn"
// //                           onClick={() => handleView(p.consultation_id)}
// //                         >
// //                           View Prescription
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {totalPages > 1 && (
// //               <div className="pathologist-pagination-container">
// //                 <button
// //                   className="pathologist-pagination-btn pathologist-prev-btn"
// //                   onClick={handlePrev}
// //                   disabled={currentPage === 1}
// //                 >
// //                   Previous
// //                 </button>
// //                 <span>
// //                   Page {currentPage} of {totalPages}
// //                 </span>
// //                 <button
// //                   className="pathologist-pagination-btn pathologist-next-btn"
// //                   onClick={handleNext}
// //                   disabled={currentPage === totalPages}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PathologistPrescriptions;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Pathologist/PathologistPrescription.css";

// const PathologistPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchPrescriptions = async (page) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3001/pathologist/prescriptions?page=${page}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setPrescriptions(data.prescriptions);
//         setCurrentPage(data.currentPage);
//         setTotalPages(data.totalPages);
//         setError("");
//       } else {
//         setError(data.error || "Failed to fetch prescriptions.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching prescriptions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrescriptions(currentPage);
//   }, [currentPage]);

//   const handleView = (consultationId) => {
//     navigate(`/pathologist/prescriptions/${consultationId}`);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToDashboard = () => {
//     navigate("/pathologist/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="pathologist-prescriptions">
//         <div className="pathologist-prescriptions-header">
//           <div className="pathologist-header-content">
//             <div className="pathologist-logo">
//               <h1>HealthEase</h1>
//               <span className="pathologist-logo-subtitle">
//                 Laboratory Management System
//               </span>
//             </div>
//             <div className="pathologist-header-actions">
//               <button
//                 className="pathologist-back-btn"
//                 onClick={handleBackToDashboard}
//               >
//                 Back to Dashboard
//               </button>
//               <button className="pathologist-logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="pathologist-prescriptions-main">
//           <div className="pathologist-loading-container">
//             <div className="pathologist-loading-spinner"></div>
//             <p>Loading prescriptions...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pathologist-prescriptions">
//       <div className="pathologist-prescriptions-header">
//         <div className="pathologist-header-content">
//           <div className="pathologist-logo">
//             <h1>HealthEase</h1>
//             <span className="pathologist-logo-subtitle">
//               Laboratory Management System
//             </span>
//           </div>
//           <div className="pathologist-header-actions">
//             <button
//               className="pathologist-back-btn"
//               onClick={handleBackToDashboard}
//             >
//               Back to Dashboard
//             </button>
//             <button className="pathologist-logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="pathologist-prescriptions-main">
//         <div className="pathologist-page-header">
//           <h2>Laboratory Prescriptions</h2>
//           <p>Review and process pathology test prescriptions from doctors</p>
//         </div>

//         {error && <p className="pathologist-message error">{error}</p>}

//         {prescriptions.length === 0 ? (
//           <div className="pathologist-prescriptions-container">
//             <div className="pathologist-no-prescriptions">
//               <div className="pathologist-no-prescriptions-icon">🔬</div>
//               <h3>No prescriptions available.</h3>
//               <p>Check back later for new laboratory test prescriptions.</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="pathologist-table-container">
//               <table className="pathologist-prescriptions-table">
//                 <thead>
//                   <tr>
//                     <th>Patient Name</th>
//                     <th>Patient ID</th>
//                     <th>Doctor Name</th>
//                     <th>Consultation ID</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {prescriptions.map((p, index) => (
//                     <tr key={index}>
//                       <td data-label="Patient Name">
//                         <span className="pathologist-patient-name">
//                           {p.patient_name}
//                         </span>
//                       </td>
//                       <td data-label="Patient ID">
//                         <span className="pathologist-patient-id">
//                           {p.patient_id}
//                         </span>
//                       </td>
//                       <td data-label="Doctor Name">
//                         <span className="pathologist-doctor-name">
//                           {p.doctor_name}
//                         </span>
//                       </td>
//                       <td data-label="Consultation ID">
//                         <span className="pathologist-consultation-id">
//                           {p.consultation_id}
//                         </span>
//                       </td>
//                       <td data-label="Action">
//                         <button
//                           className="pathologist-action-btn pathologist-prescription-btn"
//                           onClick={() => handleView(p.consultation_id)}
//                         >
//                           View Prescription
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {totalPages > 1 && (
//               <div className="pathologist-pagination-container">
//                 <button
//                   className="pathologist-pagination-btn pathologist-prev-btn"
//                   onClick={handlePrev}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   className="pathologist-pagination-btn pathologist-next-btn"
//                   onClick={handleNext}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PathologistPrescriptions;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Pathologist/PathologistPrescription.css";

const PathologistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPrescriptions = async (page) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/pathologist/prescriptions?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setPrescriptions(data.prescriptions);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setError("");
      } else {
        setError(data.error || "Failed to fetch prescriptions.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions(currentPage);
  }, [currentPage]);

  const handleView = (consultationId) => {
    navigate(`/pathologist/prescriptions/${consultationId}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/pathologist/dashboard");
  };

  if (loading) {
    return (
      <div className="pathologist-prescriptions">
        <div className="pathologist-prescriptions-header">
          <div className="pathologist-header-content">
            <div className="pathologist-logo">
              <h1>HealthEase</h1>
              <span className="pathologist-logo-subtitle">
                Laboratory Management System
              </span>
            </div>
            <div className="pathologist-header-actions">
              <button
                className="pathologist-back-btn"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <button className="pathologist-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="pathologist-prescriptions-main">
          <div className="pathologist-loading-container">
            <div className="pathologist-loading-spinner"></div>
            <p>Loading prescriptions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pathologist-prescriptions">
      <div className="pathologist-prescriptions-header">
        <div className="pathologist-header-content">
          <div className="pathologist-logo">
            <h1>HealthEase</h1>
            <span className="pathologist-logo-subtitle">
              Laboratory Management System
            </span>
          </div>
          <div className="pathologist-header-actions">
            <button
              className="pathologist-back-btn"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>
            <button className="pathologist-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="pathologist-prescriptions-main">
        <div className="pathologist-page-header">
          <h2>Laboratory Prescriptions</h2>
          <p>Review and process pathology test prescriptions from doctors</p>
        </div>

        {error && <p className="pathologist-message error">{error}</p>}

        {prescriptions.length === 0 ? (
          <div className="pathologist-prescriptions-container">
            <div className="pathologist-no-prescriptions">
              <div className="pathologist-no-prescriptions-icon">🔬</div>
              <h3>No prescriptions available.</h3>
              <p>Check back later for new laboratory test prescriptions.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="pathologist-table-container">
              <table className="pathologist-prescriptions-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Consultation ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p, index) => (
                    <tr key={index}>
                      <td data-label="Patient Name">
                        <span className="pathologist-patient-name">
                          {p.patient_name}
                        </span>
                      </td>
                      <td data-label="Doctor Name">
                        <span className="pathologist-doctor-name">
                          {p.doctor_name}
                        </span>
                      </td>
                      <td data-label="Consultation ID">
                        <span className="pathologist-consultation-id">
                          {p.consultation_id}
                        </span>
                      </td>
                      <td data-label="Action">
                        <button
                          className="pathologist-action-btn pathologist-prescription-btn"
                          onClick={() => handleView(p.consultation_id)}
                        >
                          View Prescription
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pathologist-pagination-container">
                <button
                  className="pathologist-pagination-btn pathologist-prev-btn"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pathologist-pagination-btn pathologist-next-btn"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PathologistPrescriptions;
