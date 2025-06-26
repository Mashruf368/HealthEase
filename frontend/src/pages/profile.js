import React, { useEffect, useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact_no: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          setMessage(data.message || "Failed to load profile");
        }
      } catch (err) {
        setMessage("Error fetching profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3001/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Profile updated successfully");
      } else {
        setMessage(data.error || "Failed to update profile");
      }
    } catch (err) {
      setMessage("Error updating profile");
      console.error(err);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>My Profile</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <br />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <br />

      <label>Contact No:</label>
      <input
        type="text"
        name="contact_no"
        value={formData.contact_no}
        onChange={handleChange}
        required
      />
      <br />

      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <br />

      <button
        onClick={handleSave}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Profile;
