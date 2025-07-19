import React, { useState } from "react";

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    branch_id: "",
    type: "pharmacist", // default role selected
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      type: role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const endpoint =
      formData.type === "pharmacist"
        ? "http://localhost:3001/signin/pharmacist"
        : "http://localhost:3001/signin/pathologist";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Registration failed");
      }

      const data = await response.json();
      setMessage(data.message || "Registered successfully, pending approval.");
      setFormData({
        username: "",
        password: "",
        name: "",
        branch_id: "",
        type: formData.type,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Register Pharmacist / Pathologist</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
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
              placeholder="Enter password"
            />
          </label>

          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </label>

          <label>
            Branch ID
            <input
              type="number"
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              required
              placeholder="Enter branch ID"
              min="1"
            />
          </label>

          <div style={{ marginTop: "1rem" }}>
            <strong>Select Role: </strong>
            <button
              type="button"
              onClick={() => handleTypeChange("pharmacist")}
              style={{
                marginRight: "10px",
                backgroundColor:
                  formData.type === "pharmacist" ? "#4caf50" : "#ccc",
                color: formData.type === "pharmacist" ? "white" : "black",
              }}
            >
              Pharmacist
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("pathologist")}
              style={{
                backgroundColor:
                  formData.type === "pathologist" ? "#4caf50" : "#ccc",
                color: formData.type === "pathologist" ? "white" : "black",
              }}
            >
              Pathologist
            </button>
          </div>

          <button
            type="submit"
            style={{ marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>
        )}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminSignIn;
