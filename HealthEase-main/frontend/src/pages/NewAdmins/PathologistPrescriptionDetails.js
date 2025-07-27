// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";

// // // // const PathologistPrescriptionDetails = () => {
// // // //   const { id } = useParams(); // consultation_id
// // // //   const [data, setData] = useState(null);
// // // //   const [testResults, setTestResults] = useState({});
// // // //   const [message, setMessage] = useState("");
// // // //   const [loading, setLoading] = useState(true);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       const token = localStorage.getItem("token");
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
// // // //           throw new Error("Failed to fetch data");
// // // //         }

// // // //         const result = await response.json();
// // // //         setData(result);
// // // //       } catch (error) {
// // // //         setMessage("Failed to load data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [id]);

// // // //   const handleInputChange = (testId, value) => {
// // // //     setTestResults((prev) => ({ ...prev, [testId]: value }));
// // // //   };

// // // //   const handleSaveResult = async (testId) => {
// // // //     const result = testResults[testId];
// // // //     if (!result) {
// // // //       alert("Please enter a result before saving.");
// // // //       return;
// // // //     }

// // // //     const token = localStorage.getItem("token");
// // // //     try {
// // // //       const response = await fetch(
// // // //         `http://localhost:3001/pathologist/test-result/${testId}/${id}`,
// // // //         {
// // // //           method: "POST",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             token: token,
// // // //           },
// // // //           body: JSON.stringify({ result }),
// // // //         }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(await response.text());
// // // //       }

// // // //       alert("Result saved successfully.");

// // // //       // Refresh data
// // // //       const refetch = await fetch(
// // // //         `http://localhost:3001/pathologist/prescriptions/${id}`,
// // // //         {
// // // //           method: "GET",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             token: token,
// // // //           },
// // // //         }
// // // //       );

// // // //       const updated = await refetch.json();
// // // //       setData(updated);
// // // //     } catch (err) {
// // // //       alert("Error: " + err.message);
// // // //     }
// // // //   };

// // // //   const handleConfirmPayment = (testId) => {
// // // //     alert("Payment confirmed for test ID: " + testId);
// // // //   };

// // // //   const handleViewProfile = () => {
// // // //     const userId = data?.prescription?.patient_id;
// // // //     if (userId) {
// // // //       navigate(`/pathologist/patient/${userId}`);
// // // //     }
// // // //   };

// // // //   if (loading) return <div>Loading...</div>;
// // // //   if (message) return <div>{message}</div>;

// // // //   return (
// // // //     <div style={{ padding: "2rem" }}>
// // // //       <h2>Pathologist Prescription Details</h2>

// // // //       {data?.prescription && (
// // // //         <div style={{ marginBottom: "2rem" }}>
// // // //           <p>
// // // //             <strong>Patient Name:</strong> {data.prescription.patient_name}
// // // //             <button onClick={handleViewProfile} style={{ marginLeft: "1rem" }}>
// // // //               View Profile
// // // //             </button>
// // // //           </p>
// // // //           <p>
// // // //             <strong>Symptoms:</strong> {data.prescription.symptoms || "N/A"}
// // // //           </p>
// // // //           <p>
// // // //             <strong>Doctor Comments:</strong>{" "}
// // // //             {data.prescription.comments || "N/A"}
// // // //           </p>
// // // //         </div>
// // // //       )}

// // // //       <h3>Recommended Tests</h3>
// // // //       <ul>
// // // //         {data.tests.length === 0 ? (
// // // //           <li>No tests recommended.</li>
// // // //         ) : (
// // // //           data.tests.map((test) => (
// // // //             <li key={test.test_id} style={{ marginBottom: "1.5rem" }}>
// // // //               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
// // // //               <br />
// // // //               <strong>Current Result:</strong> {test.test_result || "N/A"}
// // // //               <br />
// // // //               <label>
// // // //                 <strong>Enter Result:</strong>
// // // //                 <input
// // // //                   type="text"
// // // //                   value={testResults[test.test_id] || ""}
// // // //                   onChange={(e) =>
// // // //                     handleInputChange(test.test_id, e.target.value)
// // // //                   }
// // // //                   style={{ marginLeft: "1rem" }}
// // // //                 />
// // // //               </label>
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
// // //   const [data, setData] = useState({
// // //     prescription: {},
// // //     medicines: [],
// // //     tests: [],
// // //   });
// // //   const [testResults, setTestResults] = useState({});
// // //   const [message, setMessage] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   const token = localStorage.getItem("token");

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `http://localhost:3001/pathologist/prescriptions/${id}`,
// // //           {
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //               token: token,
// // //             },
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error("Failed to fetch prescription data");
// // //         }

