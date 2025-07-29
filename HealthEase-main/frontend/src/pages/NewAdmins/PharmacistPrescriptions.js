// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const PharmacistPrescriptions = () => {
// // // // // //   const [prescriptions, setPrescriptions] = useState([]);
// // // // // //   const [error, setError] = useState("");
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     const fetchPrescriptions = async () => {
// // // // // //       try {
// // // // // //         const token = localStorage.getItem("token");
// // // // // //         const response = await fetch(
// // // // // //           "http://localhost:3001/pharmacist/prescriptions",
// // // // // //           {
// // // // // //             headers: {
// // // // // //               "Content-Type": "application/json",
// // // // // //               token: token,
// // // // // //             },
// // // // // //           }
// // // // // //         );

// // // // // //         const data = await response.json();
// // // // // //         if (response.ok) {
// // // // // //           setPrescriptions(data);
// // // // // //         } else {
// // // // // //           setError(data.error || "Failed to fetch prescriptions.");
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error(err);
// // // // // //         setError("Error fetching prescriptions.");
// // // // // //       }
// // // // // //     };

// // // // // //     fetchPrescriptions();
// // // // // //   }, []);

// // // // // //   const handleView = (consultationId) => {
// // // // // //     navigate(`/pharmacist/prescriptions/${consultationId}`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="prescriptions-page">
// // // // // //       <h2>Prescriptions</h2>

// // // // // //       {error && <p className="error-message">{error}</p>}

// // // // // //       {prescriptions.length === 0 ? (
// // // // // //         <p>No prescriptions available.</p>
// // // // // //       ) : (
// // // // // //         <table className="prescriptions-table">
// // // // // //           <thead>
// // // // // //             <tr>
// // // // // //               <th>Patient Name</th>
// // // // // //               <th>Patient ID</th>
// // // // // //               <th>Doctor Name</th>
// // // // // //               <th>Appointment ID</th>
// // // // // //               <th>Consultation ID</th>
// // // // // //               <th>Action</th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody>
// // // // // //             {prescriptions.map((p, index) => (
// // // // // //               <tr key={index}>
// // // // // //                 <td>{p.patient_name}</td>
// // // // // //                 <td>{p.patient_id}</td>
// // // // // //                 <td>{p.doctor_name}</td>
// // // // // //                 <td>{p.appointment_id}</td>
// // // // // //                 <td>{p.consultation_id}</td>
// // // // // //                 <td>
// // // // // //                   <button onClick={() => handleView(p.consultation_id)}>
// // // // // //                     View Prescription
// // // // // //                   </button>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PharmacistPrescriptions;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const PharmacistPrescriptions = () => {
// // // // //   const [prescriptions, setPrescriptions] = useState([]);
// // // // //   const [error, setError] = useState("");
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // //   const navigate = useNavigate();

// // // // //   const fetchPrescriptions = async (page = 1) => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await fetch(
// // // // //         `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
// // // // //         {
// // // // //           headers: {
// // // // //             "Content-Type": "application/json",
// // // // //             token: token,
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       const data = await response.json();
// // // // //       if (response.ok) {
// // // // //         setPrescriptions(data.prescriptions || []);
// // // // //         setCurrentPage(data.currentPage);
// // // // //         setTotalPages(data.totalPages);
// // // // //       } else {
// // // // //         setError(data.error || "Failed to fetch prescriptions.");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       setError("Error fetching prescriptions.");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchPrescriptions(currentPage);
// // // // //   }, [currentPage]);

// // // // //   const handleView = (consultationId) => {
// // // // //     navigate(`/pharmacist/prescriptions/${consultationId}`);
// // // // //   };

// // // // //   const handlePrev = () => {
// // // // //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// // // // //   };

// // // // //   const handleNext = () => {
// // // // //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// // // // //   };

// // // // //   return (
// // // // //     <div className="prescriptions-page">
// // // // //       <h2>Prescriptions</h2>

// // // // //       {error && <p className="error-message">{error}</p>}

// // // // //       {prescriptions.length === 0 ? (
// // // // //         <p>No prescriptions available.</p>
// // // // //       ) : (
// // // // //         <>
// // // // //           <table className="prescriptions-table">
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <th>Patient Name</th>
// // // // //                 <th>Patient ID</th>
// // // // //                 <th>Doctor Name</th>
// // // // //                 <th>Appointment ID</th>
// // // // //                 <th>Consultation ID</th>
// // // // //                 <th>Action</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {prescriptions.map((p, index) => (
// // // // //                 <tr key={index}>
// // // // //                   <td>{p.patient_name}</td>
// // // // //                   <td>{p.patient_id}</td>
// // // // //                   <td>{p.doctor_name}</td>
// // // // //                   <td>{p.appointment_id}</td>
// // // // //                   <td>{p.consultation_id}</td>
// // // // //                   <td>
// // // // //                     <button onClick={() => handleView(p.consultation_id)}>
// // // // //                       View Prescription
// // // // //                     </button>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>

// // // // //           {/* Pagination Controls */}
// // // // //           <div className="pagination-controls">
// // // // //             <button onClick={handlePrev} disabled={currentPage === 1}>
// // // // //               Previous
// // // // //             </button>
// // // // //             <span>
// // // // //               Page {currentPage} of {totalPages}
// // // // //             </span>
// // // // //             <button onClick={handleNext} disabled={currentPage === totalPages}>
// // // // //               Next
// // // // //             </button>
// // // // //           </div>
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PharmacistPrescriptions;
// // // // import React, { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "../../styles/Pharmacist/PharmacistPrescription.css";

// // // // const PharmacistPrescriptions = () => {
// // // //   const [prescriptions, setPrescriptions] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);

// // // //   const navigate = useNavigate();
// // // //   const token = localStorage.getItem("token");

// // // //   useEffect(() => {
// // // //     if (!token) {
// // // //       navigate("/login");
// // // //       return;
// // // //     }

// // // //     fetchPrescriptions(currentPage);
// // // //   }, [currentPage, token, navigate]);

// // // //   const fetchPrescriptions = async (page = 1) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await fetch(
// // // //         `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
// // // //         {
// // // //           method: "GET",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             token: token,
// // // //           },
// // // //         }
// // // //       );

// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         setPrescriptions(data.prescriptions || []);
// // // //         setCurrentPage(data.currentPage);
// // // //         setTotalPages(data.totalPages);
// // // //         setError("");
// // // //       } else {
// // // //         setError(data.error || "Failed to fetch prescriptions.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Fetch error:", err);
// // // //       setError("Error fetching prescriptions.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleView = (consultationId) => {
// // // //     navigate(`/pharmacist/prescriptions/${consultationId}`);
// // // //   };

// // // //   const handlePageChange = (page) => {
// // // //     if (page >= 1 && page <= totalPages && page !== currentPage) {
// // // //       setCurrentPage(page);
// // // //     }
// // // //   };

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("token");
// // // //     navigate("/login");
// // // //   };

// // // //   const handleBackToDashboard = () => {
// // // //     navigate("/pharmacist/dashboard");
// // // //   };

// // // //   const renderPagination = () => {
// // // //     if (totalPages <= 1) return null;

// // // //     const buttons = [];
// // // //     const start = Math.max(1, currentPage - 2);
// // // //     const end = Math.min(totalPages, currentPage + 2);

// // // //     for (let i = start; i <= end; i++) {
// // // //       buttons.push(
// // // //         <button
// // // //           key={i}
// // // //           onClick={() => handlePageChange(i)}
// // // //           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
// // // //         >
// // // //           {i}
// // // //         </button>
// // // //       );
// // // //     }

// // // //     return (
// // // //       <div className="pagination-container">
// // // //         <button
// // // //           onClick={() => handlePageChange(currentPage - 1)}
// // // //           disabled={currentPage === 1}
// // // //           className="pagination-btn prev-btn"
// // // //         >
// // // //           ← Prev
// // // //         </button>
// // // //         {buttons}
// // // //         <button
// // // //           onClick={() => handlePageChange(currentPage + 1)}
// // // //           disabled={currentPage === totalPages}
// // // //           className="pagination-btn next-btn"
// // // //         >
// // // //           Next →
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="pharmacist-prescriptions">
// // // //         <header className="prescriptions-header">
// // // //           <div className="header-content">
// // // //             <div className="logo">
// // // //               <h1>HealthEase</h1>
// // // //               <span className="logo-subtitle">Pharmacist Portal</span>
// // // //             </div>
// // // //             <button className="logout-btn" onClick={handleLogout}>
// // // //               Logout
// // // //             </button>
// // // //           </div>
// // // //         </header>
// // // //         <div className="loading-container">
// // // //           <div className="loading-spinner"></div>
// // // //           <p>Loading prescriptions...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="pharmacist-prescriptions">
// // // //       {/* Header */}
// // // //       <header className="prescriptions-header">
// // // //         <div className="header-content">
// // // //           <div className="logo">
// // // //             <h1>HealthEase</h1>
// // // //             <span className="logo-subtitle">Pharmacist Portal</span>
// // // //           </div>
// // // //           <div className="header-actions">
// // // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // // //               ← Dashboard
// // // //             </button>
// // // //             <button className="logout-btn" onClick={handleLogout}>
// // // //               Logout
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content */}
// // // //       <main className="prescriptions-main">
// // // //         <div className="page-header">
// // // //           <h2>Patient Prescriptions</h2>
// // // //           <p>View and manage all patient prescriptions for dispensing</p>
// // // //         </div>

