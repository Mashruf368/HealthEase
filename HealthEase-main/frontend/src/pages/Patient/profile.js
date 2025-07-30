import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PatientProfile.css"; // Import the CSS file

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact_no: "",
    address: "",
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [previousTests, setPreviousTests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile", {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          setMessage(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setMessage("Failed to fetch profile");
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile/prescriptions", {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setPrescriptions(data);
        } else {
          setMessage(data.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        console.error("Prescription fetch error:", err);
        setMessage("Failed to fetch prescriptions" + err);
      }
    };

    const fetchPreviousTests = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile/tests", {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setPreviousTests(data);
        } else {
          setMessage(data.message || "Failed to fetch tests");
        }
      } catch (err) {
        console.error("Test fetch error:", err);
        setMessage("Failed to fetch tests" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPrescriptions();
    fetchPreviousTests();
  }, [token, navigate]);

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
          token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully.");
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="patientprofile-container">
        <div className="patientprofile-loading">
          Loading profile and data...
        </div>
      </div>
    );
  }

  return (
    <div className="patientprofile-container">
      <div className="patientprofile-main-wrapper">
        {/* Left Section */}
        <div className="patientprofile-left-section">
          <h2 className="patientprofile-section-title">Your Prescriptions</h2>

          {message && (
            <div className="patientprofile-error-message">{message}</div>
          )}

          {prescriptions.length === 0 ? (
            <div className="patientprofile-no-data">
              No prescriptions found.
            </div>
          ) : (
            <table className="patientprofile-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Appointment ID</th>
                  <th>Consultation ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.doctor_name}</td>
                    <td>{p.appointment_id}</td>
                    <td>{p.consultation_id}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/prescription/abc/${p.consultation_id}`)
                        }
                        className="patientprofile-view-btn"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Previous Tests Section */}
          <h2 className="patientprofile-tests-title">Previous Test Results</h2>
          {previousTests.length === 0 ? (
            <div className="patientprofile-no-data">
              No test results available.
            </div>
          ) : (
            <table className="patientprofile-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {previousTests.map((test, idx) => (
                  <tr key={idx}>
                    <td>{test.test_name}</td>
                    <td>{test.test_result}</td>
                    <td>{test.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Section - Profile */}
        <div className="patientprofile-right-section">
          <div className="patientprofile-edit-card">
            <h2 className="patientprofile-edit-title">Edit Profile</h2>

            <div className="patientprofile-form-group">
              <label className="patientprofile-label">Name:</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="patientprofile-input"
              />
            </div>

            <div className="patientprofile-form-group">
              <label className="patientprofile-label">Age:</label>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="patientprofile-input"
              />
            </div>

            <div className="patientprofile-form-group">
              <label className="patientprofile-label">Gender:</label>
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="patientprofile-input"
              />
            </div>

            <div className="patientprofile-form-group">
              <label className="patientprofile-label">Contact No:</label>
              <input
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="patientprofile-input"
              />
            </div>

            <div className="patientprofile-form-group">
              <label className="patientprofile-label">Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="patientprofile-textarea"
              />
            </div>

            <button onClick={handleSave} className="patientprofile-save-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
