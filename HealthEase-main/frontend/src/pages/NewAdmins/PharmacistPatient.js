// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // const PharmacistPatient = () => {
// //   const { id } = useParams(); // patient_id from route
// //   const [transactions, setTransactions] = useState([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchTransactions = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           throw new Error("Authentication token not found.");
// //         }

// //         const response = await fetch(
// //           `http://localhost:3001/pharmacist/patient/${id}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               "Content-Type": "application/json",
// //               //Authorization: `Bearer ${token}`, // Correct header for token
// //               token: token,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           const message = await response.text();
// //           throw new Error(message || "Failed to fetch transaction history");
// //         }

// //         const data = await response.json();
// //         setTransactions(data);
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //     };

// //     fetchTransactions();
// //   }, [id]);

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Transaction History for Patient ID: {id}</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       {transactions.length === 0 ? (
// //         <p>No transactions found.</p>
// //       ) : (
// //         <table
// //           border="1"
// //           cellPadding="10"
// //           style={{ marginTop: "1rem", width: "100%" }}
// //         >
// //           <thead>
// //             <tr>
// //               <th>Medicine Name</th>
// //               <th>Amount</th>
// //               <th>Cost</th> {/* New column */}
// //               <th>Status</th>
// //               <th>Timestamp</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {transactions.map((txn, index) => (
// //               <tr key={index}>
// //                 <td>{txn.name}</td>
// //                 <td>{txn.amount}</td>
// //                 <td>{txn.cost}</td> {/* Display cost */}
// //                 <td>{txn.state}</td>
// //                 <td>{new Date(txn.created_at).toLocaleString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default PharmacistPatient;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const PharmacistPatient = () => {
//   const { id } = useParams(); // patient_id from route
//   const [pending, setPending] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication token not found.");

//         const response = await fetch(
//           `http://localhost:3001/pharmacist/patient/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         if (!response.ok) {
//           const message = await response.text();
//           throw new Error(message || "Failed to fetch transactions");
//         }

//         const data = await response.json();
//         setPending(data.pending);
//         setCompleted(data.completed);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchTransactions();
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

//       // Refresh after confirming
//       const updated = pending.filter((txn) => txn.transaction_id !== transaction_id);
//       setPending(updated);
//       const confirmed = await response.json();
//       setCompleted([...completed, confirmed]);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Transaction History for Patient ID: {id}</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
//         {/* Pending Transactions */}
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

//         {/* Completed Transactions */}
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
import { useParams } from "react-router-dom";

const PharmacistPatient = () => {
  const { id } = useParams(); // patient_id
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);
  const [newBalance, setNewBalance] = useState("");

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
        const resBal = await fetch(`http://localhost:3001/payment/balance/${id}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        if (!resBal.ok) throw new Error(await resBal.text());
        const balanceData = await resBal.json();
        setBalance(balanceData.balance);
      } catch (err) {
        setError(err.message);
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
      const resBal = await fetch(`http://localhost:3001/payment/balance/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
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

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Transaction History for Patient ID: {id}</h2>
        <div>
          <strong>Current Balance:</strong>{" "}
          {balance !== null ? `${balance} BDT` : "Loading..."}
          <div style={{ marginTop: "0.5rem" }}>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="New balance"
              style={{ marginRight: "0.5rem" }}
            />
            <button onClick={handleUpdateBalance}>Update Balance</button>
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* Pending */}
        <div style={{ flex: 1 }}>
          <h3>Pending Transactions</h3>
          {pending.length === 0 ? (
            <p>No pending transactions.</p>
          ) : (
            <table border="1" cellPadding="10" width="100%">
              <thead>
                <tr>
                  <th>Medicine Name</th>
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
                    <td>{txn.name}</td>
                    <td>{txn.amount}</td>
                    <td>{txn.cost}</td>
                    <td>{txn.state}</td>
                    <td>{new Date(txn.created_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleConfirmPurchase(txn.transaction_id)}>
                        Confirm Purchase
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Completed */}
        <div style={{ flex: 1 }}>
          <h3>Previous Transactions</h3>
          {completed.length === 0 ? (
            <p>No completed transactions.</p>
          ) : (
            <table border="1" cellPadding="10" width="100%">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Amount</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.name}</td>
                    <td>{txn.amount}</td>
                    <td>{txn.cost}</td>
                    <td>{txn.state}</td>
                    <td>{new Date(txn.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacistPatient;