// // // //         {error && (
// // // //           <div className="message error">
// // // //             {error}
// // // //           </div>
// // // //         )}

// // // //         <div className="prescriptions-container">
// // // //           {prescriptions.length === 0 ? (
// // // //             <div className="no-prescriptions">
// // // //               <div className="no-prescriptions-icon">💊</div>
// // // //               <h3>No Prescriptions Found</h3>
// // // //               <p>
// // // //                 No prescriptions are available at the moment or no results match
// // // //                 your criteria.
// // // //               </p>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <div className="table-container">
// // // //                 <table className="prescriptions-table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       <th>Patient</th>
// // // //                       <th>Patient ID</th>
// // // //                       <th>Doctor</th>
// // // //                       <th>Appointment ID</th>
// // // //                       <th>Consultation ID</th>
// // // //                       <th>Actions</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {prescriptions.map((p, idx) => (
// // // //                       <tr key={idx}>
// // // //                         <td>
// // // //                           <div className="patient-cell">
// // // //                             <span className="patient-name">
// // // //                               {p.patient_name}
// // // //                             </span>
// // // //                           </div>
// // // //                         </td>
// // // //                         <td>
// // // //                           <span className="patient-id">
// // // //                             #{p.patient_id}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td>
// // // //                           <span className="doctor-name">
// // // //                             Dr. {p.doctor_name}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td>
// // // //                           <span className="appointment-id">
// // // //                             #{p.appointment_id}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td>
// // // //                           <span className="consultation-id">
// // // //                             #{p.consultation_id}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td>
// // // //                           <button
// // // //                             onClick={() => handleView(p.consultation_id)}
// // // //                             className="action-btn prescription-btn"
// // // //                           >
// // // //                             View Prescription
// // // //                           </button>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //               {renderPagination()}
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PharmacistPrescriptions;
// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // //import "../../styles/Pharmacist/PharmacistPrescription.css";

