///doctor side to view and write prescription

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WritePrescription = () => {
  const { id } = useParams();
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
    const token = localStorage.getItem("token");
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
      setMessage("Server error" + err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Write Prescription</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Symptoms:
          <br />
          <textarea
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Comments:
          <br />
          <textarea
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Date:
          <br />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>
        <br />
        <br />

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
    </div>
  );
};

export default WritePrescription;
