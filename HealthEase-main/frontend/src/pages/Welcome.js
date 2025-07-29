// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Welcome() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>Welcome to the Hospital System</h1>
//       <button onClick={() => navigate("/login")}>Login</button>
//       <button onClick={() => navigate("/signup")}>Sign Up</button>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>

        <div className="content-section">
          <h1 className="welcome-title">
            Welcome to <span className="brand-name">HealthEase</span>
          </h1>
          <p className="welcome-subtitle">
            Your trusted healthcare management system
          </p>

          <div className="button-container">
            <button
              className="btn btn-login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