// // // const PharmacistPrescriptions = () => {
// // //   const [prescriptions, setPrescriptions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);

// // //   const navigate = useNavigate();
// // //   const token = localStorage.getItem("token");

// // //   useEffect(() => {
// // //     if (!token) {
// // //       navigate("/login");
// // //       return;
// // //     }

// // //     fetchPrescriptions(currentPage);
// // //   }, [currentPage, token, navigate]);

// // //   const fetchPrescriptions = async (page = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
// // //         {
// // //           method: "GET",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //         }
// // //       );

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         setPrescriptions(data.prescriptions || []);
// // //         setCurrentPage(data.currentPage);
// // //         setTotalPages(data.totalPages);
// // //         setError("");
// // //       } else {
// // //         setError(data.error || "Failed to fetch prescriptions.");
// // //       }
// // //     } catch (err) {
// // //       console.error("Fetch error:", err);
// // //       setError("Error fetching prescriptions.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleView = (consultationId) => {
// // //     navigate(`/pharmacist/prescriptions/${consultationId}`);
// // //   };

// // //   const handlePageChange = (page) => {
// // //     if (page >= 1 && page <= totalPages && page !== currentPage) {
// // //       setCurrentPage(page);
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     navigate("/login");
// // //   };

// // //   const handleBackToDashboard = () => {
// // //     navigate("/pharmacist/dashboard");
// // //   };

