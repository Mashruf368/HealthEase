// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Admin/AdminPrescription.css";

// const AdminPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchPrescriptions = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:3001/admin/prescriptions?page=${currentPage}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         const data = await res.json();

//         if (res.ok) {
//           setPrescriptions(data.prescriptions);
//           setTotalPages(data.totalPages);
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
//   }, [token, navigate, currentPage]);

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
//     navigate("/admin/dashboard");
//   };

//   const renderPagination = () => {
//     const buttons = [];
//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     for (let i = start; i <= end; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return (
//       <div className="pagination-container">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="pagination-btn prev-btn"
//         >
//           ← Prev
//         </button>
//         {buttons}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="pagination-btn next-btn"
//         >
//           Next →
//         </button>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="admin-prescriptions">
//         <header className="prescriptions-header">
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
//           <p>Loading prescriptions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-prescriptions">
//       {/* Header */}
//       <header className="prescriptions-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Admin Portal</span>
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
//       </header>

//       {/* Main Content */}
//       <main className="prescriptions-main">
//         <div className="page-header">
//           <h2>Patient Prescriptions</h2>
//           <p>View and manage all patient prescriptions in the system</p>
//         </div>

//         {message && (
//           <div
//             className={`message ${
//               message.includes("Failed") ? "error" : "success"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <div className="prescriptions-container">
//           {prescriptions.length === 0 ? (
//             <div className="no-prescriptions">
//               <div className="no-prescriptions-icon">📋</div>
//               <h3>No Prescriptions Found</h3>
//               <p>
//                 No prescriptions are available at the moment or no results match
//                 your criteria.
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="table-container">
//                 <table className="prescriptions-table">
//                   {/* <thead>
//                     <tr>
//                       <th>Patient</th>
//                       <th>Doctor</th>
//                       <th>Consultation ID</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {prescriptions.map((p, idx) => (
//                       <tr key={idx}>
//                         <td>
//                           <div className="patient-cell">
//                             <span className="patient-name">
//                               {p.patient_name}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 navigate(`/admin/patient/${p.patient_id}`)
//                               }
//                               className="action-btn profile-btn"
//                             >
//                               View Profile
//                             </button>
//                           </div>
//                         </td>
//                         <td>
//                           <span className="doctor-name">{p.doctor_name}</span>
//                         </td>
//                         <td>
//                           <span className="appointment-id">
//                             #{p.appointment_id}
//                           </span>
//                         </td>
//                         <td>
//                           <span className="consultation-id">
//                             #{p.consultation_id}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/admin/prescription/${p.consultation_id}`
//                               )
//                             }
//                             className="action-btn prescription-btn"
//                           >
//                             View Prescription
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody> */}
//                   <thead>
//                     <tr>
//                       <th>Patient</th>
//                       <th>Doctor</th>
//                       <th>Consultation ID</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {prescriptions.map((p, idx) => (
//                       <tr key={idx}>
//                         <td>
//                           <div className="patient-cell">
//                             <span className="patient-name">
//                               {p.patient_name}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 navigate(`/admin/patient/${p.patient_id}`)
//                               }
//                               className="action-btn profile-btn"
//                             >
//                               View Profile
//                             </button>
//                           </div>
//                         </td>
//                         <td>
//                           <span className="doctor-name">{p.doctor_name}</span>
//                         </td>
//                         <td>
//                           <span className="consultation-id">
//                             #{p.consultation_id}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/admin/prescription/${p.consultation_id}`
//                               )
//                             }
//                             className="action-btn prescription-btn"
//                           >
//                             View Prescription
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {totalPages > 1 && renderPagination()}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminPrescriptions;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin/AdminPrescription.css";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/admin/prescriptions?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setPrescriptions(data.prescriptions);
          setTotalPages(data.totalPages);
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
  }, [token, navigate, currentPage]);

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
    navigate("/admin/dashboard");
  };

  const renderPagination = () => {
    const buttons = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`admin-pagination-btn ${
            i === currentPage ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="admin-pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="admin-pagination-btn admin-prev-btn"
        >
          ← Prev
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="admin-pagination-btn admin-next-btn"
        >
          Next →
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="admin-prescriptions">
        <header className="admin-prescriptions-header">
          <div className="admin-header-content">
            <div className="admin-logo">
              <h1>HealthEase</h1>
              <span className="admin-logo-subtitle">Admin Portal</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="admin-loading-container">
          <div className="admin-loading-spinner"></div>
          <p>Loading prescriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-prescriptions">
      {/* Header */}
      <header className="admin-prescriptions-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h1>HealthEase</h1>
            <span className="admin-logo-subtitle">Admin Portal</span>
          </div>
          <div className="admin-header-actions">
            <button className="admin-back-btn" onClick={handleBackToDashboard}>
              ← Dashboard
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-prescriptions-main">
        <div className="admin-page-header">
          <h2>Patient Prescriptions</h2>
          <p>View and manage all patient prescriptions in the system</p>
        </div>

        {message && (
          <div
            className={`admin-message ${
              message.includes("Failed") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}

        <div className="admin-prescriptions-container">
          {prescriptions.length === 0 ? (
            <div className="admin-no-prescriptions">
              <div className="admin-no-prescriptions-icon">📋</div>
              <h3>No Prescriptions Found</h3>
              <p>
                No prescriptions are available at the moment or no results match
                your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-table-container">
                <table className="admin-prescriptions-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Consultation ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((p, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="admin-patient-cell">
                            <span className="admin-patient-name">
                              {p.patient_name}
                            </span>
                            <button
                              onClick={() =>
                                navigate(`/admin/patient/${p.patient_id}`)
                              }
                              className="admin-action-btn admin-profile-btn"
                            >
                              View Profile
                            </button>
                          </div>
                        </td>
                        <td>
                          <span className="admin-doctor-name">
                            {p.doctor_name}
                          </span>
                        </td>
                        <td>
                          <span className="admin-consultation-id">
                            #{p.consultation_id}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/prescription/${p.consultation_id}`
                              )
                            }
                            className="admin-action-btn admin-prescription-btn"
                          >
                            View Prescription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && renderPagination()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPrescriptions;
