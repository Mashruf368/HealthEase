// // // import React, { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";

// // // const PharmacistPrescriptionDetails = () => {
// // //   const { id } = useParams(); // consultation_id
// // //   const [data, setData] = useState(null);
// // //   const [message, setMessage] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchPrescription = async () => {
// // //       try {
// // //         const token = localStorage.getItem("token");
// // //         const response = await fetch(
// // //           `http://localhost:3001/pharmacist/prescriptions/${id}`,
// // //           {
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //               token: token,
// // //             },
// // //           }
// // //         );

// // //         const result = await response.json();
// // //         if (response.ok) {
// // //           setData(result);
// // //         } else {
// // //           setMessage(result.error || "Failed to fetch prescription details.");
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //         setMessage("Error fetching prescription details.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPrescription();
// // //   }, [id]);

// // //   if (loading) return <p>Loading...</p>;
// // //   if (message) return <p>{message}</p>;

// // //   return (
// // //     <div>
// // //       <h2>Prescription Details</h2>
// // //       <h3>Doctor: {data.prescription.name}</h3>
// // //       <p>
// // //         <strong>Symptoms:</strong> {data.prescription.symptoms}
// // //       </p>
// // //       <p>
// // //         <strong>Comments:</strong> {data.prescription.comments}
// // //       </p>
// // //       <p>
// // //         <strong>Details:</strong> {data.prescription.details}
// // //       </p>

// // //       <h3>Medicines</h3>
// // //       {data.medicines.length === 0 ? (
// // //         <p>No medicines prescribed.</p>
// // //       ) : (
// // //         <ul>
// // //           {data.medicines.map((med, index) => (
// // //             <li key={index}>
// // //               Medicine ID: {med.medicine_id}, Dosage: {med.dosage}, Duration:{" "}
// // //               {med.duration}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}

// // //       <h3>Recommended Tests</h3>
// // //       {data.tests.length === 0 ? (
// // //         <p>No tests recommended.</p>
// // //       ) : (
// // //         <ul>
// // //           {data.tests.map((test, index) => (
// // //             <li key={index}>
// // //               Test ID: {test.test_id}, Result: {test.test_result}, Comments:{" "}
// // //               {test.comments}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PharmacistPrescriptionDetails;
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const PharmacistPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
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

// //           // Initialize quantities to 1 for each medicine
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
// //     const quantity = Math.max(1, parseInt(value) || 1);
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [medicineId]: quantity,
// //     }));
// //   };

// //   const handleAddToCart = async (medicineId) => {
// //     const token = localStorage.getItem("token");
// //     const createdAt = new Date().toISOString();
// //     const amount = quantities[medicineId] || 1;

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
// //             item_type: 1, // medicine
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

// //   return (
// //     <div>
// //       <h2>Prescription Details</h2>
// //       <h3>Doctor: {data.prescription.name}</h3>
// //       <p>
// //         <strong>Symptoms:</strong> {data.prescription.symptoms}
// //       </p>
// //       <p>
// //         <strong>Comments:</strong> {data.prescription.comments}
// //       </p>
// //       <p>
// //         <strong>Details:</strong> {data.prescription.details}
// //       </p>

// //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

// //       <h3>Medicines</h3>
// //       {data.medicines.length === 0 ? (
// //         <p>No medicines prescribed.</p>
// //       ) : (
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Medicine ID</th>
// //               <th>Dosage</th>
// //               <th>Duration</th>
// //               <th>Quantity</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.medicines.map((med, index) => (
// //               <tr key={index}>
// //                 <td>{med.medicine_id}</td>
// //                 <td>{med.dosage}</td>
// //                 <td>{med.duration}</td>
// //                 <td>
// //                   <input
// //                     type="number"
// //                     min="1"
// //                     value={quantities[med.medicine_id] || 1}
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
// import { useParams } from "react-router-dom";

// const PharmacistPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
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

//           // Initialize quantities to 1 for each medicine
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
//             item_type: 1, // medicine
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

//   if (loading) return <p>Loading...</p>;
//   if (message) return <p>{message}</p>;

//   const { prescription, medicines } = data;

//   return (
//     <div>
//       <h2>Prescription Details</h2>
//       <h3>Doctor: {prescription.name}</h3>
//       <h4>Patient: {prescription.patient_name}</h4>
//       <p>
//         <strong>Symptoms:</strong> {prescription.symptoms}
//       </p>
//       <p>
//         <strong>Comments:</strong> {prescription.comments}
//       </p>
//       <p>
//         <strong>Details:</strong> {prescription.details}
//       </p>

//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

//       <h3>Medicines</h3>
//       {medicines.length === 0 ? (
//         <p>No medicines prescribed.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Medicine ID</th>
//               <th>Dosage</th>
//               <th>Duration</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicines.map((med, index) => (
//               <tr key={index}>
//                 <td>{med.medicine_id}</td>
//                 <td>{med.dosage}</td>
//                 <td>{med.duration}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={quantities[med.medicine_id] || ""}
//                     onChange={(e) =>
//                       handleQuantityChange(med.medicine_id, e.target.value)
//                     }
//                     style={{ width: "60px" }}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => handleAddToCart(med.medicine_id)}>
//                     Add to Cart
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PharmacistPrescriptionDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;

  const { prescription, medicines } = data;

  return (
    <div>
      <h2>Prescription Details</h2>
      <h3>Doctor: {prescription.name}</h3>
      <h4>
        Patient: {prescription.patient_name}{" "}
        <button
          onClick={() =>
            navigate(`/pharmacist/patient/${prescription.patient_id}`)
          }
        >
          View Patient
        </button>
      </h4>
      <p>
        <strong>Symptoms:</strong> {prescription.symptoms}
      </p>
      <p>
        <strong>Comments:</strong> {prescription.comments}
      </p>
      <p>
        <strong>Details:</strong> {prescription.details}
      </p>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <h3>Medicines</h3>
      {medicines.length === 0 ? (
        <p>No medicines prescribed.</p>
      ) : (
        <table>
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
                <td>{med.medicine_id}</td>
                <td>{med.name}</td>
                <td>{med.dosage}</td>
                <td>{med.duration}</td>
                <td>
                  <input
                    type="number"
                    value={quantities[med.medicine_id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(med.medicine_id, e.target.value)
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleAddToCart(med.medicine_id)}>
                    Add to Cart
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

export default PharmacistPrescriptionDetails;
