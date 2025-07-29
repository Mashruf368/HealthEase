// // // import React, { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";

// // // const PharmacistPatient = () => {
// // //   const { id } = useParams(); // patient_id from route
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchTransactions = async () => {
// // //       try {
// // //         const token = localStorage.getItem("token");
// // //         if (!token) {
// // //           throw new Error("Authentication token not found.");
// // //         }

// // //         const response = await fetch(
// // //           `http://localhost:3001/pharmacist/patient/${id}`,
// // //           {
// // //             method: "GET",
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //               //Authorization: `Bearer ${token}`, // Correct header for token
// // //               token: token,
// // //             },
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           const message = await response.text();
// // //           throw new Error(message || "Failed to fetch transaction history");
// // //         }

// // //         const data = await response.json();
// // //         setTransactions(data);
// // //       } catch (err) {
// // //         setError(err.message);
// // //       }
// // //     };

// // //     fetchTransactions();
// // //   }, [id]);

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h2>Transaction History for Patient ID: {id}</h2>
// // //       {error && <p style={{ color: "red" }}>{error}</p>}
// // //       {transactions.length === 0 ? (
// // //         <p>No transactions found.</p>
// // //       ) : (
// // //         <table
// // //           border="1"
// // //           cellPadding="10"
// // //           style={{ marginTop: "1rem", width: "100%" }}
// // //         >
// // //           <thead>
// // //             <tr>
// // //               <th>Medicine Name</th>
// // //               <th>Amount</th>
// // //               <th>Cost</th> {/* New column */}
// // //               <th>Status</th>
// // //               <th>Timestamp</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {transactions.map((txn, index) => (
// // //               <tr key={index}>
// // //                 <td>{txn.name}</td>
// // //                 <td>{txn.amount}</td>
// // //                 <td>{txn.cost}</td> {/* Display cost */}
// // //                 <td>{txn.state}</td>
// // //                 <td>{new Date(txn.created_at).toLocaleString()}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PharmacistPatient;
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const PharmacistPatient = () => {
// //   const { id } = useParams(); // patient_id from route
// //   const [pending, setPending] = useState([]);
// //   const [completed, setCompleted] = useState([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchTransactions = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) throw new Error("Authentication token not found.");

// //         const response = await fetch(
// //           `http://localhost:3001/pharmacist/patient/${id}`,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               token: token,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           const message = await response.text();
// //           throw new Error(message || "Failed to fetch transactions");
// //         }

// //         const data = await response.json();
// //         setPending(data.pending);
// //         setCompleted(data.completed);
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //     };

// //     fetchTransactions();
// //   }, [id]);

// //   const handleConfirmPurchase = async (transaction_id) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `http://localhost:3001/pharmacist/confirm/${transaction_id}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       if (!response.ok) throw new Error("Failed to confirm purchase");

// //       // Refresh after confirming
// //       const updated = pending.filter((txn) => txn.transaction_id !== transaction_id);
// //       setPending(updated);
// //       const confirmed = await response.json();
// //       setCompleted([...completed, confirmed]);
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Transaction History for Patient ID: {id}</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
// //         {/* Pending Transactions */}
// //         <div style={{ flex: 1 }}>
// //           <h3>Pending Transactions</h3>
// //           {pending.length === 0 ? (
// //             <p>No pending transactions.</p>
// //           ) : (
// //             <table border="1" cellPadding="10" width="100%">
// //               <thead>
// //                 <tr>
// //                   <th>Medicine Name</th>
// //                   <th>Amount</th>
// //                   <th>Cost</th>
// //                   <th>Status</th>
// //                   <th>Timestamp</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {pending.map((txn) => (
// //                   <tr key={txn.transaction_id}>
// //                     <td>{txn.name}</td>
// //                     <td>{txn.amount}</td>
// //                     <td>{txn.cost}</td>
// //                     <td>{txn.state}</td>
// //                     <td>{new Date(txn.created_at).toLocaleString()}</td>
// //                     <td>
// //                       <button onClick={() => handleConfirmPurchase(txn.transaction_id)}>
// //                         Confirm Purchase
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>

// //         {/* Completed Transactions */}
// //         <div style={{ flex: 1 }}>
// //           <h3>Previous Transactions</h3>
// //           {completed.length === 0 ? (
// //             <p>No completed transactions.</p>
// //           ) : (
// //             <table border="1" cellPadding="10" width="100%">
// //               <thead>
// //                 <tr>
// //                   <th>Medicine Name</th>
// //                   <th>Amount</th>
// //                   <th>Cost</th>
// //                   <th>Status</th>
// //                   <th>Timestamp</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {completed.map((txn, index) => (
// //                   <tr key={index}>
// //                     <td>{txn.name}</td>
// //                     <td>{txn.amount}</td>
// //                     <td>{txn.cost}</td>
// //                     <td>{txn.state}</td>
// //                     <td>{new Date(txn.created_at).toLocaleString()}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PharmacistPatient;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const PharmacistPatient = () => {
//   const { id } = useParams(); // patient_id
//   const [pending, setPending] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [error, setError] = useState("");
//   const [balance, setBalance] = useState(null);
//   const [newBalance, setNewBalance] = useState("");

//   // Fetch transactions and balance
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication token not found.");

//         const resTxn = await fetch(
//           `http://localhost:3001/pharmacist/patient/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );
//         if (!resTxn.ok) throw new Error(await resTxn.text());
//         const data = await resTxn.json();
//         setPending(data.pending);
//         setCompleted(data.completed);

//         // Fetch balance separately
//         const resBal = await fetch(`http://localhost:3001/payment/balance/${id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });
//         if (!resBal.ok) throw new Error(await resBal.text());
//         const balanceData = await resBal.json();
//         setBalance(balanceData.balance);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleConfirmPurchase = async (transaction_id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3001/pharmacist/confirm/${transaction_id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to confirm purchase");

//       const confirmed = await response.json();

//       // Update UI
//       setPending((prev) =>
//         prev.filter((txn) => txn.transaction_id !== transaction_id)
//       );
//       setCompleted((prev) => [...prev, confirmed]);

//       // Refresh balance
//       const resBal = await fetch(`http://localhost:3001/payment/balance/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//       });
//       const balData = await resBal.json();
//       setBalance(balData.balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleUpdateBalance = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3001/pharmacist/patient/${id}/update`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({ amount: newBalance }),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update balance");
//       const data = await response.json();
//       setBalance(data.balance);
//       setNewBalance("");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>Transaction History for Patient ID: {id}</h2>
//         <div>
//           <strong>Current Balance:</strong>{" "}
//           {balance !== null ? `${balance} BDT` : "Loading..."}
//           <div style={{ marginTop: "0.5rem" }}>
//             <input
//               type="number"
//               value={newBalance}
//               onChange={(e) => setNewBalance(e.target.value)}
//               placeholder="New balance"
//               style={{ marginRight: "0.5rem" }}
//             />
//             <button onClick={handleUpdateBalance}>Update Balance</button>
//           </div>
//         </div>
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
//         {/* Pending */}
//         <div style={{ flex: 1 }}>
//           <h3>Pending Transactions</h3>
//           {pending.length === 0 ? (
//             <p>No pending transactions.</p>
//           ) : (
//             <table border="1" cellPadding="10" width="100%">
//               <thead>
//                 <tr>
//                   <th>Medicine Name</th>
//                   <th>Amount</th>
//                   <th>Cost</th>
//                   <th>Status</th>
//                   <th>Timestamp</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pending.map((txn) => (
//                   <tr key={txn.transaction_id}>
//                     <td>{txn.name}</td>
//                     <td>{txn.amount}</td>
//                     <td>{txn.cost}</td>
//                     <td>{txn.state}</td>
//                     <td>{new Date(txn.created_at).toLocaleString()}</td>
//                     <td>
//                       <button onClick={() => handleConfirmPurchase(txn.transaction_id)}>
//                         Confirm Purchase
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Completed */}
//         <div style={{ flex: 1 }}>
//           <h3>Previous Transactions</h3>
//           {completed.length === 0 ? (
//             <p>No completed transactions.</p>
//           ) : (
//             <table border="1" cellPadding="10" width="100%">
//               <thead>
//                 <tr>
//                   <th>Medicine Name</th>
//                   <th>Amount</th>
//                   <th>Cost</th>
//                   <th>Status</th>
//                   <th>Timestamp</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {completed.map((txn, index) => (
//                   <tr key={index}>
//                     <td>{txn.name}</td>
//                     <td>{txn.amount}</td>
//                     <td>{txn.cost}</td>
//                     <td>{txn.state}</td>
//                     <td>{new Date(txn.created_at).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacistPatient;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Pharmacist/PharmacistPatient.css";

const PharmacistPatient = () => {
  const { id } = useParams(); // patient_id
  const navigate = useNavigate();

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch transactions and balance
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const resTxn = await fetch(
          `http://localhost:3001/pharmacist/patient/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (!resTxn.ok) throw new Error(await resTxn.text());
        const data = await resTxn.json();
        setPending(data.pending);
        setCompleted(data.completed);

        // Fetch balance separately
        const resBal = await fetch(
          `http://localhost:3001/payment/balance/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (!resBal.ok) throw new Error(await resBal.text());
        const balanceData = await resBal.json();
        setBalance(balanceData.balance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleConfirmPurchase = async (transaction_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/pharmacist/confirm/${transaction_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to confirm purchase");

      const confirmed = await response.json();

      // Update UI
      setPending((prev) =>
        prev.filter((txn) => txn.transaction_id !== transaction_id)
      );
      setCompleted((prev) => [...prev, confirmed]);

      // Refresh balance
      const resBal = await fetch(
        `http://localhost:3001/payment/balance/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      const balData = await resBal.json();
      setBalance(balData.balance);
    } catch (err) {
      alert(err.message);
    }
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToPrescriptions = () => {
    navigate("/pharmacist/prescriptions");
  };

  if (loading) {
    return (
      <div className="pharmacist-patient-page">
        <header className="pharmacist-patient-header">
          <div className="pharmacist-patient-header-content">
            <div className="pharmacist-patient-logo">
              <h1>HealthEase</h1>
              <span className="pharmacist-patient-logo-subtitle">
                Pharmacist Portal
              </span>
            </div>
            <button
              className="pharmacist-patient-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
        <div className="pharmacist-loading-container">
          <div className="loading-spinner"></div>
          <p className="pharmacist-loading-text">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pharmacist-patient-page">
      {/* Header */}
      <header className="pharmacist-patient-header">
        <div className="pharmacist-patient-header-content">
          <div className="pharmacist-patient-logo">
            <h1>HealthEase</h1>
            <span className="pharmacist-patient-logo-subtitle">
              Pharmacist Portal
            </span>
          </div>
          <div className="pharmacist-patient-header-actions">
            <button
              className="pharmacist-patient-back-btn"
              onClick={handleBackToPrescriptions}
            >
              ← Prescriptions
            </button>
            <button
              className="pharmacist-patient-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pharmacist-patient-main">
        <div className="pharmacist-patient-page-header">
          <h2>Patient Transaction History</h2>
          <p>Manage patient transactions and account balance</p>
        </div>

        {/* Patient Info & Balance */}
        <div className="pharmacist-patient-info">
          <div className="pharmacist-patient-info-header">
            <div className="pharmacist-patient-title-section">
              <h3 className="pharmacist-patient-title">Patient ID: {id}</h3>
              <div className="pharmacist-patient-balance-section">
                <div className="pharmacist-balance-display">
                  Current Balance:{" "}
                  <span className="pharmacist-balance-amount">
                    {balance !== null ? `${balance} BDT` : "Loading..."}
                  </span>
                </div>
                <div className="pharmacist-balance-update">
                  <input
                    type="number"
                    className="pharmacist-balance-input"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    placeholder="New balance"
                  />
                  <button
                    className="pharmacist-update-balance-btn"
                    onClick={handleUpdateBalance}
                  >
                    Update Balance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="pharmacist-patient-error">{error}</div>}

        {/* Transactions */}
        <div className="pharmacist-transactions-container">
          {/* Pending Transactions */}
          <div className="pharmacist-transaction-section">
            <div className="pharmacist-transaction-header">
              <span className="pharmacist-transaction-icon">⏳</span>
              <h3 className="pharmacist-transaction-title">
                Pending Transactions
              </h3>
            </div>
            <div className="pharmacist-transaction-content">
              {pending.length === 0 ? (
                <div className="pharmacist-no-transactions">
                  <div className="pharmacist-no-transactions-icon">⏳</div>
                  <p className="pharmacist-no-transactions-text">
                    No pending transactions.
                  </p>
                </div>
              ) : (
                <table className="pharmacist-transaction-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Amount</th>
                      <th>Cost</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((txn) => (
                      <tr key={txn.transaction_id}>
                        <td
                          data-label="Medicine"
                          className="pharmacist-medicine-name"
                        >
                          {txn.name}
                        </td>
                        <td
                          data-label="Amount"
                          className="pharmacist-transaction-amount"
                        >
                          {txn.amount}
                        </td>
                        <td
                          data-label="Cost"
                          className="pharmacist-transaction-cost"
                        >
                          {txn.cost} BDT
                        </td>
                        <td data-label="Status">
                          <span className="pharmacist-transaction-status pharmacist-status-pending">
                            {txn.state}
                          </span>
                        </td>
                        <td
                          data-label="Timestamp"
                          className="pharmacist-transaction-timestamp"
                        >
                          {new Date(txn.created_at).toLocaleString()}
                        </td>
                        <td data-label="Action">
                          <button
                            className="pharmacist-confirm-btn"
                            onClick={() =>
                              handleConfirmPurchase(txn.transaction_id)
                            }
                          >
                            Confirm Purchase
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Completed Transactions */}
          <div className="pharmacist-transaction-section">
            <div className="pharmacist-transaction-header">
              <span className="pharmacist-transaction-icon">✅</span>
              <h3 className="pharmacist-transaction-title">
                Previous Transactions
              </h3>
            </div>
            <div className="pharmacist-transaction-content">
              {completed.length === 0 ? (
                <div className="pharmacist-no-transactions">
                  <div className="pharmacist-no-transactions-icon">✅</div>
                  <p className="pharmacist-no-transactions-text">
                    No completed transactions.
                  </p>
                </div>
              ) : (
                <table className="pharmacist-transaction-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Amount</th>
                      <th>Cost</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completed.map((txn, index) => (
                      <tr key={index}>
                        <td
                          data-label="Medicine"
                          className="pharmacist-medicine-name"
                        >
                          {txn.name}
                        </td>
                        <td
                          data-label="Amount"
                          className="pharmacist-transaction-amount"
                        >
                          {txn.amount}
                        </td>
                        <td
                          data-label="Cost"
                          className="pharmacist-transaction-cost"
                        >
                          {txn.cost} BDT
                        </td>
                        <td data-label="Status">
                          <span className="pharmacist-transaction-status pharmacist-status-completed">
                            {txn.state}
                          </span>
                        </td>
                        <td
                          data-label="Timestamp"
                          className="pharmacist-transaction-timestamp"
                        >
                          {new Date(txn.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmacistPatient;
