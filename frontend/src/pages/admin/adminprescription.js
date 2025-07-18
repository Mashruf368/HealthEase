// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminPrescriptions = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchPrescriptions = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/admin/prescriptions",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               token: token,
//             },
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setPrescriptions(data);
//         } else {
//           setMessage(data.message || "Failed to fetch prescriptions");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setMessage("Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [token, navigate]);

//   if (loading) {
//     return <p style={{ padding: "2rem" }}>Loading prescriptions...</p>;
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Prescriptions</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p, idx) => (
              <tr key={idx}>
                <td>{p.patient_name}</td>
                <td>{p.doctor_name}</td>
                <td>{p.appointment_id}</td>
                <td>{p.consultation_id}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/prescription/${p.consultation_id}`)
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View Prescription
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPrescriptions;
