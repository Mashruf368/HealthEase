import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginAdmin.css"; // Import the specific CSS for this page

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (endpoint, redirectPath) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate(redirectPath);
    } catch (err) {
      setMessage("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="login-admin-container">
      <div className="login-admin-card">
        <h2 className="login-admin-title">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-admin-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-admin-input"
        />

        <div className="login-admin-btn-container">
          <button
            className="login-admin-btn login-admin-btn-primary"
            onClick={() =>
              handleLogin(
                "http://localhost:3001/newreg/login/admin",
                "/admin/dashboard"
              )
            }
          >
            Login as Admin
          </button>
          <button
            className="login-admin-btn login-admin-btn-secondary"
            onClick={() =>
              handleLogin(
                "http://localhost:3001/newreg/login/pharmacist",
                "/pharmacist/dashboard"
              )
            }
          >
            Login as Pharmacist
          </button>
          <button
            className="login-admin-btn login-admin-btn-secondary"
            onClick={() =>
              handleLogin(
                "http://localhost:3001/newreg/login/pathologist",
                "/pathologist/dashboard"
              )
            }
          >
            Login as Pathologist
          </button>
          <button
            className="login-admin-btn login-admin-btn-tertiary"
            onClick={() => navigate("/admin/signin")}
          >
            Sign In (Pharmacist / Pathologist)
          </button>
        </div>

        {message && <p className="login-admin-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginAdmin;