// // //         const result = await response.json();
// // //         setData(result);

// // //         // Initialize test results from backend
// // //         const initialResults = {};
// // //         result.tests.forEach((test) => {
// // //           initialResults[test.test_id] = test.test_result || "";
// // //         });
// // //         setTestResults(initialResults);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setMessage("Error: " + error.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id, token]);

// // //   const handleInputChange = (testId, value) => {
// // //     setTestResults((prev) => ({
// // //       ...prev,
// // //       [testId]: value,
// // //     }));
// // //   };

// // //   const handleSaveResult = async (testId) => {
// // //     const result = testResults[testId];

// // //     try {
// // //       const response = await fetch(
// // //         `http://localhost:3001/pathologist/test-result`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //           body: JSON.stringify({
// // //             consultation_id: id,
// // //             test_id: testId,
// // //             result: result,
// // //           }),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error("Failed to save test result");
// // //       }

// // //       alert("Test result saved!");
// // //     } catch (error) {
// // //       alert("Error saving result: " + error.message);
// // //     }
// // //   };

// // //   const handleConfirmPayment = async (test) => {
// // //     const patientId = data?.prescription?.patient_id;

// // //     try {
// // //       const response = await fetch(
// // //         `http://localhost:3001/pathologist/test/payment/${test.test_id}/${patientId}/${test.test_number}`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         const errorText = await response.text();
// // //         throw new Error(errorText || "Payment failed");
// // //       }

// // //       alert("Payment successful!");

// // //       // Refresh data after payment
// // //       const updatedResponse = await fetch(
// // //         `http://localhost:3001/pathologist/prescriptions/${id}`,
// // //         {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             token: token,
// // //           },
// // //         }
// // //       );
// // //       const updatedData = await updatedResponse.json();
// // //       setData(updatedData);
// // //     } catch (err) {
// // //       alert("Payment error: " + err.message);
// // //     }
// // //   };

// // //   const handleViewProfile = () => {
// // //     navigate(`/pathologist/patient/${data.prescription.patient_id}`);
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (message) return <p>{message}</p>;

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h2>Prescription Details</h2>
// // //       <p><strong>Patient:</strong> {data.prescription.patient_name}</p>
// // //       <p><strong>Symptoms:</strong> {data.prescription.symptoms}</p>
// // //       <p><strong>Comments:</strong> {data.prescription.comments}</p>
// // //       <p><strong>Doctor:</strong> {data.prescription.name}</p>
// // //       <p><strong>Appointment Details:</strong> {data.prescription.details}</p>
// // //       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
// // //         View Profile
// // //       </button>

// // //       <h3>Medicines</h3>
// // //       <ul>
// // //         {data.medicines.length === 0 ? (
// // //           <li>No medicines prescribed.</li>
// // //         ) : (
// // //           data.medicines.map((med) => (
// // //             <li key={med.medicine_id}>
// // //               {med.name} - {med.dosage}, {med.duration} days
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
// // //             <li key={test.test_id + test.test_number} style={{ marginBottom: "1.5rem" }}>
// // //               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
// // //               <br />
// // //               <strong>Current Result:</strong> {test.test_result || "N/A"}
// // //               <br />
// // //               <label>
// // //                 <strong>Enter Result:</strong>
// // //                 <input
// // //                   type="text"
// // //                   value={testResults[test.test_id] || ""}
// // //                   onChange={(e) => handleInputChange(test.test_id, e.target.value)}
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
// // //               {test.payment_state !== "C" ? (
// // //                 <button onClick={() => handleConfirmPayment(test)}>
// // //                   Confirm Payment
// // //                 </button>
// // //               ) : (
// // //                 <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
// // //               )}
// // //             </li>
// // //           ))
// // //         )}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default PathologistPrescriptionDetails;
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // const PathologistPrescriptionDetails = () => {
// //   const { id } = useParams(); // consultation_id
// //   const navigate = useNavigate();
// //   const [data, setData] = useState({
// //     prescription: {},
// //     medicines: [],
// //     tests: [],
// //   });
// //   const [testResults, setTestResults] = useState({});
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchData();
// //   }, [id]);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/pathologist/prescriptions/${id}`, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           token: token,
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch prescription data");
// //       }

// //       const result = await response.json();
// //       setData(result);

// //       const initialResults = {};
// //       result.tests.forEach((test) => {
// //         initialResults[test.test_id] = test.test_result || "";
// //       });
// //       setTestResults(initialResults);
// //       setLoading(false);
// //     } catch (error) {
// //       setMessage("Error: " + error.message);
// //       setLoading(false);
// //     }
// //   };

