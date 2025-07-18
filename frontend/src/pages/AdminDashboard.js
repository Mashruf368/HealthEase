// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleViewAppointments = () => {
//     navigate("/admin/appointments");
//   };

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h2>Welcome to the Admin Dashboard</h2>

//       <button
//         onClick={handleViewAppointments}
//         style={{
//           padding: "1rem 2rem",
//           fontSize: "1rem",
//           cursor: "pointer",
//           borderRadius: "8px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           marginTop: "2rem",
//         }}
//       >
//         View Appointments
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleViewAppointments = () => {
    navigate("/admin/appointments");
  };

  const handleViewPrescriptions = () => {
    navigate("/admin/prescriptions");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to the Admin Dashboard</h2>

      <button
        onClick={handleViewAppointments}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          marginTop: "2rem",
          marginRight: "1rem",
        }}
      >
        View Appointments
      </button>

      <button
        onClick={handleViewPrescriptions}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          marginTop: "2rem",
        }}
      >
        View Prescriptions
      </button>
    </div>
  );
};

export default AdminDashboard;