// // //   const renderPagination = () => {
// // //     if (totalPages <= 1) return null;

// // //     const buttons = [];
// // //     const start = Math.max(1, currentPage - 2);
// // //     const end = Math.min(totalPages, currentPage + 2);

// // //     for (let i = start; i <= end; i++) {
// // //       buttons.push(
// // //         <button
// // //           key={i}
// // //           onClick={() => handlePageChange(i)}
// // //           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
// // //         >
// // //           {i}
// // //         </button>
// // //       );
// // //     }

// // //     return (
// // //       <div className="pagination-container">
// // //         <button
// // //           onClick={() => handlePageChange(currentPage - 1)}
// // //           disabled={currentPage === 1}
// // //           className="pagination-btn prev-btn"
// // //         >
// // //           ← Prev
// // //         </button>
// // //         {buttons}
// // //         <button
// // //           onClick={() => handlePageChange(currentPage + 1)}
// // //           disabled={currentPage === totalPages}
// // //           className="pagination-btn next-btn"
// // //         >
// // //           Next →
// // //         </button>
// // //       </div>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="pharmacist-prescriptions">
// // //         <header className="prescriptions-header">
// // //           <div className="header-content">
// // //             <div className="logo">
// // //               <h1>HealthEase</h1>
// // //               <span className="logo-subtitle">Pharmacist Portal</span>
// // //             </div>
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </header>
// // //         <div className="loading-container">
// // //           <div className="loading-spinner"></div>
// // //           <p>Loading prescriptions...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="pharmacist-prescriptions">
// // //       {/* Header */}
// // //       <header className="prescriptions-header">
// // //         <div className="header-content">
// // //           <div className="logo">
// // //             <h1>HealthEase</h1>
// // //             <span className="logo-subtitle">Pharmacist Portal</span>
// // //           </div>
// // //           <div className="header-actions">
// // //             <button className="back-btn" onClick={handleBackToDashboard}>
// // //               ← Dashboard
// // //             </button>
// // //             <button className="logout-btn" onClick={handleLogout}>
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <main className="prescriptions-main">
// // //         <div className="page-header">
// // //           <h2>Patient Prescriptions</h2>
// // //           <p>View and manage all patient prescriptions for dispensing</p>
// // //         </div>

// // //         {error && <div className="message error">{error}</div>}