// //   const handleInputChange = (testId, value) => {
// //     setTestResults((prev) => ({
// //       ...prev,
// //       [testId]: value,
// //     }));
// //   };

// //   const handleSaveResult = async (testId) => {
// //     const result = testResults[testId];

// //     try {
// //       const response = await fetch(`http://localhost:3001/pathologist/test-result/${testId}/${id}`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           token: token,
// //         },
// //         body: JSON.stringify({ result }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to save test result");
// //       }

// //       alert("Test result saved!");
// //       fetchData();
// //     } catch (error) {
// //       alert("Error saving result: " + error.message);
// //     }
// //   };

// //   const handleConfirmPayment = async (test) => {
// //     const patientId = data?.prescription?.patient_id;

// //     if (!test.test_id || !patientId || !test.test_number) {
// //       alert("Missing test or patient info.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/pathologist/test/payment/${test.test_id}/${patientId}/${test.test_number}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(errorText || "Payment failed");
// //       }

// //       alert("Payment successful!");
// //       fetchData();
// //     } catch (err) {
// //       alert("Payment error: " + err.message);
// //     }
// //   };

// //   const handleViewProfile = () => {
// //     navigate(`/pathologist/patient/${data.prescription.patient_id}`);
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (message) return <p>{message}</p>;

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Prescription Details</h2>
// //       <p><strong>Patient:</strong> {data.prescription.patient_name}</p>
// //       <p><strong>Symptoms:</strong> {data.prescription.symptoms}</p>
// //       <p><strong>Comments:</strong> {data.prescription.comments}</p>
// //       <p><strong>Doctor:</strong> {data.prescription.name}</p>
// //       <p><strong>Appointment Details:</strong> {data.prescription.details}</p>
// //       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
// //         View Profile
// //       </button>

// //       <h3>Medicines</h3>
// //       <ul>
// //         {data.medicines.length === 0 ? (
// //           <li>No medicines prescribed.</li>
// //         ) : (
// //           data.medicines.map((med) => (
// //             <li key={med.medicine_id}>
// //               {med.name} - {med.dosage}, {med.duration} days
// //             </li>
// //           ))
// //         )}
// //       </ul>

