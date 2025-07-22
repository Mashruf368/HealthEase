// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useParams } from "react-router-dom";

// // // // // // const PathologistPrescriptionDetails = () => {
// // // // // //   const { id } = useParams(); // consultation_id

// // // // // //   const [data, setData] = useState(null);
// // // // // //   const [message, setMessage] = useState("");
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [results, setResults] = useState({});
// // // // // //   const [successMessage, setSuccessMessage] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     const fetchPrescription = async () => {
// // // // // //       try {
// // // // // //         const token = localStorage.getItem("token");
// // // // // //         const response = await fetch(
// // // // // //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// // // // // //           {
// // // // // //             headers: {
// // // // // //               "Content-Type": "application/json",
// // // // // //               token,
// // // // // //             },
// // // // // //           }
// // // // // //         );

// // // // // //         const result = await response.json();
// // // // // //         if (response.ok) {
// // // // // //           setData(result);

// // // // // //           // Initialize test results
// // // // // //           const initialResults = {};
// // // // // //           result.tests.forEach((test) => {
// // // // // //             initialResults[test.test_id] = test.test_result || "";
// // // // // //           });
// // // // // //           setResults(initialResults);
// // // // // //         } else {
// // // // // //           setMessage(result.error || "Failed to fetch prescription details.");
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error(err);
// // // // // //         setMessage("Error fetching prescription details.");
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchPrescription();
// // // // // //   }, [id]);

// // // // // //   const handleResultChange = (testId, value) => {
// // // // // //     setResults((prev) => ({
// // // // // //       ...prev,
// // // // // //       [testId]: value,
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleConfirmPayment = async (testId) => {
// // // // // //     const token = localStorage.getItem("token");
// // // // // //     const createdAt = new Date().toISOString();
// // // // // //     const resultText = results[testId];

// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         `http://localhost:3001/pathologist/buy/${id}`, // Ensure this route exists
// // // // // //         {
// // // // // //           method: "POST",
// // // // // //           headers: {
// // // // // //             "Content-Type": "application/json",
// // // // // //             token,
// // // // // //           },
// // // // // //           body: JSON.stringify({
// // // // // //             item_type: 2, // 2 for test
// // // // // //             item_id: testId,
// // // // // //             created_at: createdAt,
// // // // // //             test_result: resultText,
// // // // // //           }),
// // // // // //         }
// // // // // //       );

// // // // // //       const result = await response.json();
// // // // // //       if (response.ok) {
// // // // // //         setSuccessMessage(`✔️ Payment confirmed and result saved.`);
// // // // // //         setTimeout(() => setSuccessMessage(""), 3000);
// // // // // //       } else {
// // // // // //         setMessage(result.error || "Failed to confirm payment.");
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       setMessage("Error confirming payment.");
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) return <p>Loading...</p>;
// // // // // //   if (message) return <p>{message}</p>;

// // // // // //   const { prescription, tests } = data;

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h2>Prescription Details</h2>
// // // // // //       <h3>Doctor: {prescription.name}</h3>
// // // // // //       <h4>Patient: {prescription.patient_name}</h4>
// // // // // //       <p>
// // // // // //         <strong>Symptoms:</strong> {prescription.symptoms}
// // // // // //       </p>
// // // // // //       <p>
// // // // // //         <strong>Comments:</strong> {prescription.comments}
// // // // // //       </p>
// // // // // //       <p>
// // // // // //         <strong>Details:</strong> {prescription.details}
// // // // // //       </p>

// // // // // //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

// // // // // //       <h3>Recommended Tests</h3>
// // // // // //       {tests.length === 0 ? (
// // // // // //         <p>No tests recommended.</p>
// // // // // //       ) : (
// // // // // //         <table>
// // // // // //           <thead>
// // // // // //             <tr>
// // // // // //               <th>Test ID</th>
// // // // // //               <th>Result</th>
// // // // // //               <th>Update Result</th>
// // // // // //               <th>Action</th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody>
// // // // // //             {tests.map((test, index) => (
// // // // // //               <tr key={index}>
// // // // // //                 <td>{test.test_id}</td>
// // // // // //                 <td>{test.test_result || "Pending"}</td>
// // // // // //                 <td>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     value={results[test.test_id] || ""}
// // // // // //                     onChange={(e) =>
// // // // // //                       handleResultChange(test.test_id, e.target.value)
// // // // // //                     }
// // // // // //                     placeholder="Enter result"
// // // // // //                   />
// // // // // //                 </td>
// // // // // //                 <td>
// // // // // //                   <button onClick={() => handleConfirmPayment(test.test_id)}>
// // // // // //                     Confirm Payment
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

