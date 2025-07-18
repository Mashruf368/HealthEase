// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const AdminPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const [data, setData] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       console.log("fetching prescription from front");
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
// //           <div key={index} style={{ marginBottom: "0.5rem" }}>
// //             <p>
// //               <strong>Medicine ID:</strong> {med.medicine_id} <br />
// //               <strong>Dosage:</strong> {med.dosage} <br />
// //               <strong>Duration:</strong> {med.duration}
// //             </p>
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
//   const [cart, setCart] = useState([]);
//   const [amounts, setAmounts] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       console.log("fetching prescription from front");
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

//   const handleAmountChange = (medicineId, value) => {
//     setAmounts((prev) => ({ ...prev, [medicineId]: value }));
//   };

//   const handleAddToCart = (medicineId) => {
//     const amount = parseInt(amounts[medicineId]);
//     if (!amount || amount <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     setCart((prev) => [
//       ...prev,
//       {
//         item_type: 1,
//         item_id: medicineId,
//         amount,
//       },
//     ]);
//   };

//   const handleBuy = async () => {
//     if (!data || !data.prescription) return;

//     const created_at = new Date().toISOString();
//     const patient_id = data.prescription.patient_id;

//     for (const item of cart) {
//       try {
//         const res = await fetch(
//           `http://localhost:3001/admin/buy/${patient_id}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               token,
//             },
//             body: JSON.stringify({
//               ...item,
//               created_at,
//             }),
//           }
//         );

//         const result = await res.json();
//         console.log("Buy response:", result);
//       } catch (err) {
//         console.error("Error sending to backend:", err);
//       }
//     }

//     alert("Purchase requests sent successfully.");
//     setCart([]);
//     setAmounts({});
//   };

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
//               borderBottom: "1px solid #ccc",
//               marginBottom: "1rem",
//               paddingBottom: "0.5rem",
//             }}
//           >
//             <p>
//               <strong>Medicine ID:</strong> {med.medicine_id} <br />
//               <strong>Dosage:</strong> {med.dosage} <br />
//               <strong>Duration:</strong> {med.duration}
//             </p>
//             <input
//               type="number"
//               placeholder="Amount"
//               min="1"
//               value={amounts[med.medicine_id] || ""}
//               onChange={(e) =>
//                 handleAmountChange(med.medicine_id, e.target.value)
//               }
//               style={{ marginRight: "0.5rem" }}
//             />
//             <button
//               onClick={() => handleAddToCart(med.medicine_id)}
//               style={{
//                 padding: "0.4rem 0.8rem",
//                 backgroundColor: "green",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No medicines prescribed.</p>
//       )}

//       {cart.length > 0 && (
//         <div style={{ marginTop: "2rem" }}>
//           <h3>Selected Items</h3>
//           <ul>
//             {cart.map((item, i) => (
//               <li key={i}>
//                 Medicine ID: {item.item_id}, Amount: {item.amount}
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={handleBuy}
//             style={{
//               padding: "0.6rem 1.2rem",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginTop: "1rem",
//             }}
//           >
//             Confirm Purchase
//           </button>
//         </div>
//       )}

//       <h3 style={{ marginTop: "2rem" }}>Recommended Tests</h3>
//       {tests && tests.length > 0 ? (
//         tests.map((test, index) => (
//           <div key={index} style={{ marginBottom: "0.5rem" }}>
//             <p>
//               <strong>Test ID:</strong> {test.test_id} <br />
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

const AdminPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, [id]);

  const handleAddToCart = async (medicine_id) => {
    const amount = amounts[medicine_id];
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const created_at = new Date().toISOString();

    try {
      const res = await fetch(`http://localhost:3001/admin/buy/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          item_type: 1, // 1 means medicine
          item_id: medicine_id,
          amount: parseInt(amount),
          created_at,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Added to cart successfully.");
      } else {
        alert("Failed to add to cart: " + (result.error || result));
      }
    } catch (err) {
      alert("Server error while adding to cart.");
      console.error(err);
    }
  };

  const handleAmountChange = (medicine_id, value) => {
    setAmounts((prev) => ({ ...prev, [medicine_id]: value }));
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (message)
    return <p style={{ padding: "2rem", color: "red" }}>{message}</p>;
  if (!data || !data.prescription)
    return <p style={{ padding: "2rem" }}>No data found.</p>;

  const { prescription, medicines, tests } = data;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2>Prescription Details (Admin View)</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p>
          <strong>Doctor:</strong> {prescription.name}
        </p>
        <p>
          <strong>Symptoms:</strong> {prescription.symptoms}
        </p>
        <p>
          <strong>Comments:</strong> {prescription.comments}
        </p>
        <p>
          <strong>Appointment Details:</strong> {prescription.details}
        </p>
      </div>

      <h3>Prescribed Medicines</h3>
      {medicines && medicines.length > 0 ? (
        medicines.map((med, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "0.5rem",
            }}
          >
            <p>
              <strong>Medicine ID:</strong> {med.medicine_id} <br />
              <strong>Dosage:</strong> {med.dosage} <br />
              <strong>Duration:</strong> {med.duration}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <input
                type="number"
                placeholder="Amount"
                min="1"
                value={amounts[med.medicine_id] || ""}
                onChange={(e) =>
                  handleAmountChange(med.medicine_id, e.target.value)
                }
              />
              <button onClick={() => handleAddToCart(med.medicine_id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No medicines prescribed.</p>
      )}

      <h3>Recommended Tests</h3>
      {tests && tests.length > 0 ? (
        tests.map((test, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>
            <p>
              <strong>Test ID:</strong> {test.test_id} <br />
              <strong>Result:</strong> {test.test_result || "Pending"} <br />
              <strong>Comments:</strong> {test.comments}
            </p>
          </div>
        ))
      ) : (
        <p>No tests recommended.</p>
      )}
    </div>
  );
};

export default AdminPrescriptionDetails;
