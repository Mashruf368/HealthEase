import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    contact_no: "",
    address: "",
    gender: "Male", // default value
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const genderShort = formData.gender === "Male" ? "M" : "F";
      const response = await fetch("http://localhost:3001/newreg/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, gender: genderShort }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Registration failed");
      }

      // Assuming backend returns { token } on success
      const data = await response.json();
      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
      <h2>Sign Up</h2>
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
            minLength={6}
          />
        </label>
        <br />

        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Age
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min={0}
            max={150}
          />
        </label>
        <br />

        <label>
          Contact Number
          <input
            type="tel"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            title="Enter a valid phone number"
          />
        </label>
        <br />

        <label>
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
          />
        </label>
        <br />

        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />

        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        >
          Sign Up
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
