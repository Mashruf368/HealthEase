// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // //profile view update and show previous prescriptions on patient side

// // // const Profile = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     age: "",
// // //     gender: "",
// // //     contact_no: "",
// // //     address: "",
// // //   });

// // //   const [message, setMessage] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [showPrescriptions, setShowPrescriptions] = useState(false);
// // //   const [prescriptions, setPrescriptions] = useState([]);

// // //   const token = localStorage.getItem("token");
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       try {
// // //         const res = await fetch("http://localhost:3001/profile", {
// // //           method: "GET",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token,
// // //           },
// // //         });

// // //         const data = await res.json();
// // //         if (res.ok) {
// // //           setFormData(data);
// // //         } else {
// // //           setMessage(data.message || "Failed to load profile");
// // //         }
// // //       } catch (err) {
// // //         setMessage("Error fetching profile");
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchProfile();
// // //   }, [token]);

// // //   const handleChange = (e) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:3001/profile", {
// // //         method: "PATCH",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           token,
// // //         },
// // //         body: JSON.stringify(formData),
// // //       });

// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         setMessage(data.message || "Profile updated successfully");
// // //       } else {
// // //         setMessage(data.error || "Failed to update profile");
// // //       }
// // //     } catch (err) {
// // //       setMessage("Error updating profile");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchPrescriptions = async () => {
// // //     try {
// // //       console.log("befoer fetch");
// // //       const res = await fetch("http://localhost:3001/profile/prescriptions", {
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           token,
// // //         },
// // //       });
// // //       console.log("after fetch");
// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         setPrescriptions(data); // Expecting an array
// // //       } else {
// // //         setMessage("Failed to fetch prescriptions");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       setMessage("Server error while fetching prescriptions");
// // //     }
// // //   };

// // //   const handleTogglePrescriptions = () => {
// // //     setShowPrescriptions(!showPrescriptions);
// // //     if (!showPrescriptions) {
// // //       fetchPrescriptions();
// // //     }
// // //   };

// // //   if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

// // //   return (
// // //     <div style={{ display: "flex", padding: "2rem", gap: "2rem" }}>
// // //       {/* Left: Profile info */}
// // //       <div style={{ flex: 1 }}>
// // //         <h2>My Profile</h2>
// // //         {message && <p style={{ color: "green" }}>{message}</p>}

// // //         <label>Name:</label>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           value={formData.name}
// // //           onChange={handleChange}
// // //         />
// // //         <br />

// // //         <label>Age:</label>
// // //         <input
// // //           type="number"
// // //           name="age"
// // //           value={formData.age}
// // //           onChange={handleChange}
// // //         />
// // //         <br />

// // //         <label>Gender:</label>
// // //         <select name="gender" value={formData.gender} onChange={handleChange}>
// // //           <option value="">Select</option>
// // //           <option value="Male">Male</option>
// // //           <option value="Female">Female</option>
// // //           <option value="Other">Other</option>
// // //         </select>
// // //         <br />

// // //         <label>Contact No:</label>
// // //         <input
// // //           type="text"
// // //           name="contact_no"
// // //           value={formData.contact_no}
// // //           onChange={handleChange}
// // //         />
// // //         <br />

// // //         <label>Address:</label>
// // //         <input
// // //           type="text"
// // //           name="address"
// // //           value={formData.address}
// // //           onChange={handleChange}
// // //         />
// // //         <br />

// // //         <button
// // //           onClick={handleSave}
// // //           style={{
// // //             marginTop: "1rem",
// // //             padding: "0.5rem 1.5rem",
// // //             backgroundColor: "#007bff",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: "4px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           Save
// // //         </button>
// // //       </div>

// // //       {/* Right: Prescriptions */}
// // //       <div style={{ flex: 1 }}>
// // //         <button
// // //           onClick={handleTogglePrescriptions}
// // //           style={{
// // //             marginBottom: "1rem",
// // //             padding: "0.5rem 1rem",
// // //             backgroundColor: "#28a745",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: "4px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           {showPrescriptions ? "Hide Prescriptions" : "Show Prescriptions"}
// // //         </button>

// // //         {showPrescriptions && prescriptions.length > 0 ? (
// // //           <div>
// // //             <h3>Previous Prescriptions</h3>
// // //             {prescriptions.map((pres, index) => (
// // //               <div
// // //                 key={index}
// // //                 style={{
// // //                   border: "1px solid #ccc",
// // //                   padding: "1rem",
// // //                   marginBottom: "1rem",
// // //                 }}
// // //               >
// // //                 <p>
// // //                   <strong>Date:</strong> {pres.date}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Symptoms:</strong> {pres.symptoms}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Comments:</strong> {pres.comments}
// // //                 </p>
// // //                 <button
// // //                   style={{
// // //                     marginTop: "0.5rem",
// // //                     backgroundColor: "#17a2b8",
// // //                     color: "white",
// // //                     border: "none",
// // //                     padding: "0.5rem 1rem",
// // //                     borderRadius: "4px",
// // //                     cursor: "pointer",
// // //                   }}
// // //                   onClick={() =>
// // //                     navigate(`/prescription/${pres.consultation_id}`)
// // //                   }
// // //                 >
// // //                   View Details
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           showPrescriptions && <p>No prescriptions found</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Profile;
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const PatientPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const [data, setData] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     console.log("PatientPrescriptionDetails mounted");

// //     const fetchDetails = async () => {
// //       try {
// //         const res = await fetch(
// //           `http://localhost:3001/patient/prescription/${id}`,
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
// //         console.error("Fetch error:", err);
// //         setMessage("Server error while fetching prescription");
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
// //       <h2>Your Prescription Details</h2>
// //       <div
// //         style={{
// //           border: "1px solid #ccc",
// //           padding: "1rem",
// //           marginBottom: "1.5rem",
// //           borderRadius: "6px",
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
// //           <strong>Appointment Notes:</strong> {prescription.details}
// //         </p>
// //       </div>

// //       <h3>Medicines Prescribed</h3>
// //       {medicines && medicines.length > 0 ? (
// //         <ul style={{ paddingLeft: "1rem" }}>
// //           {medicines.map((med, index) => (
// //             <li key={index} style={{ marginBottom: "0.8rem" }}>
// //               <p>
// //                 <strong>Medicine ID:</strong> {med.medicine_id}
// //               </p>
// //               <p>
// //                 <strong>Dosage:</strong> {med.dosage}
// //               </p>
// //               <p>
// //                 <strong>Duration:</strong> {med.duration}
// //               </p>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No medicines prescribed.</p>
// //       )}

// //       <h3>Recommended Tests</h3>
// //       {tests && tests.length > 0 ? (
// //         <ul style={{ paddingLeft: "1rem" }}>
// //           {tests.map((test, index) => (
// //             <li key={index} style={{ marginBottom: "0.8rem" }}>
// //               <p>
// //                 <strong>Test ID:</strong> {test.test_id}
// //               </p>
// //               <p>
// //                 <strong>Result:</strong> {test.test_result || "Pending"}
// //               </p>
// //               <p>
// //                 <strong>Comments:</strong> {test.comments}
// //               </p>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No tests recommended.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default PatientPrescriptionDetails;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const AdminPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
//   const [data, setData] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [amounts, setAmounts] = useState({});
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

//   const handleAddToCart = async (item_id, item_type, amount = 1) => {
//     const created_at = new Date().toISOString();

//     try {
//       const res = await fetch(`http://localhost:3001/admin/buy/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//         body: JSON.stringify({
//           item_type,
//           item_id,
//           amount,
//           created_at,
//         }),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         alert("Added to cart successfully.");
//       } else {
//         alert("Failed to add to cart: " + (result.error || result));
//       }
//     } catch (err) {
//       alert("Server error while adding to cart.");
//       console.error(err);
//     }
//   };

//   const handleAmountChange = (medicine_id, value) => {
//     setAmounts((prev) => ({ ...prev, [medicine_id]: value }));
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
//               marginBottom: "1rem",
//               borderBottom: "1px solid #eee",
//               paddingBottom: "0.5rem",
//             }}
//           >
//             <p>
//               <strong>Medicine ID:</strong> {med.medicine_id} <br />
//               <strong>Dosage:</strong> {med.dosage} <br />
//               <strong>Duration:</strong> {med.duration}
//             </p>
//             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 min="1"
//                 value={amounts[med.medicine_id] || ""}
//                 onChange={(e) =>
//                   handleAmountChange(med.medicine_id, e.target.value)
//                 }
//               />
//               <button
//                 onClick={() =>
//                   handleAddToCart(
//                     med.medicine_id,
//                     1, // item_type = 1 for medicine
//                     parseInt(amounts[med.medicine_id]) || 1
//                   )
//                 }
//               >
//                 Add to Cart
//               </button>
//             </div>
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
//               <strong>Test ID:</strong> {test.test_id} <br />
//               <strong>Result:</strong> {test.test_result || "Pending"} <br />
//               <strong>Comments:</strong> {test.comments}
//             </p>
//             <button
//               onClick={() =>
//                 handleAddToCart(
//                   test.test_id,
//                   2, // item_type = 2 for test
//                   1 // default amount = 1
//                 )
//               }
//             >
//               Add to Cart
//             </button>
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

  const handleAddToCart = async (item_id, item_type, amount = 1) => {
    const created_at = new Date().toISOString();

    try {
      const res = await fetch(`http://localhost:3001/admin/buy/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          item_type,
          item_id,
          amount,
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
              <button
                onClick={() =>
                  handleAddToCart(
                    med.medicine_id,
                    1, // item_type = 1 for medicine
                    parseInt(amounts[med.medicine_id]) || 1
                  )
                }
              >
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
            <button
              onClick={() =>
                handleAddToCart(
                  test.test_id,
                  2, // item_type = 2 for test
                  1 // default amount = 1
                )
              }
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No tests recommended.</p>
      )}
    </div>
  );
};

export default AdminPrescriptionDetails;