// //       <h3>Recommended Tests</h3>
// //       <ul>
// //         {data.tests.length === 0 ? (
// //           <li>No tests recommended.</li>
// //         ) : (
// //           data.tests.map((test) => (
// //             <li key={test.test_id + test.test_number} style={{ marginBottom: "1.5rem" }}>
// //               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
// //               <br />
// //               <strong>Current Result:</strong> {test.test_result || "N/A"}
// //               <br />
// //               <label>
// //                 <strong>Enter Result:</strong>
// //                 <input
// //                   type="text"
// //                   value={testResults[test.test_id] || ""}
// //                   onChange={(e) => handleInputChange(test.test_id, e.target.value)}
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
// //               {test.payment_state !== "C" ? (
// //                 <button onClick={() => handleConfirmPayment(test)}>
// //                   Confirm Payment
// //                 </button>
// //               ) : (
// //                 <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
// //               )}
// //             </li>
// //           ))
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default PathologistPrescriptionDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const PathologistPrescriptionDetails = () => {
//   const { id } = useParams(); // consultation_id
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     prescription: {},
//     medicines: [],
//     tests: [],
//   });
//   const [testResults, setTestResults] = useState({});
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/pathologist/prescriptions/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch prescription data");
//       }

//       const result = await response.json();
//       setData(result);

//       const initialResults = {};
//       result.tests.forEach((test) => {
//         initialResults[test.test_id] = test.test_result || "";
//       });
//       setTestResults(initialResults);
//       setLoading(false);
//     } catch (error) {
//       setMessage("Error: " + error.message);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (testId, value) => {
//     setTestResults((prev) => ({
//       ...prev,
//       [testId]: value,
//     }));
//   };

//   const handleSaveResult = async (testId) => {
//     const result = testResults[testId];

//     try {
//       const response = await fetch(`http://localhost:3001/pathologist/test-result/${testId}/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//         body: JSON.stringify({ result }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save test result");
//       }

//       alert("Test result saved!");
//       fetchData();
//     } catch (error) {
//       alert("Error saving result: " + error.message);
//     }
//   };

//   const handleConfirmPayment = async (test) => {
//     if (!test.test_number) {
//       alert("Missing test number.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3001/pathologist/test/payment/${test.test_number}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Payment failed");
//       }

//       alert("Payment successful!");
//       fetchData();
//     } catch (err) {
//       alert("Payment error: " + err.message);
//     }
//   };

//   const handleViewProfile = () => {
//     navigate(`/pathologist/patient/${data.prescription.patient_id}`);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (message) return <p>{message}</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Prescription Details</h2>
//       <p><strong>Patient:</strong> {data.prescription.patient_name}</p>
//       <p><strong>Symptoms:</strong> {data.prescription.symptoms}</p>
//       <p><strong>Comments:</strong> {data.prescription.comments}</p>
//       <p><strong>Doctor:</strong> {data.prescription.name}</p>
//       <p><strong>Appointment Details:</strong> {data.prescription.details}</p>
//       <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
//         View Profile
//       </button>

//       <h3>Medicines</h3>
//       <ul>
//         {data.medicines.length === 0 ? (
//           <li>No medicines prescribed.</li>
//         ) : (
//           data.medicines.map((med) => (
//             <li key={med.medicine_id}>
//               {med.name} - {med.dosage}, {med.duration} days
//             </li>
//           ))
//         )}
//       </ul>

//       <h3>Recommended Tests</h3>
//       <ul>
//         {data.tests.length === 0 ? (
//           <li>No tests recommended.</li>
//         ) : (
//           data.tests.map((test) => (
//             <li key={test.test_number} style={{ marginBottom: "1.5rem" }}>
//               <strong>Test Name:</strong> {test.test_name || test.name || "N/A"}
//               <br />
//               <strong>Current Result:</strong> {test.test_result || "N/A"}
//               <br />
//               <label>
//                 <strong>Enter Result:</strong>
//                 <input
//                   type="text"
//                   value={testResults[test.test_id] || ""}
//                   onChange={(e) => handleInputChange(test.test_id, e.target.value)}
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
//               {test.payment_state !== "C" ? (
//                 <button onClick={() => handleConfirmPayment(test)}>
//                   Confirm Payment
//                 </button>
//               ) : (
//                 <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default PathologistPrescriptionDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PathologistPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const navigate = useNavigate();
  const [data, setData] = useState({
    prescription: {},
    medicines: [],
    tests: [],
  });
  const [testResults, setTestResults] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/prescriptions/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prescription data");
      }

      const result = await response.json();
      setData(result);

      const initialResults = {};
      result.tests.forEach((test) => {
        initialResults[test.test_id] = test.test_result || "";
      });
      setTestResults(initialResults);
      setLoading(false);
    } catch (error) {
      setMessage("Error: " + error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (testId, value) => {
    setTestResults((prev) => ({
      ...prev,
      [testId]: value,
    }));
  };

  const handleSaveResult = async (testId) => {
    const result = testResults[testId];

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
        throw new Error("Failed to save test result");
      }

      alert("Test result saved!");
      fetchData();
    } catch (error) {
      alert("Error saving result: " + error.message);
    }
  };

  const handleConfirmPayment = async (testNumber) => {
    if (!testNumber) {
      alert("Missing test number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/pathologist/test/payment/${testNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment failed");
      }

      alert("Payment successful!");
      fetchData();
    } catch (err) {
      alert("Payment error: " + err.message);
    }
  };

  const handleViewProfile = () => {
    navigate(`/pathologist/patient/${data.prescription.patient_id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prescription Details</h2>
      <p>
        <strong>Patient:</strong> {data.prescription.patient_name}
      </p>
      <p>
        <strong>Symptoms:</strong> {data.prescription.symptoms}
      </p>
      <p>
        <strong>Comments:</strong> {data.prescription.comments}
      </p>
      <p>
        <strong>Doctor:</strong> {data.prescription.name}
      </p>
      <p>
        <strong>Appointment Details:</strong> {data.prescription.details}
      </p>
      <button onClick={handleViewProfile} style={{ marginBottom: "1rem" }}>
        View Profile
      </button>

      <h3>Medicines</h3>
      <ul>
        {data.medicines.length === 0 ? (
          <li>No medicines prescribed.</li>
        ) : (
          data.medicines.map((med) => (
            <li key={med.medicine_id}>
              {med.name} - {med.dosage}, {med.duration} days
            </li>
          ))
        )}
      </ul>

      <h3>Recommended Tests</h3>
      <ul>
        {data.tests.length === 0 ? (
          <li>No tests recommended.</li>
        ) : (
          data.tests.map((test) => (
            <li key={test.test_number} style={{ marginBottom: "1.5rem" }}>
              <strong>Test Number:</strong> {test.test_number}
              <br />
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
              {test.payment_state !== "C" ? (
                <button onClick={() => handleConfirmPayment(test.test_number)}>
                  Confirm Payment
                </button>
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PathologistPrescriptionDetails;
