// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PharmacistDashboard = () => {
//   const navigate = useNavigate();

//   const handleViewPrescriptions = () => {
//     navigate("/pharmacist/prescriptions");
//   };

//   const handleGoToPharmacy = () => {
//     navigate("/pharmacist/pharmacy"); // update this route if needed
//   };

//   return (
//     <div className="pharmacist-dashboard">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <div className="logo">
//             <h1>HealthEase</h1>
//             <span className="logo-subtitle">Pharmacist Portal</span>
//           </div>
//         </div>
//       </header>

//       <main className="dashboard-main">
//         <div className="welcome-section">
//           <h2>Welcome to the Pharmacist Dashboard</h2>
//           <p>Access and manage prescriptions</p>
//         </div>

//         <div className="action-buttons">
//           <button
//             onClick={handleViewPrescriptions}
//             className="action-btn prescriptions-btn"
//           >
//             <div className="btn-icon">💊</div>
//             <div className="btn-content">
//               <h3>View Prescriptions</h3>
//               <p>List of all prescriptions</p>
//             </div>
//           </button>

//           <button
//             onClick={handleGoToPharmacy}
//             className="action-btn pharmacy-btn"
//           >
//             <div className="btn-icon">🏥</div>
//             <div className="btn-content">
//               <h3>Go to Pharmacy</h3>
//               <p>Manage medicine inventory</p>
//             </div>
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PharmacistDashboard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");

  const handleViewPrescriptions = () => {
    navigate("/pharmacist/prescriptions");
  };

  const handleGoToPharmacy = () => {
    navigate("/pharmacist/pharmacy");
  };

  const handleUpdateBalance = () => {
    if (patientId.trim() === "") {
      alert("Please enter a patient ID");
      return;
    }
    navigate(`/pharmacist/patient/${patientId}`);
  };

  return (
    <div className="pharmacist-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <h1>HealthEase</h1>
            <span className="logo-subtitle">Pharmacist Portal</span>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to the Pharmacist Dashboard</h2>
          <p>Access and manage prescriptions</p>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleViewPrescriptions}
            className="action-btn prescriptions-btn"
          >
            <div className="btn-icon">💊</div>
            <div className="btn-content">
              <h3>View Prescriptions</h3>
              <p>List of all prescriptions</p>
            </div>
          </button>

          <button
            onClick={handleGoToPharmacy}
            className="action-btn pharmacy-btn"
          >
            <div className="btn-icon">🏥</div>
            <div className="btn-content">
              <h3>Go to Pharmacy</h3>
              <p>Manage medicine inventory</p>
            </div>
          </button>

          <div className="update-balance-section" style={{ marginTop: "2rem" }}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                marginRight: "1rem",
              }}
            />
            <button
              onClick={handleUpdateBalance}
              className="action-btn"
              style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
            >
              Update Account Balance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmacistDashboard;