// // //         <div className="prescriptions-container">
// // //           {prescriptions.length === 0 ? (
// // //             <div className="no-prescriptions">
// // //               <div className="no-prescriptions-icon">💊</div>
// // //               <h3>No Prescriptions Found</h3>
// // //               <p>
// // //                 No prescriptions are available at the moment or no results match
// // //                 your criteria.
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <div className="table-container">
// // //                 <table className="prescriptions-table">
// // //                   <thead>
// // //                     <tr>
// // //                       <th>Patient</th>
// // //                       <th>Patient ID</th>
// // //                       <th>Doctor</th>
// // //                       <th>Appointment ID</th>
// // //                       <th>Consultation ID</th>
// // //                       <th>Actions</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {prescriptions.map((p, idx) => (
// // //                       <tr key={idx}>
// // //                         <td data-label="Patient">
// // //                           <div className="patient-cell">
// // //                             <span className="patient-name">
// // //                               {p.patient_name}
// // //                             </span>
// // //                           </div>
// // //                         </td>
// // //                         <td data-label="Patient ID">
// // //                           <span className="patient-id">#{p.patient_id}</span>
// // //                         </td>
// // //                         <td data-label="Doctor">
// // //                           <span className="doctor-name">
// // //                             Dr. {p.doctor_name}
// // //                           </span>
// // //                         </td>
// // //                         <td data-label="Appointment ID">
// // //                           <span className="appointment-id">
// // //                             #{p.appointment_id}
// // //                           </span>
// // //                         </td>
// // //                         <td data-label="Consultation ID">
// // //                           <span className="consultation-id">
// // //                             #{p.consultation_id}
// // //                           </span>
// // //                         </td>
// // //                         <td data-label="Actions">
// // //                           <button
// // //                             onClick={() => handleView(p.consultation_id)}
// // //                             className="action-btn prescription-btn"
// // //                           >
// // //                             View Prescription
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //               {renderPagination()}
// // //             </>
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default PharmacistPrescriptions;
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../styles/Pharmacist/PharmacistPrescription.css";

// // const PharmacistPrescriptions = () => {
// //   const [prescriptions, setPrescriptions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (!token) {
// //       navigate("/login");
// //       return;
// //     }

// //     fetchPrescriptions(currentPage);
// //   }, [currentPage, token, navigate]);

// //   const fetchPrescriptions = async (page = 1) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       const data = await response.json();

// //       if (response.ok) {
// //         setPrescriptions(data.prescriptions || []);
// //         setCurrentPage(data.currentPage);
// //         setTotalPages(data.totalPages);
// //         setError("");
// //       } else {
// //         setError(data.error || "Failed to fetch prescriptions.");
// //       }
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //       setError("Error fetching prescriptions.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleView = (consultationId) => {
// //     navigate(`/pharmacist/prescriptions/${consultationId}`);
// //   };

// //   const handlePageChange = (page) => {
// //     if (page >= 1 && page <= totalPages && page !== currentPage) {
// //       setCurrentPage(page);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   const handleBackToDashboard = () => {
// //     navigate("/pharmacist/dashboard");
// //   };

// //   const renderPagination = () => {
// //     if (totalPages <= 1) return null;

// //     const buttons = [];
// //     const start = Math.max(1, currentPage - 2);
// //     const end = Math.min(totalPages, currentPage + 2);

// //     for (let i = start; i <= end; i++) {
// //       buttons.push(
// //         <button
// //           key={i}
// //           onClick={() => handlePageChange(i)}
// //           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
// //         >
// //           {i}
// //         </button>
// //       );
// //     }

// //     return (
// //       <div className="pagination-container">
// //         <button
// //           onClick={() => handlePageChange(currentPage - 1)}
// //           disabled={currentPage === 1}
// //           className="pagination-btn prev-btn"
// //         >
// //           ← Prev
// //         </button>
// //         {buttons}
// //         <button
// //           onClick={() => handlePageChange(currentPage + 1)}
// //           disabled={currentPage === totalPages}
// //           className="pagination-btn next-btn"
// //         >
// //           Next →
// //         </button>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="pharmacist-prescriptions">
// //         <header className="prescriptions-header">
// //           <div className="header-content">
// //             <div className="logo">
// //               <h1>HealthEase</h1>
// //               <span className="logo-subtitle">Pharmacist Portal</span>
// //             </div>
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </header>
// //         <div className="prescriptions-main">
// //           <div className="loading-container">
// //             <div className="loading-spinner"></div>
// //             <p>Loading prescriptions...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pharmacist-prescriptions">
// //       {/* Header */}
// //       <header className="prescriptions-header">
// //         <div className="header-content">
// //           <div className="logo">
// //             <h1>HealthEase</h1>
// //             <span className="logo-subtitle">Pharmacist Portal</span>
// //           </div>
// //           <div className="header-actions">
// //             <button className="back-btn" onClick={handleBackToDashboard}>
// //               ← Dashboard
// //             </button>
// //             <button className="logout-btn" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="prescriptions-main">
// //         <div className="page-header">
// //           <h2>Patient Prescriptions</h2>
// //           <p>View and manage all patient prescriptions for dispensing</p>
// //         </div>

