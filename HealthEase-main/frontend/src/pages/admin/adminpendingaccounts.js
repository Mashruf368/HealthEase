// // import React, { useEffect, useState } from "react";

// // const AdminPending = () => {
// //   const [pendingAccounts, setPendingAccounts] = useState([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchPendingAccounts = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const response = await fetch("http://localhost:3001/admin/pending", {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         });

// //         const data = await response.json();
// //         if (response.ok) {
// //           setPendingAccounts(data);
// //         } else {
// //           setError(data.error || "Failed to fetch pending accounts.");
// //         }
// //       } catch (err) {
// //         setError("Something went wrong while fetching pending accounts.");
// //         console.error(err);
// //       }
// //     };

// //     fetchPendingAccounts();
// //   }, []);

// //   const handleApprove = async (username) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `http://localhost:3001/admin/approve/${username}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             token: token,
// //           },
// //         }
// //       );

// //       const text = await response.text(); // read once only

// //       let data;
// //       try {
// //         data = JSON.parse(text); // try parsing JSON
// //       } catch (err) {
// //         data = { message: text }; // fallback to raw text
// //       }

// //       if (response.ok) {
// //         alert(`Approved ${username} successfully.`);
// //         setPendingAccounts((prev) =>
// //           prev.filter((acc) => acc.username !== username)
// //         );
// //       } else {
// //         alert(`Approval failed: ${data.message || "Unknown error"}`);
// //       }
// //     } catch (err) {
// //       alert("Something went wrong: " + err.message);
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="admin-pending">
// //       <h2>Pending Admin Registrations</h2>

// //       {error && <p className="error-message">{error}</p>}

// //       <table className="pending-table">
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Branch ID</th>
// //             <th>Type</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {pendingAccounts.length > 0 ? (
// //             pendingAccounts.map((account, index) => (
// //               <tr key={index}>
// //                 <td>{account.name}</td>
// //                 <td>{account.branch_id}</td>
// //                 <td>{account.type}</td>
// //                 <td>
// //                   <button onClick={() => handleApprove(account.username)}>
// //                     Approve
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4">No pending accounts found.</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPending;
// import React, { useEffect, useState } from "react";

// const AdminPending = () => {
//   const [pendingAdmins, setPendingAdmins] = useState([]);
//   const [pendingDoctors, setPendingDoctors] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPendingAccounts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3001/admin/pending", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           // Separate doctors and admins
//           const admins = data.filter((acc) => acc.type !== undefined); // pending_accounts
//           const doctors = data.filter((acc) => acc.name && acc.speciality); // pending_doctor

//           setPendingAdmins(admins);
//           setPendingDoctors(doctors);
//         } else {
//           setError(data.error || "Failed to fetch pending accounts.");
//         }
//       } catch (err) {
//         setError("Something went wrong while fetching pending accounts.");
//         console.error(err);
//       }
//     };

//     fetchPendingAccounts();
//   }, []);

//   const handleApprove = async (username) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3001/admin/approve/${username}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (err) {
//         data = { message: text };
//       }

//       if (response.ok) {
//         alert(`Approved ${username} successfully.`);
//         setPendingAdmins((prev) =>
//           prev.filter((acc) => acc.username !== username)
//         );
//       } else {
//         alert(`Approval failed: ${data.message || "Unknown error"}`);
//       }
//     } catch (err) {
//       alert("Something went wrong: " + err.message);
//       console.error(err);
//     }
//   };

//   return (
//     <div className="admin-pending">
//       <h2>Pending Admin Registrations</h2>

//       {error && <p className="error-message">{error}</p>}

//       <table className="pending-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Branch ID</th>
//             <th>Type</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingAdmins.length > 0 ? (
//             pendingAdmins.map((account, index) => (
//               <tr key={index}>
//                 <td>{account.name}</td>
//                 <td>{account.branch_id}</td>
//                 <td>{account.type}</td>
//                 <td>
//                   <button onClick={() => handleApprove(account.username)}>
//                     Approve
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No pending admin accounts found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2 style={{ marginTop: "40px" }}>Pending Doctor Registrations</h2>

