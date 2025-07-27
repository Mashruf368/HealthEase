// // // // //doctor side to view and write prescriptions
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WritePrescription = () => {
  const { id } = useParams(); // appointment ID
  const navigate = useNavigate();
  const [form, setForm] = useState({
    symptoms: "",
    comments: "",
    date: "",
    medicines: [],
    tests: [],
    surgeries: [],
  });
  const [message, setMessage] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchPrescriptions();
  }, [token, navigate]);

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/profile/prescriptions/${id}`,
        {
          headers: { "Content-Type": "application/json", token },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPrescriptions(data);
      } else {
        setMessage("Failed to fetch prescriptions");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching prescriptions");
    }
  };

  const handleArrayChange = (type, index, field, value) => {
    const updated = [...form[type]];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, [type]: updated }));
  };

  const addEntry = (type) => {
    setForm((prev) => ({ ...prev, [type]: [...prev[type], {}] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/doctor/appointments/${id}/prescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Prescription submitted successfully");
        navigate("/doctor/appointments");
      } else {
        setMessage(data.error || "Failed to submit");
      }
    } catch (err) {
      setMessage("Server error: " + err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Write Prescription</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Symptoms:</label>
        <textarea
          value={form.symptoms}
          onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
          required
        />

        <br />
        <label>Comments:</label>
        <textarea
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          required
        />

        <br />
        <label>Date:</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <h4>Medicines</h4>
        {form.medicines.map((med, idx) => (
          <div key={idx}>
            <input
              placeholder="Medicine ID"
              onChange={(e) =>
                handleArrayChange(
                  "medicines",
                  idx,
                  "medicine_id",
                  e.target.value
                )
              }
              required
            />
            <input
              placeholder="Dosage"
              onChange={(e) =>
                handleArrayChange("medicines", idx, "dosage", e.target.value)
              }
              required
            />
            <input
              placeholder="Duration"
              onChange={(e) =>
                handleArrayChange("medicines", idx, "duration", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("medicines")}>
          Add Medicine
        </button>

        <h4>Tests</h4>
        {form.tests.map((test, idx) => (
          <div key={idx}>
            <input
              placeholder="Test ID"
              onChange={(e) =>
                handleArrayChange("tests", idx, "test_id", e.target.value)
              }
              required
            />
            <input
              placeholder="Notes"
              onChange={(e) =>
                handleArrayChange("tests", idx, "notes", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("tests")}>
          Add Test
        </button>

        <h4>Surgeries</h4>
        {form.surgeries.map((surg, idx) => (
          <div key={idx}>
            <input
              placeholder="Surgery ID"
              onChange={(e) =>
                handleArrayChange(
                  "surgeries",
                  idx,
                  "surgery_id",
                  e.target.value
                )
              }
              required
            />
            <input
              placeholder="Remarks"
              onChange={(e) =>
                handleArrayChange("surgeries", idx, "remarks", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("surgeries")}>
          Add Surgery
        </button>

        <br />
        <br />
        <button type="submit">Submit Prescription</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Previous Prescriptions</h3>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Symptoms</th>
              <th>Comments</th>
              <th>Consultation ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((pres, index) => (
              <tr key={index}>
                <td>{pres.date}</td>
                <td>{pres.symptoms}</td>
                <td>{pres.comments}</td>
                <td>{pres.consultation_id}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/prescription/${pres.consultation_id}`)
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WritePrescription;
