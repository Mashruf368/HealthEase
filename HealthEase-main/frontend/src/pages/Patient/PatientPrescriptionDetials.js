// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const AdminPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const [data, setData] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [amounts, setAmounts] = useState({});
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       try {
// //         const res = await fetch(
// //           `http://localhost:3001/admin/prescriptions/${id}`,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               token,
// //             },
// //           }
// //         );

// //         const result = await res.json();
// //         if (res.ok) {
// //           setData(result);
// //         } else {
// //           setMessage(result.error || "Failed to fetch prescription");
// //         }
// //       } catch (err) {
// //         setMessage("Server error while fetching prescription");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDetails();
// //   }, [id]);

// //   const handleAddToCart = async (item_id, item_type, amount = 1) => {
// //     const created_at = new Date().toISOString();

// //     try {
// //       const res = await fetch(`http://localhost:3001/admin/buy/${id}`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           token,
// //         },
// //         body: JSON.stringify({
// //           item_type,
// //           item_id,
// //           amount,
// //           created_at,
// //         }),
// //       });

// //       const result = await res.json();
// //       if (res.ok) {
// //         alert("Added to cart successfully.");
// //       } else {
// //         alert("Failed to add to cart: " + (result.error || result));
// //       }
// //     } catch (err) {
// //       alert("Server error while adding to cart.");
// //       console.error(err);
// //     }
// //   };

// //   const handleAmountChange = (medicine_id, value) => {
// //     setAmounts((prev) => ({ ...prev, [medicine_id]: value }));
// //   };

// //   if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
// //   if (message)
// //     return <p style={{ padding: "2rem", color: "red" }}>{message}</p>;
// //   if (!data || !data.prescription)
// //     return <p style={{ padding: "2rem" }}>No data found.</p>;

// //   const { prescription, medicines, tests } = data;

// //   return (
// //     <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
// //       <h2>Prescription Details (Admin View)</h2>
// //       <div
// //         style={{
// //           border: "1px solid #ccc",
// //           padding: "1rem",
// //           marginBottom: "1rem",
// //         }}
// //       >
// //         <p>
// //           <strong>Doctor:</strong> {prescription.name}
// //         </p>
// //         <p>
// //           <strong>Symptoms:</strong> {prescription.symptoms}
// //         </p>
// //         <p>
// //           <strong>Comments:</strong> {prescription.comments}
// //         </p>
// //         <p>
// //           <strong>Appointment Details:</strong> {prescription.details}
// //         </p>
// //       </div>

// //       <h3>Prescribed Medicines</h3>
// //       {medicines && medicines.length > 0 ? (
// //         medicines.map((med, index) => (
// //           <div
// //             key={index}
// //             style={{
// //               marginBottom: "1rem",
// //               borderBottom: "1px solid #eee",
// //               paddingBottom: "0.5rem",
// //             }}
// //           >
// //             <p>
// //               <strong>Medicine ID:</strong> {med.medicine_id} <br />
// //               <strong>Dosage:</strong> {med.dosage} <br />
// //               <strong>Duration:</strong> {med.duration}
// //             </p>
// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
// //               <input
// //                 type="number"
// //                 placeholder="Amount"
// //                 min="1"
// //                 value={amounts[med.medicine_id] || ""}
// //                 onChange={(e) =>
// //                   handleAmountChange(med.medicine_id, e.target.value)
// //                 }
// //               />
// //               <button
// //                 onClick={() =>
// //                   handleAddToCart(
// //                     med.medicine_id,
// //                     1, // item_type = 1 for medicine
// //                     parseInt(amounts[med.medicine_id]) || 1
// //                   )
// //                 }
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No medicines prescribed.</p>
// //       )}

// //       <h3>Recommended Tests</h3>
// //       {tests && tests.length > 0 ? (
// //         tests.map((test, index) => (
// //           <div key={index} style={{ marginBottom: "0.5rem" }}>
// //             <p>
// //               <strong>Test ID:</strong> {test.test_id} <br />
// //               <strong>Result:</strong> {test.test_result || "Pending"} <br />
// //               <strong>Comments:</strong> {test.comments}
// //             </p>
// //             <button
// //               onClick={() =>
// //                 handleAddToCart(
// //                   test.test_id,
// //                   2, // item_type = 2 for test
// //                   1 // default amount = 1
// //                 )
// //               }
// //             >
// //               Add to Cart
// //             </button>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No tests recommended.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPrescriptionDetails;
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
//           `http://localhost:3001/patient/prescriptions/${id}`,
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
//           <div key={index} style={{ marginBottom: "0.5rem" }}>
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
import { useParams } from "react-router-dom";
import "../../styles/PatientPrescriptionDetails.css"; // Import the CSS file

const AdminPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/patient/prescriptions/${id}`,
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
  }, [id]);

  if (loading) {
    return (
      <div className="patientprescdetails-container">
        <div className="patientprescdetails-loading">
          Loading prescription details...
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="patientprescdetails-container">
        <div className="patientprescdetails-error">{message}</div>
      </div>
    );
  }

  if (!data || !data.prescription) {
    return (
      <div className="patientprescdetails-container">
        <div className="patientprescdetails-no-data">
          No prescription data found.
        </div>
      </div>
    );
  }

  const { prescription, medicines, tests } = data;

  return (
    <div className="patientprescdetails-container">
      <div className="patientprescdetails-wrapper">
        <h2 className="patientprescdetails-main-title">Prescription Details</h2>

        {/* Prescription Overview */}
        <div className="patientprescdetails-overview-card">
          <p className="patientprescdetails-overview-item">
            <span className="patientprescdetails-overview-label">Doctor:</span>{" "}
            {prescription.name}
          </p>
          <p className="patientprescdetails-overview-item">
            <span className="patientprescdetails-overview-label">
              Symptoms:
            </span>{" "}
            {prescription.symptoms}
          </p>
          <p className="patientprescdetails-overview-item">
            <span className="patientprescdetails-overview-label">
              Comments:
            </span>{" "}
            {prescription.comments}
          </p>
          <p className="patientprescdetails-overview-item">
            <span className="patientprescdetails-overview-label">
              Appointment Details:
            </span>{" "}
            {prescription.details}
          </p>
        </div>

        {/* Prescribed Medicines Section */}
        <h3 className="patientprescdetails-section-title">
          Prescribed Medicines
        </h3>
        {medicines && medicines.length > 0 ? (
          medicines.map((med, index) => (
            <div key={index} className="patientprescdetails-medicine-card">
              <p className="patientprescdetails-medicine-item">
                <span className="patientprescdetails-medicine-label">
                  Medicine:
                </span>{" "}
                {med.name}
              </p>
              <p className="patientprescdetails-medicine-item">
                <span className="patientprescdetails-medicine-label">
                  Dosage:
                </span>{" "}
                {med.dosage}
              </p>
              <p className="patientprescdetails-medicine-item">
                <span className="patientprescdetails-medicine-label">
                  Duration:
                </span>{" "}
                {med.duration}
              </p>
            </div>
          ))
        ) : (
          <div className="patientprescdetails-no-medicines">
            No medicines prescribed.
          </div>
        )}

        {/* Recommended Tests Section */}
        <h3 className="patientprescdetails-section-title">Recommended Tests</h3>
        {tests && tests.length > 0 ? (
          tests.map((test, index) => (
            <div key={index} className="patientprescdetails-test-card">
              <p className="patientprescdetails-test-item">
                <span className="patientprescdetails-test-label">Test:</span>{" "}
                {test.test_name}
              </p>
              <p className="patientprescdetails-test-item">
                <span className="patientprescdetails-test-label">Result:</span>
                <span
                  className={
                    test.test_result
                      ? ""
                      : "patientprescdetails-test-result-pending"
                  }
                >
                  {test.test_result || "Pending"}
                </span>
              </p>
              <p className="patientprescdetails-test-item">
                <span className="patientprescdetails-test-label">
                  Comments:
                </span>{" "}
                {test.comments}
              </p>
            </div>
          ))
        ) : (
          <div className="patientprescdetails-no-tests">
            No tests recommended.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPrescriptionDetails;
