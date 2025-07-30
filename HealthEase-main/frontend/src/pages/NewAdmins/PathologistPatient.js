// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/Pathologist/PathologistPatient.css";

// const PathologistPatient = () => {
//   const { id } = useParams(); // patient_id
//   const navigate = useNavigate();
//   const [tests, setTests] = useState([]);
//   const [patientName, setPatientName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication token not found.");

//         const response = await fetch(
//           `http://localhost:3001/pathologist/patient/${id}/tests`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         if (!response.ok) throw new Error(await response.text());

//         const data = await response.json();
//         setTests(data.tests);
//         setPatientName(data.patientName);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, [id]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBackToPrescriptions = () => {
//     navigate("/pathologist/prescriptions");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getResultStatus = (result) => {
//     return result && result.trim() !== "" ? "completed" : "pending";
//   };

//   const getResultDisplay = (result) => {
//     return result && result.trim() !== "" ? result : "Pending";
//   };

//   if (loading) {
//     return (
//       <div className="pathologist-patient">
//         <div className="pathologist-patient-header">
//           <div className="pathologist-patient-header-content">
//             <div className="pathologist-patient-logo">
//               <h1>HealthEase</h1>
//               <span className="pathologist-patient-logo-subtitle">
//                 Laboratory Management System
//               </span>
//             </div>
//             <div className="pathologist-patient-header-actions">
//               <button
//                 className="pathologist-patient-back-btn"
//                 onClick={handleBackToPrescriptions}
//               >
//                 Back to Prescriptions
//               </button>
//               <button
//                 className="pathologist-patient-logout-btn"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="pathologist-patient-main">
//           <div className="pathologist-patient-loading">
//             <div className="pathologist-patient-loading-spinner"></div>
//             <p>Loading patient test records...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pathologist-patient">
//       <div className="pathologist-patient-header">
//         <div className="pathologist-patient-header-content">
//           <div className="pathologist-patient-logo">
//             <h1>HealthEase</h1>
//             <span className="pathologist-patient-logo-subtitle">
//               Laboratory Management System
//             </span>
//           </div>
//           <div className="pathologist-patient-header-actions">
//             <button
//               className="pathologist-patient-back-btn"
//               onClick={handleBackToPrescriptions}
//             >
//               Back to Prescriptions
//             </button>
//             <button
//               className="pathologist-patient-logout-btn"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="pathologist-patient-main">
//         <div className="pathologist-patient-page-header">
//           <h2>Patient Test Records</h2>
//           <p>Complete laboratory test history and results</p>
//         </div>

//         {/* Patient Information Card */}
//         <div className="pathologist-patient-info-card">
//           <h3>Patient Information</h3>
//           <div className="pathologist-patient-patient-name">
//             {patientName ? patientName : `Patient ID: ${id}`}
//           </div>
//         </div>

//         {error && (
//           <div className="pathologist-patient-message error">{error}</div>
//         )}

//         {/* Tests Container */}
//         <div className="pathologist-patient-tests-container">
//           <div className="pathologist-patient-tests-header">
//             <h3>Laboratory Test History</h3>
//           </div>

//           {tests.length === 0 ? (
//             <div className="pathologist-patient-no-tests">
//               <div className="pathologist-patient-no-tests-icon">🔬</div>
//               <h3>No test records found</h3>
//               <p>This patient has no laboratory test records in the system.</p>
//             </div>
//           ) : (
//             <div className="pathologist-patient-table-container">
//               <table className="pathologist-patient-tests-table">
//                 <thead>
//                   <tr>
//                     <th>Test Name</th>
//                     <th>Result</th>
//                     <th>Date</th>
//                     <th>Consultation ID</th>
//                     <th>Comments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tests.map((test, index) => (
//                     <tr key={index}>
//                       <td data-label="Test Name">
//                         <span className="pathologist-patient-test-name">
//                           {test.test_name}
//                         </span>
//                       </td>
//                       <td data-label="Result">
//                         <span
//                           className={`pathologist-patient-test-result ${getResultStatus(
//                             test.test_result
//                           )}`}
//                         >
//                           {getResultDisplay(test.test_result)}
//                         </span>
//                       </td>
//                       <td data-label="Date">
//                         <span className="pathologist-patient-test-date">
//                           {formatDate(test.updated_at)}
//                         </span>
//                       </td>
//                       <td data-label="Consultation ID">
//                         <span className="pathologist-patient-consultation-id">
//                           {test.consultation_id}
//                         </span>
//                       </td>
//                       <td data-label="Comments">
//                         <span className="pathologist-patient-test-comments">
//                           {test.comments || "—"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PathologistPatient;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Pathologist/PathologistPatient.css";