// //         {error && <div className="message error">{error}</div>}

// //         <div className="prescriptions-container">
// //           {prescriptions.length === 0 ? (
// //             <div className="no-prescriptions">
// //               <div className="no-prescriptions-icon">💊</div>
// //               <h3>No Prescriptions Found</h3>
// //               <p>
// //                 No prescriptions are available at the moment or no results match
// //                 your criteria.
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="table-container">
// //                 <table className="prescriptions-table">
// //                   <thead>
// //                     <tr>
// //                       <th>Patient Information</th>
// //                       <th>Patient ID</th>
// //                       <th>Doctor</th>
// //                       <th>Appointment ID</th>
// //                       <th>Consultation ID</th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {prescriptions.map((prescription, idx) => (
// //                       <tr key={`${prescription.consultation_id}-${idx}`}>
// //                         <td data-label="Patient Information">
// //                           <div className="patient-cell">
// //                             <span className="patient-name">
// //                               {prescription.patient_name}
// //                             </span>
// //                           </div>
// //                         </td>
// //                         <td data-label="Patient ID">
// //                           <span className="patient-id">
// //                             #{prescription.patient_id}
// //                           </span>
// //                         </td>
// //                         <td data-label="Doctor">
// //                           <span className="doctor-name">
// //                             Dr. {prescription.doctor_name}
// //                           </span>
// //                         </td>
// //                         <td data-label="Appointment ID">
// //                           <span className="appointment-id">
// //                             #{prescription.appointment_id}
// //                           </span>
// //                         </td>
// //                         <td data-label="Consultation ID">
// //                           <span className="consultation-id">
// //                             #{prescription.consultation_id}
// //                           </span>
// //                         </td>
// //                         <td data-label="Actions">
// //                           <button
// //                             onClick={() =>
// //                               handleView(prescription.consultation_id)
// //                             }
// //                             className="action-btn prescription-btn"
// //                             aria-label={`View prescription for ${prescription.patient_name}`}
// //                           >
// //                             View Prescription
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               {renderPagination()}
// //             </>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default PharmacistPrescriptions;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Pharmacist/PharmacistPrescription.css";

// const PharmacistPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetchPrescriptions(currentPage);
//   }, [currentPage, token, navigate]);