// // // // // // export default PathologistPrescriptionDetails;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useParams, useNavigate } from "react-router-dom";

// // // // // const PathologistPrescriptionDetails = () => {
// // // // //   const { id } = useParams(); // consultation_id
// // // // //   const navigate = useNavigate();
// // // // //   const [data, setData] = useState(null);
// // // // //   const [message, setMessage] = useState("");
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const response = await fetch(
// // // // //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// // // // //           {
// // // // //             method: "GET",
// // // // //             headers: {
// // // // //               "Content-Type": "application/json",
// // // // //               Authorization: localStorage.getItem("token"),
// // // // //             },
// // // // //           }
// // // // //         );
// // // // //         const result = await response.json();
// // // // //         setData(result);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         setMessage("Failed to fetch data" + error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, [id]);

// // // // //   const handleSaveResult = (testId) => {
// // // // //     alert(`Save result for test ${testId}`);
// // // // //     // TODO: Implement logic for saving results
// // // // //   };

// // // // //   const handleConfirmPayment = (testId) => {
// // // // //     alert(`Confirm payment for test ${testId}`);
// // // // //     // TODO: Implement logic for confirming test payment
// // // // //   };

// // // // //   const handleViewProfile = () => {
// // // // //     navigate(`/pathologist/patient/${data.prescription.patient_id}`);
// // // // //   };

// // // // //   if (loading) return <p>Loading...</p>;
// // // // //   if (message) return <p>{message}</p>;

// // // // //   return (
// // // // //     <div style={{ padding: "2rem" }}>
// // // // //       <h2>Prescription Details</h2>

// // // // //       <h3>Patient: {data.prescription.patient_name}</h3>
// // // // //       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
// // // // //         View Profile
// // // // //       </button>

// // // // //       <p>
// // // // //         <strong>Symptoms:</strong> {data.prescription.symptoms}
// // // // //       </p>
// // // // //       <p>
// // // // //         <strong>Doctor:</strong> {data.prescription.name}
// // // // //       </p>
// // // // //       <p>
// // // // //         <strong>Doctor Comments:</strong> {data.prescription.comments}
// // // // //       </p>
// // // // //       <p>
// // // // //         <strong>Appointment Details:</strong> {data.prescription.details}
// // // // //       </p>

// // // // //       <h3>Prescribed Medicines</h3>
// // // // //       <ul>
// // // // //         {data.medicines.map((med, index) => (
// // // // //           <li key={index}>
// // // // //             {med.name} - {med.dosage} for {med.duration} days
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>

// // // // //       <h3>Recommended Tests</h3>
// // // // //       <ul>
// // // // //         {data.tests.map((test, index) => (
// // // // //           <li key={index} style={{ marginBottom: "1rem" }}>
// // // // //             <strong>{test.name}</strong>
// // // // //             <br />
// // // // //             Result: {test.test_result || "N/A"}
// // // // //             <br />
// // // // //             Comments: {test.comments || "N/A"}
// // // // //             <br />
// // // // //             <button
// // // // //               onClick={() => handleSaveResult(test.test_id)}
// // // // //               style={{ marginRight: "1rem" }}
// // // // //             >
// // // // //               Save Result
// // // // //             </button>
// // // // //             <button onClick={() => handleConfirmPayment(test.test_id)}>
// // // // //               Confirm Payment
// // // // //             </button>
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PathologistPrescriptionDetails;
// // // // import React, { useEffect, useState } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";

// // // // const PathologistPrescriptionDetails = () => {
// // // //   const { id } = useParams(); // consultation_id
// // // //   const navigate = useNavigate();
// // // //   const [data, setData] = useState(null);
// // // //   const [message, setMessage] = useState("");
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       const token = localStorage.getItem("token");
// // // //       if (!token) {
// // // //         navigate("/login"); // Redirect to login if no token
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const response = await fetch(
// // // //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// // // //           {
// // // //             method: "GET",
// // // //             headers: {
// // // //               "Content-Type": "application/json",
// // // //               token: token,
// // // //             },
// // // //           }
// // // //         );

// // // //         if (!response.ok) {
// // // //           const text = await response.text();
// // // //           throw new Error(text);
// // // //         }

// // // //         const result = await response.json();
// // // //         setData(result);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         setMessage("Failed to fetch data: " + error.message);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [id, navigate]);

// // // //   const handleSaveResult = (testId) => {
// // // //     alert(`Save result for test ${testId}`);
// // // //     // TODO: Implement logic for saving results
// // // //   };

// // // //   const handleConfirmPayment = (testId) => {
// // // //     alert(`Confirm payment for test ${testId}`);
// // // //     // TODO: Implement logic for confirming test payment
// // // //   };

// // // //   const handleViewProfile = () => {
// // // //     if (data?.prescription?.patient_id) {
// // // //       navigate(`/pathologist/patient/${data.prescription.patient_id}`);
// // // //     }
// // // //   };

// // // //   if (loading) return <p>Loading...</p>;
// // // //   if (message) return <p style={{ color: "red" }}>{message}</p>;
// // // //   if (!data?.prescription) return <p>No data found for the given ID.</p>;

// // // //   return (
// // // //     <div style={{ padding: "2rem" }}>
// // // //       <h2>Prescription Details</h2>

// // // //       <h3>Patient: {data.prescription.patient_name}</h3>
// // // //       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
// // // //         View Profile
// // // //       </button>

// // // //       <p>
// // // //         <strong>Symptoms:</strong> {data.prescription.symptoms}
// // // //       </p>
// // // //       <p>
// // // //         <strong>Doctor:</strong> {data.prescription.name}
// // // //       </p>
// // // //       <p>
// // // //         <strong>Doctor Comments:</strong> {data.prescription.comments}
// // // //       </p>
// // // //       <p>
// // // //         <strong>Appointment Details:</strong> {data.prescription.details}
// // // //       </p>

// // // //       <h3>Prescribed Medicines</h3>
// // // //       <ul>
// // // //         {data.medicines.length === 0 ? (
// // // //           <li>No medicines prescribed.</li>
// // // //         ) : (
// // // //           data.medicines.map((med, index) => (
// // // //             <li key={index}>
// // // //               {med.name} - {med.dosage} for {med.duration} days
// // // //             </li>
// // // //           ))
// // // //         )}
// // // //       </ul>

// // // //       <h3>Recommended Tests</h3>
// // // //       <ul>
// // // //         {data.tests.length === 0 ? (
// // // //           <li>No tests recommended.</li>
// // // //         ) : (
// // // //           data.tests.map((test, index) => (
// // // //             <li key={index} style={{ marginBottom: "1rem" }}>
// // // //               <strong>{test.name}</strong>
// // // //               <br />
// // // //               Result: {test.test_result || "N/A"}
// // // //               <br />
// // // //               Comments: {test.comments || "N/A"}
// // // //               <br />
// // // //               <button
// // // //                 onClick={() => handleSaveResult(test.test_id)}
// // // //                 style={{ marginRight: "1rem" }}
// // // //               >
// // // //                 Save Result
// // // //               </button>
// // // //               <button onClick={() => handleConfirmPayment(test.test_id)}>
// // // //                 Confirm Payment
// // // //               </button>
// // // //             </li>
// // // //           ))
// // // //         )}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PathologistPrescriptionDetails;
// // // import React, { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";

// // // const PathologistPrescriptionDetails = () => {
// // //   const { id } = useParams(); // consultation_id
// // //   const navigate = useNavigate();
// // //   const [data, setData] = useState(null);
// // //   const [message, setMessage] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [testResults, setTestResults] = useState({}); // To track result input

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       const token = localStorage.getItem("token");
// // //       if (!token) {
// // //         navigate("/login");
// // //         return;
// // //       }

// // //       try {
// // //         const response = await fetch(
// // //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// // //           {
// // //             method: "GET",
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //               token: token,
// // //             },
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           const text = await response.text();
// // //           throw new Error(text);
// // //         }

// // //         const result = await response.json();
// // //         setData(result);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setMessage("Failed to fetch data: " + error.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id, navigate]);

// // //   const handleViewProfile = () => {
// // //     if (data?.prescription?.patient_id) {
// // //       navigate(`/pathologist/patient/${data.prescription.patient_id}`);
// // //     }
// // //   };

// // //   const handleInputChange = (testId, value) => {
// // //     setTestResults((prev) => ({ ...prev, [testId]: value }));
// // //   };

// // //   const handleSaveResult = async (testId) => {
// // //     const result = testResults[testId];
// // //     if (!result) {
// // //       alert("Please enter a result before saving.");
// // //       return;
// // //     }

// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await fetch(
// // //         `http://localhost:3001/pathologist/test-result/${testId}`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //           body: JSON.stringify({ result }),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error(await response.text());
// // //       }

// // //       alert("Result saved successfully.");
// // //     } catch (err) {
// // //       alert("Failed to save result: " + err.message);
// // //     }
// // //   };

// // //   const handleConfirmPayment = async (testId) => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await fetch(
// // //         `http://localhost:3001/pathologist/confirm-payment/${testId}`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error(await response.text());
// // //       }

// // //       alert("Payment confirmed.");
// // //     } catch (err) {
// // //       alert("Failed to confirm payment: " + err.message);
// // //     }
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (message) return <p style={{ color: "red" }}>{message}</p>;
// // //   if (!data?.prescription) return <p>No data found for the given ID.</p>;

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h2>Prescription Details</h2>

// // //       <h3>Patient: {data.prescription.patient_name}</h3>
// // //       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
// // //         View Profile
// // //       </button>

// // //       <p>
// // //         <strong>Symptoms:</strong> {data.prescription.symptoms}
// // //       </p>
// // //       <p>
// // //         <strong>Doctor:</strong> {data.prescription.name}
// // //       </p>
// // //       <p>
// // //         <strong>Doctor Comments:</strong> {data.prescription.comments}
// // //       </p>
// // //       <p>
// // //         <strong>Appointment Details:</strong> {data.prescription.details}
// // //       </p>

// // //       <h3>Prescribed Medicines</h3>
// // //       <ul>
// // //         {data.medicines.length === 0 ? (
// // //           <li>No medicines prescribed.</li>
// // //         ) : (
// // //           data.medicines.map((med, index) => (
// // //             <li key={index}>
// // //               {med.name} - {med.dosage} for {med.duration} days
// // //             </li>
// // //           ))
// // //         )}
// // //       </ul>

// // //       <h3>Recommended Tests</h3>
// // //       <ul>
// // //         {data.tests.length === 0 ? (
// // //           <li>No tests recommended.</li>
// // //         ) : (
// // //           data.tests.map((test) => (
// // //             <li key={test.test_id} style={{ marginBottom: "1rem" }}>
// // //               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
// // //               {/* <br />
// // //               <strong>Current Result:</strong> {test.test_result || "N/A"}
// // //               <br /> */}
// // //               {/* <strong>Comments:</strong> {test.comments || "N/A"} */}
// // //               <br />
// // //               <label>
// // //                 <strong>Enter Result:</strong>
// // //                 <input
// // //                   type="text"
// // //                   value={testResults[test.test_id] || ""}
// // //                   onChange={(e) =>
// // //                     handleInputChange(test.test_id, e.target.value)
// // //                   }
// // //                   style={{ marginLeft: "1rem" }}
// // //                 />
// // //               </label>
// // //               <br />
// // //               <button
// // //                 onClick={() => handleSaveResult(test.test_id)}
// // //                 style={{ marginRight: "1rem" }}
// // //               >
// // //                 Save Result
// // //               </button>
// // //               <button onClick={() => handleConfirmPayment(test.test_id)}>
// // //                 Confirm Payment
// // //               </button>
// // //             </li>
// // //           ))
// // //         )}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default PathologistPrescriptionDetails;
// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const PathologistPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const [data, setData] = useState(null);
// //   const [testResults, setTestResults] = useState({});
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const token = localStorage.getItem("token");
// //       try {
// //         const response = await fetch(
// //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               "Content-Type": "application/json",
// //               token: token,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch data");
// //         }

// //         const result = await response.json();
// //         setData(result);
// //       } catch (error) {
// //         setMessage("Failed to load data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [id]);

// //   const handleInputChange = (testId, value) => {
// //     setTestResults((prev) => ({ ...prev, [testId]: value }));
// //   };

// //   const handleSaveResult = async (testId) => {
// //     const result = testResults[testId];
// //     if (!result) {
// //       alert("Please enter a result before saving.");
// //       return;
// //     }

// //     const token = localStorage.getItem("token");
// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/pathologist/test-result/${testId}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //           body: JSON.stringify({ result }),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(await response.text());
// //       }

// //       alert("Result saved successfully.");

// //       // Refresh data
// //       const refetch = await fetch(
// //         `http://localhost:3001/pathologist/prescriptions/${id}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       const updated = await refetch.json();
// //       setData(updated);
// //     } catch (err) {
// //       alert("Error: " + err.message);
// //     }
// //   };

// //   const handleConfirmPayment = (testId) => {
// //     // Placeholder for payment logic
// //     alert("Payment confirmed for test ID: " + testId);
// //   };

// //   const handleViewProfile = () => {
// //     if (data?.patient?.user_id) {
// //       navigate(`/profile/${data.patient.user_id}`);
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (message) return <div>{message}</div>;

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Pathologist Prescription Details</h2>

// //       {data?.patient && (
// //         <div style={{ marginBottom: "2rem" }}>
// //           <p>
// //             <strong>Patient Name:</strong> {data.patient.name}
// //           </p>
// //           <button onClick={handleViewProfile}>View Profile</button>
// //         </div>
// //       )}

// //       <h3>Recommended Tests</h3>
// //       <ul>
// //         {data.tests.length === 0 ? (
// //           <li>No tests recommended.</li>
// //         ) : (
// //           data.tests.map((test) => (
// //             <li key={test.test_id} style={{ marginBottom: "1.5rem" }}>
// //               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
// //               <br />
// //               <strong>Current Result:</strong> {test.result || "N/A"}
// //               <br />
// //               <strong>Date:</strong> {test.date || "Not recorded"}
// //               <br />
// //               <label>
// //                 <strong>Enter Result:</strong>
// //                 <input
// //                   type="text"
// //                   value={testResults[test.test_id] || ""}
// //                   onChange={(e) =>
// //                     handleInputChange(test.test_id, e.target.value)
// //                   }
// //                   style={{ marginLeft: "1rem" }}
// //                 />
// //               </label>
// //               <br />
// //               <button
// //                 onClick={() => handleSaveResult(test.test_id)}
// //                 style={{ marginRight: "1rem" }}
// //               >
// //                 Save Result
// //               </button>
// //               <button onClick={() => handleConfirmPayment(test.test_id)}>
// //                 Confirm Payment
// //               </button>
// //             </li>
// //           ))
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default PathologistPrescriptionDetails;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const PathologistPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
//   const [data, setData] = useState(null);
//   const [testResults, setTestResults] = useState({});
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch(
//           `http://localhost:3001/pathologist/prescriptions/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setMessage("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleInputChange = (testId, value) => {
//     setTestResults((prev) => ({ ...prev, [testId]: value }));
//   };

//   const handleSaveResult = async (testId) => {
//     const result = testResults[testId];
//     if (!result) {
//       alert("Please enter a result before saving.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(
//         `http://localhost:3001/pathologist/test-result/${testId}/${id}`, // ✅ include consult_id (id)
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({ result }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(await response.text());
//       }

//       alert("Result saved successfully.");

//       // Refresh data
//       const refetch = await fetch(
//         `http://localhost:3001/pathologist/prescriptions/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       const updated = await refetch.json();
//       setData(updated);
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   const handleConfirmPayment = (testId) => {
//     alert("Payment confirmed for test ID: " + testId);
//   };

//   const handleViewProfile = () => {
//     if (data?.patient?.user_id) {
//       navigate(`/profile/${data.patient.user_id}`);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (message) return <div>{message}</div>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Pathologist Prescription Details</h2>

//       {data?.patient && (
//         <div style={{ marginBottom: "2rem" }}>
//           <p>
//             <strong>Patient Name:</strong> {data.patient.name}
//           </p>
//           <button onClick={handleViewProfile}>View Profile</button>
//         </div>
//       )}

//       <h3>Recommended Tests</h3>
//       <ul>
//         {data.tests.length === 0 ? (
//           <li>No tests recommended.</li>
//         ) : (
//           data.tests.map((test) => (
//             <li key={test.test_id} style={{ marginBottom: "1.5rem" }}>
//               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
//               <br />
//               <strong>Current Result:</strong> {test.result || "N/A"}
//               <br />
//               <strong>Date:</strong> {test.date || "Not recorded"}
//               <br />
//               <label>
//                 <strong>Enter Result:</strong>
//                 <input
//                   type="text"
//                   value={testResults[test.test_id] || ""}
//                   onChange={(e) =>
//                     handleInputChange(test.test_id, e.target.value)
//                   }
//                   style={{ marginLeft: "1rem" }}
//                 />
//               </label>
//               <br />
//               <button
//                 onClick={() => handleSaveResult(test.test_id)}
//                 style={{ marginRight: "1rem" }}
//               >
//                 Save Result
//               </button>
//               <button onClick={() => handleConfirmPayment(test.test_id)}>
//                 Confirm Payment
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default PathologistPrescriptionDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PathologistPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const [data, setData] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3001/pathologist/prescriptions/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setMessage("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (testId, value) => {
    setTestResults((prev) => ({ ...prev, [testId]: value }));
  };

  const handleSaveResult = async (testId) => {
    const result = testResults[testId];
    if (!result) {
      alert("Please enter a result before saving.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/test-result/${testId}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ result }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Result saved successfully.");

      // Refresh data
      const refetch = await fetch(
        `http://localhost:3001/pathologist/prescriptions/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const updated = await refetch.json();
      setData(updated);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleConfirmPayment = (testId) => {
    alert("Payment confirmed for test ID: " + testId);
  };

  const handleViewProfile = () => {
    const userId = data?.prescription?.patient_id;
    if (userId) {
      navigate(`/pathologist/patient/${userId}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (message) return <div>{message}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pathologist Prescription Details</h2>

      {data?.prescription && (
        <div style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Patient Name:</strong> {data.prescription.patient_name}
            <button onClick={handleViewProfile} style={{ marginLeft: "1rem" }}>
              View Profile
            </button>
          </p>
          <p>
            <strong>Symptoms:</strong> {data.prescription.symptoms || "N/A"}
          </p>
          <p>
            <strong>Doctor Comments:</strong>{" "}
            {data.prescription.comments || "N/A"}
          </p>
        </div>
      )}

      <h3>Recommended Tests</h3>
      <ul>
        {data.tests.length === 0 ? (
          <li>No tests recommended.</li>
        ) : (
          data.tests.map((test) => (
            <li key={test.test_id} style={{ marginBottom: "1.5rem" }}>
              <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
              <br />
              <strong>Current Result:</strong> {test.test_result || "N/A"}
              <br />
              <label>
                <strong>Enter Result:</strong>
                <input
                  type="text"
                  value={testResults[test.test_id] || ""}
                  onChange={(e) =>
                    handleInputChange(test.test_id, e.target.value)
                  }
                  style={{ marginLeft: "1rem" }}
                />
              </label>
              <br />
              <button
                onClick={() => handleSaveResult(test.test_id)}
                style={{ marginRight: "1rem" }}
              >
                Save Result
              </button>
              <button onClick={() => handleConfirmPayment(test.test_id)}>
                Confirm Payment
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PathologistPrescriptionDetails;
