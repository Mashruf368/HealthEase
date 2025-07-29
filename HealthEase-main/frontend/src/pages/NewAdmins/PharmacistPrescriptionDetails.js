// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const PharmacistPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const navigate = useNavigate();

// //   const [data, setData] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [quantities, setQuantities] = useState({});

// //   useEffect(() => {
// //     const fetchPrescription = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const response = await fetch(
// //           `http://localhost:3001/pharmacist/prescriptions/${id}`,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               token: token,
// //             },
// //           }
// //         );

// //         const result = await response.json();
// //         if (response.ok) {
// //           setData(result);

// //           // Initialize quantities
// //           const initialQuantities = {};
// //           result.medicines.forEach((med) => {
// //             initialQuantities[med.medicine_id] = 1;
// //           });
// //           setQuantities(initialQuantities);
// //         } else {
// //           setMessage(result.error || "Failed to fetch prescription details.");
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         setMessage("Error fetching prescription details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPrescription();
// //   }, [id]);

// //   const handleQuantityChange = (medicineId, value) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [medicineId]: value,
// //     }));
// //   };

// //   const handleAddToCart = async (medicineId) => {
// //     const token = localStorage.getItem("token");
// //     const createdAt = new Date().toISOString();
// //     const amount = parseInt(quantities[medicineId]) || 1;

// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/pharmacist/buy/${id}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //           body: JSON.stringify({
// //             item_type: 1,
// //             item_id: medicineId,
// //             amount: amount,
// //             created_at: createdAt,
// //           }),
// //         }
// //       );

// //       const result = await response.json();
// //       if (response.ok) {
// //         setSuccessMessage(`✔️ ${result.message}`);
// //         setTimeout(() => setSuccessMessage(""), 3000);
// //       } else {
// //         setMessage(result.error || "Failed to add to cart.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Error adding to cart.");
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (message) return <p>{message}</p>;

// //   const { prescription, medicines } = data;

// //   return (
// //     <div>
// //       <h2>Prescription Details</h2>
// //       <h3>Doctor: {prescription.name}</h3>
// //       <h4>
// //         Patient: {prescription.patient_name}{" "}
// //         <button
// //           onClick={() =>
// //             navigate(`/pharmacist/patient/${prescription.patient_id}`)
// //           }
// //         >
// //           View Patient
// //         </button>
// //       </h4>
// //       <p>
// //         <strong>Symptoms:</strong> {prescription.symptoms}
// //       </p>
// //       <p>
// //         <strong>Comments:</strong> {prescription.comments}
// //       </p>
// //       <p>
// //         <strong>Details:</strong> {prescription.details}
// //       </p>

// //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

// //       <h3>Medicines</h3>
// //       {medicines.length === 0 ? (
// //         <p>No medicines prescribed.</p>
// //       ) : (
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Medicine ID</th>
// //               <th>Medicine Name</th>
// //               <th>Dosage</th>
// //               <th>Duration</th>
// //               <th>Quantity</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {medicines.map((med, index) => (
// //               <tr key={index}>
// //                 <td>{med.medicine_id}</td>
// //                 <td>{med.name}</td>
// //                 <td>{med.dosage}</td>
// //                 <td>{med.duration}</td>
// //                 <td>
// //                   <input
// //                     type="number"
// //                     value={quantities[med.medicine_id] || ""}
// //                     onChange={(e) =>
// //                       handleQuantityChange(med.medicine_id, e.target.value)
// //                     }
// //                     style={{ width: "60px" }}
// //                   />
// //                 </td>
// //                 <td>
// //                   <button onClick={() => handleAddToCart(med.medicine_id)}>
// //                     Add to Cart
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default PharmacistPrescriptionDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/Pharmacist/PharmacistPrescriptionDetails.css";

// const PharmacistPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [quantities, setQuantities] = useState({});

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           `http://localhost:3001/pharmacist/prescriptions/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         const result = await response.json();
//         if (response.ok) {
//           setData(result);

//           // Initialize quantities
//           const initialQuantities = {};
//           result.medicines.forEach((med) => {
//             initialQuantities[med.medicine_id] = 1;
//           });
//           setQuantities(initialQuantities);
//         } else {
//           setMessage(result.error || "Failed to fetch prescription details.");
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage("Error fetching prescription details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescription();
//   }, [id]);

//   const handleQuantityChange = (medicineId, value) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [medicineId]: value,
//     }));
//   };

//   const handleAddToCart = async (medicineId) => {
//     const token = localStorage.getItem("token");
//     const createdAt = new Date().toISOString();
//     const amount = parseInt(quantities[medicineId]) || 1;

//     try {
//       const response = await fetch(
//         `http://localhost:3001/pharmacist/buy/${id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({
//             item_type: 1,
//             item_id: medicineId,
//             amount: amount,
//             created_at: createdAt,
//           }),
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         setSuccessMessage(`✔️ ${result.message}`);
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } else {
//         setMessage(result.error || "Failed to add to cart.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Error adding to cart.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToPrescriptions = () => {
//     navigate("/pharmacist/prescriptions");
//   };

//   if (loading) {
//     return (
//       <div className="pharmacist-prescription-details">
//         <header className="pharmacist-details-header">
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
//         <div className="pharmacist-loading-container">
//           <div className="loading-spinner"></div>
//           <p className="pharmacist-loading-text">
//             Loading prescription details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (message) {
//     return (
//       <div className="pharmacist-prescription-details">
//         <header className="pharmacist-details-header">
//           <div className="pharmacist-header-content">
//             <div className="pharmacist-logo">
//               <h1>HealthEase</h1>
//               <span className="pharmacist-logo-subtitle">
//                 Pharmacist Portal
//               </span>
//             </div>
//             <div className="pharmacist-header-actions">
//               <button
//                 className="pharmacist-back-btn"
//                 onClick={handleBackToPrescriptions}
//               >
//                 ← Prescriptions
//               </button>
//               <button className="pharmacist-logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </header>
//         <main className="pharmacist-details-main">
//           <div className="pharmacist-message error">{message}</div>
//         </main>
//       </div>
//     );
//   }

//   if (!data || !data.prescription) {
//     return (
//       <div className="pharmacist-prescription-details">
//         <header className="pharmacist-details-header">
//           <div className="pharmacist-header-content">
//             <div className="pharmacist-logo">
//               <h1>HealthEase</h1>
//               <span className="pharmacist-logo-subtitle">
//                 Pharmacist Portal
//               </span>
//             </div>
//             <div className="pharmacist-header-actions">
//               <button
//                 className="pharmacist-back-btn"
//                 onClick={handleBackToPrescriptions}
//               >
//                 ← Prescriptions
//               </button>
//               <button className="pharmacist-logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </header>
//         <main className="pharmacist-details-main">
//           <div className="pharmacist-message error">
//             No prescription data found.
//           </div>
//         </main>
//       </div>
//     );
//   }

//   const { prescription, medicines } = data;

//   return (
//     <div className="pharmacist-prescription-details">
//       {/* Header */}
//       <header className="pharmacist-details-header">
//         <div className="pharmacist-header-content">
//           <div className="pharmacist-logo">
//             <h1>HealthEase</h1>
//             <span className="pharmacist-logo-subtitle">Pharmacist Portal</span>
//           </div>
//           <div className="pharmacist-header-actions">
//             <button
//               className="pharmacist-back-btn"
//               onClick={handleBackToPrescriptions}
//             >
//               ← Prescriptions
//             </button>
//             <button className="pharmacist-logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="pharmacist-details-main">
//         <div className="pharmacist-page-header">
//           <h2>Prescription Details</h2>
//           <p>Review and dispense prescribed medications to patients</p>
//         </div>

//         <div className="pharmacist-prescription-content">
//           {/* Basic Information */}
//           <div className="pharmacist-prescription-info">
//             <div className="pharmacist-doctor-section">
//               <h3 className="pharmacist-doctor-title">{prescription.name}</h3>
//             </div>

//             <div className="pharmacist-patient-section">
//               <div className="pharmacist-patient-header">
//                 <h4 className="pharmacist-patient-title">
//                   {prescription.patient_name}
//                 </h4>
//                 <button
//                   className="pharmacist-view-patient-btn"
//                   onClick={() =>
//                     navigate(`/pharmacist/patient/${prescription.patient_id}`)
//                   }
//                 >
//                   View Patient
//                 </button>
//               </div>
//             </div>

//             <div className="pharmacist-info-grid">
//               <div className="pharmacist-info-item">
//                 <div className="pharmacist-info-label">Consultation ID</div>
//                 <div className="pharmacist-info-value">#{id}</div>
//               </div>
//               <div className="pharmacist-info-item">
//                 <div className="pharmacist-info-label">Symptoms</div>
//                 <div className="pharmacist-info-value">
//                   {prescription.symptoms}
//                 </div>
//               </div>
//               <div className="pharmacist-info-item">
//                 <div className="pharmacist-info-label">Doctor Comments</div>
//                 <div className="pharmacist-info-value">
//                   {prescription.comments}
//                 </div>
//               </div>
//               <div className="pharmacist-info-item">
//                 <div className="pharmacist-info-label">Appointment Details</div>
//                 <div className="pharmacist-info-value">
//                   {prescription.details}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Success Message */}
//           {successMessage && (
//             <div className="pharmacist-success-message">{successMessage}</div>
//           )}

//           {/* Prescribed Medicines */}
//           <div className="pharmacist-medicines-section">
//             <div className="pharmacist-section-header">
//               <span className="pharmacist-section-icon">💊</span>
//               <h3 className="pharmacist-section-title">Prescribed Medicines</h3>
//             </div>

//             {medicines.length === 0 ? (
//               <div className="pharmacist-no-medicines">
//                 <div className="pharmacist-no-medicines-icon">💊</div>
//                 <p className="pharmacist-no-medicines-text">
//                   No medicines prescribed.
//                 </p>
//               </div>
//             ) : (
//               <table className="pharmacist-medicines-table">
//                 <thead>
//                   <tr>
//                     <th>Medicine ID</th>
//                     <th>Medicine Name</th>
//                     <th>Dosage</th>
//                     <th>Duration</th>
//                     <th>Quantity</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {medicines.map((med, index) => (
//                     <tr key={index}>
//                       <td
//                         data-label="Medicine ID"
//                         className="pharmacist-medicine-id"
//                       >
//                         {med.medicine_id}
//                       </td>
//                       <td
//                         data-label="Medicine Name"
//                         className="pharmacist-medicine-name"
//                       >
//                         {med.name}
//                       </td>
//                       <td
//                         data-label="Dosage"
//                         className="pharmacist-medicine-dosage"
//                       >
//                         {med.dosage}
//                       </td>
//                       <td
//                         data-label="Duration"
//                         className="pharmacist-medicine-duration"
//                       >
//                         {med.duration}
//                       </td>
//                       <td data-label="Quantity">
//                         <input
//                           type="number"
//                           className="pharmacist-quantity-input"
//                           value={quantities[med.medicine_id] || ""}
//                           onChange={(e) =>
//                             handleQuantityChange(
//                               med.medicine_id,
//                               e.target.value
//                             )
//                           }
//                           min="1"
//                           placeholder="1"
//                         />
//                       </td>
//                       <td data-label="Action">
//                         <button
//                           className="pharmacist-add-to-cart-btn"
//                           onClick={() => handleAddToCart(med.medicine_id)}
//                         >
//                           Add to Cart
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PharmacistPrescriptionDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Pharmacist/PharmacistPrescriptionDetails.css";

const PharmacistPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3001/pharmacist/prescriptions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const result = await response.json();
        if (response.ok) {
          setData(result);

          // Initialize quantities
          const initialQuantities = {};
          result.medicines.forEach((med) => {
            initialQuantities[med.medicine_id] = 1;
          });
          setQuantities(initialQuantities);
        } else {
          setMessage(result.error || "Failed to fetch prescription details.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Error fetching prescription details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleQuantityChange = (medicineId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [medicineId]: value,
    }));
  };

  const handleAddToCart = async (medicineId) => {
    const token = localStorage.getItem("token");
    const createdAt = new Date().toISOString();
    const amount = parseInt(quantities[medicineId]) || 1;

    try {
      const response = await fetch(
        `http://localhost:3001/pharmacist/buy/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            item_type: 1,
            item_id: medicineId,
            amount: amount,
            created_at: createdAt,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(`✔️ ${result.message}`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setMessage(result.error || "Failed to add to cart.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding to cart.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToPrescriptions = () => {
    navigate("/pharmacist/prescriptions");
  };

  if (loading) {
    return (
      <div className="pharmacist-prescription-details">
        <header className="pharmacist-details-header">
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
        <div className="pharmacist-loading-container">
          <div className="loading-spinner"></div>
          <p className="pharmacist-loading-text">
            Loading prescription details...
          </p>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="pharmacist-prescription-details">
        <header className="pharmacist-details-header">
          <div className="pharmacist-header-content">
            <div className="pharmacist-logo">
              <h1>HealthEase</h1>
              <span className="pharmacist-logo-subtitle">
                Pharmacist Portal
              </span>
            </div>
            <div className="pharmacist-header-actions">
              <button
                className="pharmacist-back-btn"
                onClick={handleBackToPrescriptions}
              >
                ← Prescriptions
              </button>
              <button className="pharmacist-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="pharmacist-details-main">
          <div className="pharmacist-message error">{message}</div>
        </main>
      </div>
    );
  }

  if (!data || !data.prescription) {
    return (
      <div className="pharmacist-prescription-details">
        <header className="pharmacist-details-header">
          <div className="pharmacist-header-content">
            <div className="pharmacist-logo">
              <h1>HealthEase</h1>
              <span className="pharmacist-logo-subtitle">
                Pharmacist Portal
              </span>
            </div>
            <div className="pharmacist-header-actions">
              <button
                className="pharmacist-back-btn"
                onClick={handleBackToPrescriptions}
              >
                ← Prescriptions
              </button>
              <button className="pharmacist-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="pharmacist-details-main">
          <div className="pharmacist-message error">
            No prescription data found.
          </div>
        </main>
      </div>
    );
  }

  const { prescription, medicines } = data;

  return (
    <div className="pharmacist-prescription-details">
      {/* Header */}
      <header className="pharmacist-details-header">
        <div className="pharmacist-header-content">
          <div className="pharmacist-logo">
            <h1>HealthEase</h1>
            <span className="pharmacist-logo-subtitle">Pharmacist Portal</span>
          </div>
          <div className="pharmacist-header-actions">
            <button
              className="pharmacist-back-btn"
              onClick={handleBackToPrescriptions}
            >
              ← Prescriptions
            </button>
            <button className="pharmacist-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pharmacist-details-main">
        <div className="pharmacist-page-header">
          <h2>Prescription Details</h2>
          <p>Review and dispense prescribed medications to patients</p>
        </div>

        <div className="pharmacist-prescription-content">
          {/* Basic Information */}
          <div className="pharmacist-prescription-info">
            <div className="pharmacist-doctor-section">
              <h3 className="pharmacist-doctor-title">{prescription.name}</h3>
            </div>

            <div className="pharmacist-patient-section">
              <div className="pharmacist-patient-header">
                <h4 className="pharmacist-patient-title">
                  {prescription.patient_name}
                </h4>
                <button
                  className="pharmacist-view-patient-btn"
                  onClick={() =>
                    navigate(`/pharmacist/patient/${prescription.patient_id}`)
                  }
                >
                  View Patient
                </button>
              </div>
            </div>

            <div className="pharmacist-info-grid">
              <div className="pharmacist-info-item">
                <div className="pharmacist-info-label">Consultation ID</div>
                <div className="pharmacist-info-value">#{id}</div>
              </div>
              <div className="pharmacist-info-item">
                <div className="pharmacist-info-label">Symptoms</div>
                <div className="pharmacist-info-value">
                  {prescription.symptoms}
                </div>
              </div>
              <div className="pharmacist-info-item">
                <div className="pharmacist-info-label">Doctor Comments</div>
                <div className="pharmacist-info-value">
                  {prescription.comments}
                </div>
              </div>
              <div className="pharmacist-info-item">
                <div className="pharmacist-info-label">Appointment Details</div>
                <div className="pharmacist-info-value">
                  {prescription.details}
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="pharmacist-success-message">{successMessage}</div>
          )}

          {/* Prescribed Medicines */}
          <div className="pharmacist-medicines-section">
            <div className="pharmacist-section-header">
              <span className="pharmacist-section-icon">💊</span>
              <h3 className="pharmacist-section-title">Prescribed Medicines</h3>
            </div>

            {medicines.length === 0 ? (
              <div className="pharmacist-no-medicines">
                <div className="pharmacist-no-medicines-icon">💊</div>
                <p className="pharmacist-no-medicines-text">
                  No medicines prescribed.
                </p>
              </div>
            ) : (
              <table className="pharmacist-medicines-table">
                <thead>
                  <tr>
                    <th>Medicine ID</th>
                    <th>Medicine Name</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, index) => (
                    <tr key={index}>
                      <td
                        data-label="Medicine ID"
                        className="pharmacist-medicine-id"
                      >
                        {med.medicine_id}
                      </td>
                      <td
                        data-label="Medicine Name"
                        className="pharmacist-medicine-name"
                      >
                        {med.name}
                      </td>
                      <td
                        data-label="Dosage"
                        className="pharmacist-medicine-dosage"
                      >
                        {med.dosage}
                      </td>
                      <td
                        data-label="Duration"
                        className="pharmacist-medicine-duration"
                      >
                        {med.duration}
                      </td>
                      <td data-label="Quantity">
                        <input
                          type="number"
                          className="pharmacist-quantity-input"
                          value={quantities[med.medicine_id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              med.medicine_id,
                              e.target.value
                            )
                          }
                          min="1"
                          placeholder="1"
                        />
                      </td>
                      <td data-label="Action">
                        <button
                          className="pharmacist-add-to-cart-btn"
                          onClick={() => handleAddToCart(med.medicine_id)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmacistPrescriptionDetails;
