// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PathologistDashboard = () => {
//   const navigate = useNavigate();
//   const [patientId, setPatientId] = useState("");

//   const handleViewPrescriptions = () => {
//     navigate("/pathologist/prescriptions");
//   };

//   const handleUpdateBalance = () => {
//     if (patientId.trim() === "") {
//       alert("Please enter a patient ID");
//       return;
//     }
//     navigate(`/pathologist/patient/${patientId}`);
//   };

//   return (
//     <div className="pathologist-dashboard">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Pathologist Portal</span>
//           </div>
//         </div>
//       </header>

//       <main className="dashboard-main">
//         <div className="welcome-section">
//           <h2>Welcome to the Pathologist Dashboard</h2>
//           <p>Access and manage prescriptions</p>
//         </div>

//         <div className="action-buttons">
//           <button
//             onClick={handleViewPrescriptions}
//             className="action-btn prescriptions-btn"
//           >
//             <div className="btn-icon">🧪</div>
//             <div className="btn-content">
//               <h3>View Prescriptions</h3>
//               <p>List of all prescriptions</p>
//             </div>
//           </button>

//           <div className="update-balance-section" style={{ marginTop: "2rem" }}>
//             <input
//               type="text"
//               placeholder="Enter Patient ID"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//               style={{
//                 padding: "0.5rem",
//                 fontSize: "1rem",
//                 marginRight: "1rem",
//               }}
//             />
//             <button
//               onClick={handleUpdateBalance}
//               className="action-btn"
//               style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
//             >
//               Update Account Balance
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PathologistDashboard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Pathologist/PathologistDashboard.css"; // Import the CSS file

const PathologistDashboard = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");

  const handleViewPrescriptions = () => {
    navigate("/pathologist/prescriptions");
  };

  const handleUpdateBalance = () => {
    if (patientId.trim() === "") {
      alert("Please enter a patient ID");
      return;
    }
    navigate(`/pathologist/patient/${patientId}`);
  };

  return (
    <div className="pathologist-dashboard-container">
      <header className="pathologist-dashboard-header">
        <div className="pathologist-header-content">
          <div className="pathologist-logo">
            <h1>HealthEase</h1>
            <span className="pathologist-logo-subtitle">
              Pathologist Portal
            </span>
          </div>
        </div>
      </header>

      <main className="pathologist-dashboard-main">
        <div className="pathologist-welcome-section">
          <h2>Welcome to the Pathologist Dashboard</h2>
          <p>Access and manage prescriptions</p>
        </div>

        <div className="pathologist-action-buttons">
          <div className="pathologist-prescriptions-container">
            <button
              onClick={handleViewPrescriptions}
              className="pathologist-action-btn pathologist-prescriptions-btn"
            >
              <div className="pathologist-btn-icon">🧪</div>
              <div className="pathologist-btn-content">
                <h3>View Prescriptions</h3>
                <p>Browse and manage all laboratory test prescriptions</p>
              </div>
            </button>
          </div>

          <div className="pathologist-update-balance-section">
            <h3 className="pathologist-balance-title">View Patient Profile</h3>
            <div className="pathologist-balance-input-group">
              <input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="pathologist-patient-input"
              />
              <button
                onClick={handleUpdateBalance}
                className="pathologist-balance-btn"
              >
                View Patient Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PathologistDashboard;
