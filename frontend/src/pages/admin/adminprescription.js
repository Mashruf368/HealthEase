// // // Example: AdminPrescriptions.js
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const AdminPrescriptions = () => {
// //   const [prescriptions, setPrescriptions] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get("/admin/prescriptions") // Ensure this URL matches your backend route
// //       .then((res) => setPrescriptions(res.data))
// //       .catch((err) => console.error("Error fetching prescriptions:", err));
// //   }, []);

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Prescriptions</h2>
// //       <table
// //         border="1"
// //         cellPadding="10"
// //         style={{ marginTop: "1rem", width: "100%" }}
// //       >
// //         <thead>
// //           <tr>
// //             <th>Patient Name</th>
// //             <th>Doctor Name</th>
// //             <th>Appointment ID</th>
// //             <th>Consultation ID</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {prescriptions.map((p, idx) => (
// //             <tr key={idx}>
// //               <td>{p.name}</td>
// //               <td>{p.name}</td>
// //               <td>{p.appointment_id}</td>
// //               <td>{p.consultation_id}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPrescriptions;
// // import React, { useEffect, useState } from "react";

// // const AdminPrescriptions = () => {
// //   const [prescriptions, setPrescriptions] = useState([]);

// //   useEffect(() => {
// //     const fetchPrescriptions = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:3001/admin/prescriptions"
// //         );
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch prescriptions");
// //         }
// //         const data = await response.json();
// //         setPrescriptions(data);
// //       } catch (err) {
// //         console.error("Error:", err.message);
// //       }
// //     };

// //     fetchPrescriptions();
// //   }, []);

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>Prescriptions</h2>
// //       <table
// //         border="1"
// //         cellPadding="10"
// //         style={{ marginTop: "1rem", width: "100%" }}
// //       >
// //         <thead>
// //           <tr>
// //             <th>Patient Name</th>
// //             <th>Doctor Name</th>
// //             <th>Appointment ID</th>
// //             <th>Consultation ID</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {prescriptions.map((p, idx) => (
// //             <tr key={idx}>
// //               <td>{p.patient_name}</td>
// //               <td>{p.doctor_name}</td>{" "}
// //               {/* If this returns same value, double check your query aliases */}
// //               <td>{p.appointment_id}</td>
// //               <td>{p.consultation_id}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPrescriptions;
// import React, { useEffect, useState } from "react";

// const AdminPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/admin/prescriptions",
//           {
//             credentials: "include", // If using cookies for auth/session
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Fetched prescriptions:", data);
//         setPrescriptions(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch error:", err.message);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, []);

//   if (loading)
//     return <div style={{ padding: "2rem" }}>Loading prescriptions...</div>;
//   if (error)
//     return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Prescriptions</h2>
//       {prescriptions.length === 0 ? (
//         <p>No prescriptions found.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="10"
//           style={{ marginTop: "1rem", width: "100%" }}
//         >
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Doctor Name</th>
//               <th>Appointment ID</th>
//               <th>Consultation ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.map((p, idx) => (
//               <tr key={idx}>
//                 <td>{p.patient_name}</td>
//                 <td>{p.doctor_name}</td>
//                 <td>{p.appointment_id}</td>
//                 <td>{p.consultation_id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminPrescriptions;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/admin/prescriptions",
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
          setPrescriptions(data);
        } else {
          setMessage(data.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading prescriptions...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prescriptions</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Appointment ID</th>
              <th>Consultation ID</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p, idx) => (
              <tr key={idx}>
                <td>{p.patient_name}</td>
                <td>{p.doctor_name}</td>
                <td>{p.appointment_id}</td>
                <td>{p.consultation_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPrescriptions;