//   const fetchPrescriptions = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/pharmacist/prescriptions?page=${page}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setPrescriptions(data.prescriptions || []);
//         setCurrentPage(data.currentPage);
//         setTotalPages(data.totalPages);
//         setError("");
//       } else {
//         setError(data.error || "Failed to fetch prescriptions.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Error fetching prescriptions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = (consultationId) => {
//     navigate(`/pharmacist/prescriptions/${consultationId}`);
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages && page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToDashboard = () => {
//     navigate("/pharmacist/dashboard");
//   };

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const buttons = [];
//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     for (let i = start; i <= end; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`pharmacist-pagination-btn ${
//             i === currentPage ? "active" : ""
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return (
//       <div className="pharmacist-pagination-container">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="pharmacist-pagination-btn pharmacist-prev-btn"
//         >
//           ← Prev
//         </button>
//         {buttons}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="pharmacist-pagination-btn pharmacist-next-btn"
//         >
//           Next →
//         </button>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="pharmacist-prescriptions">
//         <header className="pharmacist-prescriptions-header">
//           <div className="pharmacist-header-content">
//             <div className="pharmacist-logo">
//               <h1>HealthEase</h1>
//               <span className="pharmacist-logo-subtitle">
//                 Pharmacist Portal
//               </span>
//             </div>
//             <button className="pharmacist-logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </header>
//         <div className="pharmacist-prescriptions-main">
//           <div className="pharmacist-loading-container">
//             <div className="pharmacist-loading-spinner"></div>
//             <p>Loading prescriptions...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pharmacist-prescriptions">
//       {/* Header */}
//       <header className="pharmacist-prescriptions-header">
//         <div className="pharmacist-header-content">
//           <div className="pharmacist-logo">
//             <h1>HealthEase</h1>
//             <span className="pharmacist-logo-subtitle">Pharmacist Portal</span>
//           </div>
//           <div className="pharmacist-header-actions">
//             <button
//               className="pharmacist-back-btn"
//               onClick={handleBackToDashboard}
//             >
//               ← Dashboard
//             </button>
//             <button className="pharmacist-logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="pharmacist-prescriptions-main">
//         <div className="pharmacist-page-header">
//           <h2>Patient Prescriptions</h2>
//           <p>View and manage all patient prescriptions for dispensing</p>
//         </div>

//         {error && <div className="pharmacist-message error">{error}</div>}

//         <div className="pharmacist-prescriptions-container">
//           {prescriptions.length === 0 ? (
//             <div className="pharmacist-no-prescriptions">
//               <div className="pharmacist-no-prescriptions-icon">💊</div>
//               <h3>No Prescriptions Found</h3>
//               <p>
//                 No prescriptions are available at the moment or no results match
//                 your criteria.
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="pharmacist-table-container">
//                 <table className="pharmacist-prescriptions-table">
//                   <thead>
//                     <tr>
//                       <th>Patient Information</th>
//                       <th>Patient ID</th>
//                       <th>Doctor</th>
//                       <th>Appointment ID</th>
//                       <th>Consultation ID</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {prescriptions.map((prescription, idx) => (
//                       <tr key={`${prescription.consultation_id}-${idx}`}>
//                         <td data-label="Patient Information">
//                           <div className="pharmacist-patient-cell">
//                             <span className="pharmacist-patient-name">
//                               {prescription.patient_name}
//                             </span>
//                           </div>
//                         </td>
//                         <td data-label="Patient ID">
//                           <span className="pharmacist-patient-id">
//                             #{prescription.patient_id}
//                           </span>
//                         </td>
//                         <td data-label="Doctor">
//                           <span className="pharmacist-doctor-name">
//                             Dr. {prescription.doctor_name}
//                           </span>
//                         </td>
//                         <td data-label="Appointment ID">
//                           <span className="pharmacist-appointment-id">
//                             #{prescription.appointment_id}
//                           </span>
//                         </td>
//                         <td data-label="Consultation ID">
//                           <span className="pharmacist-consultation-id">
//                             #{prescription.consultation_id}
//                           </span>
//                         </td>
//                         <td data-label="Actions">
//                           <button
//                             onClick={() =>
//                               handleView(prescription.consultation_id)
//                             }
//                             className="pharmacist-action-btn pharmacist-prescription-btn"
//                             aria-label={`View prescription for ${prescription.patient_name}`}
//                           >
//                             View Prescription
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {renderPagination()}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PharmacistPrescriptions;
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
                      <th>Patient ID</th>
                      <th>Doctor</th>
                      <th>Appointment ID</th>
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
                        <td data-label="Patient ID">
                          <span className="pharmacist-patient-id">
                            #{prescription.patient_id}
                          </span>
                        </td>
                        <td data-label="Doctor">
                          <span className="pharmacist-doctor-name">
                            Dr. {prescription.doctor_name}
                          </span>
                        </td>
                        <td data-label="Appointment ID">
                          <span className="pharmacist-appointment-id">
                            #{prescription.appointment_id}
                          </span>
                        </td>
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