const PathologistPatient = () => {
  const { id } = useParams(); // patient_id
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch(
          `http://localhost:3001/pathologist/patient/${id}/tests`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setTests(data.tests);
        setPatientName(data.patientName);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3001/payment/balance/${id}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch balance");
        const data = await res.json();
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTests();
    fetchBalance();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToPrescriptions = () => {
    navigate("/pathologist/prescriptions");
  };

  const handleUpdateBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/pharmacist/patient/${id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ amount: newBalance }),
        }
      );
      if (!response.ok) throw new Error("Failed to update balance");
      const data = await response.json();
      setBalance(data.balance);
      setNewBalance("");
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getResultStatus = (result) => {
    return result && result.trim() !== "" ? "completed" : "pending";
  };

  const getResultDisplay = (result) => {
    return result && result.trim() !== "" ? result : "Pending";
  };

  if (loading) {
    return (
      <div className="pathologist-patient">
        <div className="pathologist-patient-header">
          <div className="pathologist-patient-header-content">
            <div className="pathologist-patient-logo">
              <h1>HealthEase</h1>
              <span className="pathologist-patient-logo-subtitle">
                Laboratory Management System
              </span>
            </div>
            <div className="pathologist-patient-header-actions">
              <button
                className="pathologist-patient-back-btn"
                onClick={handleBackToPrescriptions}
              >
                Back to Prescriptions
              </button>
              <button
                className="pathologist-patient-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="pathologist-patient-main">
          <div className="pathologist-patient-loading">
            <div className="pathologist-patient-loading-spinner"></div>
            <p>Loading patient test records...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pathologist-patient">
      <div className="pathologist-patient-header">
        <div className="pathologist-patient-header-content">
          <div className="pathologist-patient-logo">
            <h1>HealthEase</h1>
            <span className="pathologist-patient-logo-subtitle">
              Laboratory Management System
            </span>
          </div>
          <div className="pathologist-patient-header-actions">
            <button
              className="pathologist-patient-back-btn"
              onClick={handleBackToPrescriptions}
            >
              Back to Prescriptions
            </button>
            <button
              className="pathologist-patient-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="pathologist-patient-main">
        <div className="pathologist-patient-page-header">
          <h2>Patient Test Records</h2>
          <p>Complete laboratory test history and results</p>
        </div>

        {/* Patient Info and Balance Section */}
        <div className="pathologist-patient-info-card">
          <h3>Patient Information</h3>
          <div className="pathologist-patient-patient-name">
            {patientName ? patientName : `Patient ID: ${id}`}
          </div>
          <div className="pathologist-balance-section">
            <p>
              Current Balance:{" "}
              <strong>
                {balance !== null ? `${balance} BDT` : "Loading..."}
              </strong>
            </p>
            <div className="pathologist-balance-update">
              <input
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="New balance"
              />
              <button onClick={handleUpdateBalance}>Update Balance</button>
            </div>
          </div>
        </div>

        {error && (
          <div className="pathologist-patient-message error">{error}</div>
        )}

        {/* Tests Container */}
        <div className="pathologist-patient-tests-container">
          <div className="pathologist-patient-tests-header">
            <h3>Laboratory Test History</h3>
          </div>

          {tests.length === 0 ? (
            <div className="pathologist-patient-no-tests">
              <div className="pathologist-patient-no-tests-icon">🔬</div>
              <h3>No test records found</h3>
              <p>This patient has no laboratory test records in the system.</p>
            </div>
          ) : (
            <div className="pathologist-patient-table-container">
              <table className="pathologist-patient-tests-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                    <th>Date</th>
                    <th>Consultation ID</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, index) => (
                    <tr key={index}>
                      <td data-label="Test Name">
                        <span className="pathologist-patient-test-name">
                          {test.test_name}
                        </span>
                      </td>
                      <td data-label="Result">
                        <span
                          className={`pathologist-patient-test-result ${getResultStatus(
                            test.test_result
                          )}`}
                        >
                          {getResultDisplay(test.test_result)}
                        </span>
                      </td>
                      <td data-label="Date">
                        <span className="pathologist-patient-test-date">
                          {formatDate(test.updated_at)}
                        </span>
                      </td>
                      <td data-label="Consultation ID">
                        <span className="pathologist-patient-consultation-id">
                          {test.consultation_id}
                        </span>
                      </td>
                      <td data-label="Comments">
                        <span className="pathologist-patient-test-comments">
                          {test.comments || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathologistPatient;