//       {pendingDoctors.length > 0 ? (
//         pendingDoctors.map((doc, index) => (
//           <div
//             key={index}
//             className="doctor-card"
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               marginBottom: "20px",
//             }}
//           >
//             <h3>{doc.name}</h3>
//             <p>
//               <strong>Speciality:</strong> {doc.speciality}
//             </p>
//             <p>
//               <strong>Details:</strong> {doc.details}
//             </p>
//             <p>
//               <strong>Contact:</strong> {doc.contacts}
//             </p>
//             <p>
//               <strong>Gender:</strong> {doc.gender}
//             </p>
//             <p>
//               <strong>Age:</strong> {doc.age}
//             </p>
//             <h4>Degrees:</h4>
//             <ul>
//               {doc.degrees && doc.degrees.length > 0 ? (
//                 doc.degrees.map((deg, i) => (
//                   <li key={i}>
//                     {deg.degree_id}, {deg.institute}, {deg.year}
//                   </li>
//                 ))
//               ) : (
//                 <li>No degrees provided.</li>
//               )}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No pending doctor registrations found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminPending;
import React, { useEffect, useState } from "react";

const AdminPending = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [error, setError] = useState("");

  // Fetch pending admins
  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/admin/pending/adm",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPendingAdmins(data);
        } else {
          setError(data.error || "Failed to fetch pending admin accounts.");
        }
      } catch (err) {
        setError("Something went wrong while fetching pending admin accounts.");
        console.error(err);
      }
    };

    fetchPendingAdmins();
  }, []);

  // Fetch pending doctors
  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/admin/pending/doc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPendingDoctors(data);
        } else {
          setError(data.error || "Failed to fetch pending doctor accounts.");
        }
      } catch (err) {
        setError(
          "Something went wrong while fetching pending doctor accounts."
        );
        console.error(err);
      }
    };

    fetchPendingDoctors();
  }, []);

  // Approve admin
  const handleApproveAdmin = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/admin/approve/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { message: text };
      }

      if (response.ok) {
        alert(`Approved ${username} successfully.`);
        setPendingAdmins((prev) =>
          prev.filter((acc) => acc.username !== username)
        );
      } else {
        alert(`Approval failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
      console.error(err);
    }
  };

  // Approve doctor — implement route later
  const handleApproveDoctor = async (pendingId) => {
    alert(`Approve Doctor with pending_id: ${pendingId}`);
    // You'll write this POST route and call it here later
  };

  return (
    <div className="admin-pending">
      <h2>Pending Admin Registrations</h2>

      {error && <p className="error-message">{error}</p>}

      <table className="pending-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Branch ID</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingAdmins.length > 0 ? (
            pendingAdmins.map((account, index) => (
              <tr key={index}>
                <td>{account.name}</td>
                <td>{account.branch_id}</td>
                <td>{account.type}</td>
                <td>
                  <button onClick={() => handleApproveAdmin(account.username)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No pending admin accounts found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 style={{ marginTop: "40px" }}>Pending Doctor Registrations</h2>

      {pendingDoctors.length > 0 ? (
        pendingDoctors.map((doc, index) => (
          <div
            key={index}
            className="doctor-card"
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>{doc.name}</h3>
            <p>
              <strong>Age:</strong> {doc.age}
            </p>
            <p>
              <strong>Gender:</strong> {doc.gender}
            </p>
            <p>
              <strong>Contact:</strong> {doc.contacts}
            </p>
            <p>
              <strong>Speciality:</strong> {doc.speciality}
            </p>
            <p>
              <strong>Details:</strong> {doc.details}
            </p>

            <h4>Degrees:</h4>
            <ul>
              {doc.degrees && doc.degrees.length > 0 ? (
                doc.degrees.map((deg, i) => (
                  <li key={i}>
                    {deg.degree_id}, {deg.institution}, {deg.year}
                  </li>
                ))
              ) : (
                <li>No degrees provided.</li>
              )}
            </ul>

            <button onClick={() => handleApproveDoctor(doc.pending_id)}>
              Approve Doctor
            </button>
          </div>
        ))
      ) : (
        <p>No pending doctor registrations found.</p>
      )}
    </div>
  );
};

export default AdminPending;
