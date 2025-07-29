import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css"; // Ensure your CSS file is correctly imported

const LoginForm = ({ endpoint, redirectPath, showRoleButtons = false }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  const goToRoleLogin = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </label>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>

        {showRoleButtons && (
          <div className="role-buttons">
            <h4>Other Logins</h4>
            <button onClick={() => goToRoleLogin("admin")}>
              Login as Admin
            </button>
            <button onClick={() => goToRoleLogin("doctor")}>
              Login as Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
