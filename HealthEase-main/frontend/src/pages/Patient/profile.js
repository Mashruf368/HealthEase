// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// //profile view update and show previous prescriptions on patient side

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     contact_no: "",
//     address: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showPrescriptions, setShowPrescriptions] = useState(false);
//   const [prescriptions, setPrescriptions] = useState([]);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             token,
//           },
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setFormData(data);
//         } else {
//           setMessage(data.message || "Failed to load profile");
//         }
//       } catch (err) {
//         setMessage("Error fetching profile");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(data.message || "Profile updated successfully");
//       } else {
//         setMessage(data.error || "Failed to update profile");
//       }
//     } catch (err) {
//       setMessage("Error updating profile");
//       console.error(err);
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/profile/prescriptions", {
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setPrescriptions(data); // Expecting an array
//       } else {
//         setMessage("Failed to fetch prescriptions");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Server error while fetching prescriptions");
//     }
//   };

//   const handleTogglePrescriptions = () => {
//     setShowPrescriptions(!showPrescriptions);
//     if (!showPrescriptions) {
//       fetchPrescriptions();
//     }
//   };

//   if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

//   return (
//     <div style={{ display: "flex", padding: "2rem", gap: "2rem" }}>
//       {/* Left: Profile info */}
//       <div style={{ flex: 1 }}>
//         <h2>My Profile</h2>
//         {message && <p style={{ color: "green" }}>{message}</p>}

//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <br />

//         <label>Age:</label>
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//         />
//         <br />

//         <label>Gender:</label>
//         <select name="gender" value={formData.gender} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <br />

//         <label>Contact No:</label>
//         <input
//           type="text"
//           name="contact_no"
//           value={formData.contact_no}
//           onChange={handleChange}
//         />
//         <br />

//         <label>Address:</label>
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//         />
//         <br />

//         <button
//           onClick={handleSave}
//           style={{
//             marginTop: "1rem",
//             padding: "0.5rem 1.5rem",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Save
//         </button>
//       </div>

//       {/* Right: Prescriptions */}
//       <div style={{ flex: 1 }}>
//         <button
//           onClick={handleTogglePrescriptions}
//           style={{
//             marginBottom: "1rem",
//             padding: "0.5rem 1rem",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           {showPrescriptions ? "Hide Prescriptions" : "Show Prescriptions"}
//         </button>

//         {showPrescriptions && prescriptions.length > 0 ? (
//           <div>
//             <h3>Previous Prescriptions</h3>
//             {prescriptions.map((pres, index) => (
//               <div
//                 key={index}
//                 style={{
//                   border: "1px solid #ccc",
//                   padding: "1rem",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <p>
//                   <strong>Date:</strong> {pres.date}
//                 </p>
//                 <p>
//                   <strong>Symptoms:</strong> {pres.symptoms}
//                 </p>
//                 <p>
//                   <strong>Comments:</strong> {pres.comments}
//                 </p>
//                 <button
//                   style={{
//                     marginTop: "0.5rem",
//                     backgroundColor: "#17a2b8",
//                     color: "white",
//                     border: "none",
//                     padding: "0.5rem 1rem",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() =>
//                     navigate(`/prescription/${pres.consultation_id}`)
//                   }
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           showPrescriptions && <p>No prescriptions found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact_no: "",
    address: "",
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setFormData(data);
        } else {
          setMessage(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setMessage("Failed to fetch profile");
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile/prescriptions", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPrescriptions(data);
        } else {
          setMessage(data.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        console.error("Prescription fetch error:", err);
        setMessage("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPrescriptions();
  }, [token, navigate]);

  if (loading) {
    return (
      <p style={{ padding: "2rem" }}>Loading profile and prescriptions...</p>
    );
  }

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      {/* Left: Prescriptions */}
      <div style={{ width: "60%", marginRight: "2rem" }}>
        <h2>Your Prescriptions</h2>
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
                <th>Doctor Name</th>
                <th>Appointment ID</th>
                <th>Consultation ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.doctor_name}</td>
                  <td>{p.appointment_id}</td>
                  <td>{p.consultation_id}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/prescription/abc/${p.consultation_id}`)
                      }
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right: Profile Info */}
      <div
        style={{
          width: "40%",
          paddingLeft: "1rem",
          borderLeft: "1px solid #ccc",
        }}
      >
        <h2>Profile</h2>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Age:</strong> {formData.age}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender}
        </p>
        <p>
          <strong>Contact No:</strong> {formData.contact_no}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
      </div>
    </div>
  );
};

export default Profile;
