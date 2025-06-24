// component/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {showRoleButtons && (
        <>
          <hr style={{ margin: "2rem 0" }} />
          <h4>Other Logins</h4>
          <button onClick={() => goToRoleLogin("admin")} style={buttonStyle}>
            Login as Admin
          </button>
          <br />
          <button onClick={() => goToRoleLogin("doctor")} style={buttonStyle}>
            Login as Doctor
          </button>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default LoginForm;
