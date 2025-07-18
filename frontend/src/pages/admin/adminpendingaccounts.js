// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminPending = () => {
//   const [pendingAccounts, setPendingAccounts] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

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
//           setPendingAccounts(data);
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

//   const handleViewDetails = (account) => {
//     navigate(`/admin/pending/${account.name}`); // you can change navigation based on your routing logic
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
//           {pendingAccounts.length > 0 ? (
//             pendingAccounts.map((account, index) => (
//               <tr key={index}>
//                 <td>{account.name}</td>
//                 <td>{account.branch_id}</td>
//                 <td>{account.type}</td>
//                 <td>
//                   <button onClick={() => handleViewDetails(account)}>
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No pending accounts found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPending;
import React, { useEffect, useState } from "react";

const AdminPending = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/admin/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPendingAccounts(data);
        } else {
          setError(data.error || "Failed to fetch pending accounts.");
        }
      } catch (err) {
        setError("Something went wrong while fetching pending accounts.");
        console.error(err);
      }
    };

    fetchPendingAccounts();
  }, []);

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

  //       const data = await response.json();
  //       if (response.ok) {
  //         alert(`Approved ${username} successfully.`);
  //         // Remove the approved account from the list
  //         setPendingAccounts((prev) =>
  //           prev.filter((acc) => acc.username !== username)
  //         );
  //       } else {
  //         alert(`Approval failed: ${data.error || data}`);
  //       }
  //     } catch (err) {
  //       alert("Something went wrong while approving." + err);
  //       console.error(err);
  //       console.log(err);
  //     }
  //   };
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

  //       let data;
  //       try {
  //         data = await response.json();
  //       } catch (err) {
  //         // response is not JSON
  //         const text = await response.text();
  //         throw new Error(text);
  //       }

  //       if (response.ok) {
  //         alert(`Approved ${username} successfully.`);
  //         setPendingAccounts((prev) =>
  //           prev.filter((acc) => acc.username !== username)
  //         );
  //       } else {
  //         alert(`Approval failed: ${data.message || data}`);
  //       }
  //     } catch (err) {
  //       alert("Something went wrong: " + err.message);
  //       console.error(err);
  //     }
  //   };

  const handleApprove = async (username) => {
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

      const text = await response.text(); // read once only

      let data;
      try {
        data = JSON.parse(text); // try parsing JSON
      } catch (err) {
        data = { message: text }; // fallback to raw text
      }

      if (response.ok) {
        alert(`Approved ${username} successfully.`);
        setPendingAccounts((prev) =>
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
          {pendingAccounts.length > 0 ? (
            pendingAccounts.map((account, index) => (
              <tr key={index}>
                <td>{account.name}</td>
                <td>{account.branch_id}</td>
                <td>{account.type}</td>
                <td>
                  <button onClick={() => handleApprove(account.username)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No pending accounts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPending;
