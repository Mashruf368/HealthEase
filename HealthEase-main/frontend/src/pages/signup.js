// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     name: "",
//     age: "",
//     contact_no: "",
//     address: "",
//     gender: "Male", // default value
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const genderShort = formData.gender === "Male" ? "M" : "F";
//       const response = await fetch("http://localhost:3001/newreg/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, gender: genderShort }),
//       });

//       if (!response.ok) {
//         const msg = await response.text();
//         throw new Error(msg || "Registration failed");
//       }

//       // Assuming backend returns { token } on success
//       const data = await response.json();
//       setSuccess("Registration successful! Redirecting to login...");

//       // Redirect to login after short delay
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             autoFocus
//           />
//         </label>
//         <br />

//         <label>
//           Password
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength={6}
//           />
//         </label>
//         <br />

//         <label>
//           Name
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Age
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             min={0}
//             max={150}
//           />
//         </label>
//         <br />

//         <label>
//           Contact Number
//           <input
//             type="tel"
//             name="contact_no"
//             value={formData.contact_no}
//             onChange={handleChange}
//             required
//             pattern="[0-9]{10,15}"
//             title="Enter a valid phone number"
//           />
//         </label>
//         <br />

//         <label>
//           Address
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             rows={3}
//           />
//         </label>
//         <br />

//         <label>
//           Gender
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </label>
//         <br />

//         <button
//           type="submit"
//           style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
//         >
//           Sign Up
//         </button>

//         {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
//         {success && (
//           <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

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
    <div className="signup-page">
      {/* Header */}
      <div className="signup-header">
        <div className="signup-header-content">
          <div className="signup-logo">
            <h1>HealthEase</h1>
            <div className="signup-logo-subtitle">
              Healthcare Management System
            </div>
          </div>
          <div className="signup-header-actions">
            <button className="signup-back-btn" onClick={() => navigate("/")}>
              ← Back to Welcome
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="signup-main">
        <div className="signup-container">
          <h2 className="signup-title">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label className="signup-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="signup-input"
                required
                autoFocus
                placeholder="Enter your username"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="signup-input"
                required
                minLength={6}
                placeholder="Enter your password"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="signup-input"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="signup-input"
                required
                min={0}
                max={150}
                placeholder="Enter your age"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Contact Number</label>
              <input
                type="tel"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="signup-input"
                required
                pattern="[0-9]{10,15}"
                title="Enter a valid phone number"
                placeholder="Enter your contact number"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="signup-textarea"
                required
                rows={3}
                placeholder="Enter your address"
              />
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="signup-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <button type="submit" className="signup-submit-btn">
              Create Account
            </button>

            {error && (
              <div className="signup-message signup-error">{error}</div>
            )}
            {success && (
              <div className="signup-message signup-success">{success}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
