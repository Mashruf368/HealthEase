// // // // // //doctor side to view and write prescriptions
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const WritePrescription = () => {
//   const { id } = useParams(); // appointment ID
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     symptoms: "",
//     comments: "",
//     date: "",
//     medicines: [],
//     tests: [],
//     surgeries: [],
//   });
//   const [message, setMessage] = useState("");
//   const [prescriptions, setPrescriptions] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetchPrescriptions();
//   }, [token, navigate]);

//   const fetchPrescriptions = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:3001/profile/prescriptions/${id}`,
//         {
//           headers: { "Content-Type": "application/json", token },
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setPrescriptions(data);
//       } else {
//         setMessage("Failed to fetch prescriptions");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Error fetching prescriptions");
//     }
//   };

//   const handleArrayChange = (type, index, field, value) => {
//     const updated = [...form[type]];
//     updated[index] = { ...updated[index], [field]: value };
//     setForm((prev) => ({ ...prev, [type]: updated }));
//   };

//   const addEntry = (type) => {
//     setForm((prev) => ({ ...prev, [type]: [...prev[type], {}] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         `http://localhost:3001/doctor/appointments/${id}/prescription`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token,
//           },
//           body: JSON.stringify(form),
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Prescription submitted successfully");
//         navigate("/doctor/appointments");
//       } else {
//         setMessage(data.error || "Failed to submit");
//       }
//     } catch (err) {
//       setMessage("Server error: " + err);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Write Prescription</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>Symptoms:</label>
//         <textarea
//           value={form.symptoms}
//           onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
//           required
//         />

//         <br />
//         <label>Comments:</label>
//         <textarea
//           value={form.comments}
//           onChange={(e) => setForm({ ...form, comments: e.target.value })}
//           required
//         />

//         <br />
//         <label>Date:</label>
//         <input
//           type="date"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />

//         <h4>Medicines</h4>
//         {form.medicines.map((med, idx) => (
//           <div key={idx}>
//             <input
//               placeholder="Medicine ID"
//               onChange={(e) =>
//                 handleArrayChange(
//                   "medicines",
//                   idx,
//                   "medicine_id",
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <input
//               placeholder="Dosage"
//               onChange={(e) =>
//                 handleArrayChange("medicines", idx, "dosage", e.target.value)
//               }
//               required
//             />
//             <input
//               placeholder="Duration"
//               onChange={(e) =>
//                 handleArrayChange("medicines", idx, "duration", e.target.value)
//               }
//               required
//             />
//           </div>
//         ))}
//         <button type="button" onClick={() => addEntry("medicines")}>
//           Add Medicine
//         </button>

//         <h4>Tests</h4>
//         {form.tests.map((test, idx) => (
//           <div key={idx}>
//             <input
//               placeholder="Test ID"
//               onChange={(e) =>
//                 handleArrayChange("tests", idx, "test_id", e.target.value)
//               }
//               required
//             />
//             <input
//               placeholder="Notes"
//               onChange={(e) =>
//                 handleArrayChange("tests", idx, "notes", e.target.value)
//               }
//               required
//             />
//           </div>
//         ))}
//         <button type="button" onClick={() => addEntry("tests")}>
//           Add Test
//         </button>

//         <h4>Surgeries</h4>
//         {form.surgeries.map((surg, idx) => (
//           <div key={idx}>
//             <input
//               placeholder="Surgery ID"
//               onChange={(e) =>
//                 handleArrayChange(
//                   "surgeries",
//                   idx,
//                   "surgery_id",
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <input
//               placeholder="Remarks"
//               onChange={(e) =>
//                 handleArrayChange("surgeries", idx, "remarks", e.target.value)
//               }
//               required
//             />
//           </div>
//         ))}
//         <button type="button" onClick={() => addEntry("surgeries")}>
//           Add Surgery
//         </button>

//         <br />
//         <br />
//         <button type="submit">Submit Prescription</button>
//       </form>

//       <hr style={{ margin: "2rem 0" }} />

//       <h3>Previous Prescriptions</h3>
//       {prescriptions.length === 0 ? (
//         <p>No prescriptions found.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="10"
//           style={{ marginTop: "1rem", width: "100%" }}
//         >
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Symptoms</th>
//               <th>Comments</th>
//               <th>Consultation ID</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.map((pres, index) => (
//               <tr key={index}>
//                 <td>{pres.date}</td>
//                 <td>{pres.symptoms}</td>
//                 <td>{pres.comments}</td>
//                 <td>{pres.consultation_id}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       navigate(`/admin/prescription/${pres.consultation_id}`)
//                     }
//                     style={{
//                       padding: "0.5rem 1rem",
//                       backgroundColor: "#28a745",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default WritePrescription;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Doctor/DoctorWritePrescription.css";

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

  // New state for medicines and tests data
  const [allMedicines, setAllMedicines] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [medicineSearchTerms, setMedicineSearchTerms] = useState({});
  const [testSearchTerms, setTestSearchTerms] = useState({});
  const [showMedicineDropdown, setShowMedicineDropdown] = useState({});
  const [showTestDropdown, setShowTestDropdown] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchPrescriptions();
    fetchMedicines();
    fetchTests();
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

  const fetchMedicines = async () => {
    try {
      const res = await fetch("http://localhost:3001/medicine", {
        headers: { "Content-Type": "application/json", token },
      });
      const data = await res.json();
      if (res.ok) {
        setAllMedicines(data);
      }
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  const fetchTests = async () => {
    try {
      const res = await fetch("http://localhost:3001/test", {
        headers: { "Content-Type": "application/json", token },
      });
      const data = await res.json();
      if (res.ok) {
        setAllTests(data);
      }
    } catch (err) {
      console.error("Error fetching tests:", err);
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

  const removeEntry = (type, index) => {
    const updated = form[type].filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, [type]: updated }));

    // Clean up search terms
    if (type === "medicines") {
      const newSearchTerms = { ...medicineSearchTerms };
      delete newSearchTerms[index];
      setMedicineSearchTerms(newSearchTerms);
      const newDropdown = { ...showMedicineDropdown };
      delete newDropdown[index];
      setShowMedicineDropdown(newDropdown);
    } else if (type === "tests") {
      const newSearchTerms = { ...testSearchTerms };
      delete newSearchTerms[index];
      setTestSearchTerms(newSearchTerms);
      const newDropdown = { ...showTestDropdown };
      delete newDropdown[index];
      setShowTestDropdown(newDropdown);
    }
  };

  const handleMedicineSearch = (index, searchTerm) => {
    setMedicineSearchTerms({ ...medicineSearchTerms, [index]: searchTerm });
    setShowMedicineDropdown({
      ...showMedicineDropdown,
      [index]: searchTerm.length > 0,
    });
  };

  const handleTestSearch = (index, searchTerm) => {
    setTestSearchTerms({ ...testSearchTerms, [index]: searchTerm });
    setShowTestDropdown({
      ...showTestDropdown,
      [index]: searchTerm.length > 0,
    });
  };

  const selectMedicine = (index, medicine) => {
    handleArrayChange("medicines", index, "medicine_id", medicine.medicine_id);
    setMedicineSearchTerms({ ...medicineSearchTerms, [index]: medicine.name });
    setShowMedicineDropdown({ ...showMedicineDropdown, [index]: false });
  };

  const selectTest = (index, test) => {
    handleArrayChange("tests", index, "test_id", test.test_id);
    setTestSearchTerms({ ...testSearchTerms, [index]: test.test_name });
    setShowTestDropdown({ ...showTestDropdown, [index]: false });
  };

  const getFilteredMedicines = (searchTerm) => {
    if (!searchTerm) return [];
    return allMedicines
      .filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  };

  const getFilteredTests = (searchTerm) => {
    if (!searchTerm) return [];
    return allTests
      .filter((test) =>
        test.test_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
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
    <div className="prescription-container">
      <header className="prescription-header">
        <div className="brand">HealthEase</div>
        <div className="page-title">Write Prescription</div>
      </header>

      <main className="prescription-content">
        <div className="prescription-title">
          <h2>Write Prescription</h2>
          <p>Create a comprehensive prescription for your patient</p>
        </div>

        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="form-section">
          <form onSubmit={handleSubmit} className="prescription-form">
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="symptoms">Symptoms</label>
                <textarea
                  id="symptoms"
                  value={form.symptoms}
                  onChange={(e) =>
                    setForm({ ...form, symptoms: e.target.value })
                  }
                  placeholder="Describe the patient's symptoms..."
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="comments">Comments</label>
                <textarea
                  id="comments"
                  value={form.comments}
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                  placeholder="Additional comments or observations..."
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="medicines-section">
              <div className="section-header">
                <h4>💊 Medicines</h4>
                <button
                  type="button"
                  onClick={() => addEntry("medicines")}
                  className="add-btn"
                >
                  Add Medicine
                </button>
              </div>

              {form.medicines.map((med, idx) => (
                <div key={idx} className="medicine-entry">
                  <div className="medicine-search-wrapper">
                    <label>Medicine Name</label>
                    <div className="search-dropdown-container">
                      <input
                        type="text"
                        placeholder="Search for medicine..."
                        value={medicineSearchTerms[idx] || ""}
                        onChange={(e) =>
                          handleMedicineSearch(idx, e.target.value)
                        }
                        onFocus={() =>
                          setShowMedicineDropdown({
                            ...showMedicineDropdown,
                            [idx]: medicineSearchTerms[idx]?.length > 0,
                          })
                        }
                        className="search-input"
                        required
                      />
                      {showMedicineDropdown[idx] && (
                        <div className="dropdown-menu">
                          {getFilteredMedicines(medicineSearchTerms[idx]).map(
                            (medicine) => (
                              <div
                                key={medicine.medicine_id}
                                className="dropdown-item"
                                onClick={() => selectMedicine(idx, medicine)}
                              >
                                <div className="item-name">{medicine.name}</div>
                                <div className="item-detail">
                                  {medicine.manufacturer}
                                </div>
                              </div>
                            )
                          )}
                          {getFilteredMedicines(medicineSearchTerms[idx])
                            .length === 0 && (
                            <div className="dropdown-item no-results">
                              No medicines found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g., 1 tablet twice daily"
                      onChange={(e) =>
                        handleArrayChange(
                          "medicines",
                          idx,
                          "dosage",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 7 days"
                      onChange={(e) =>
                        handleArrayChange(
                          "medicines",
                          idx,
                          "duration",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEntry("medicines", idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="tests-section">
              <div className="section-header">
                <h4>🔬 Tests</h4>
                <button
                  type="button"
                  onClick={() => addEntry("tests")}
                  className="add-btn"
                >
                  Add Test
                </button>
              </div>

              {form.tests.map((test, idx) => (
                <div key={idx} className="test-entry">
                  <div className="test-search-wrapper">
                    <label>Test Name</label>
                    <div className="search-dropdown-container">
                      <input
                        type="text"
                        placeholder="Search for test..."
                        value={testSearchTerms[idx] || ""}
                        onChange={(e) => handleTestSearch(idx, e.target.value)}
                        onFocus={() =>
                          setShowTestDropdown({
                            ...showTestDropdown,
                            [idx]: testSearchTerms[idx]?.length > 0,
                          })
                        }
                        className="search-input"
                        required
                      />
                      {showTestDropdown[idx] && (
                        <div className="dropdown-menu">
                          {getFilteredTests(testSearchTerms[idx]).map(
                            (test) => (
                              <div
                                key={test.test_id}
                                className="dropdown-item"
                                onClick={() => selectTest(idx, test)}
                              >
                                <div className="item-name">
                                  {test.test_name}
                                </div>
                              </div>
                            )
                          )}
                          {getFilteredTests(testSearchTerms[idx]).length ===
                            0 && (
                            <div className="dropdown-item no-results">
                              No tests found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Notes</label>
                    <input
                      type="text"
                      placeholder="Additional notes for the test..."
                      onChange={(e) =>
                        handleArrayChange("tests", idx, "notes", e.target.value)
                      }
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEntry("tests", idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="surgeries-section">
              <div className="section-header">
                <h4>🏥 Surgeries</h4>
                <button
                  type="button"
                  onClick={() => addEntry("surgeries")}
                  className="add-btn"
                >
                  Add Surgery
                </button>
              </div>

              {form.surgeries.map((surg, idx) => (
                <div key={idx} className="surgery-entry">
                  <div className="input-group">
                    <label>Surgery ID</label>
                    <input
                      type="text"
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
                  </div>

                  <div className="input-group">
                    <label>Remarks</label>
                    <input
                      type="text"
                      placeholder="Surgery remarks..."
                      onChange={(e) =>
                        handleArrayChange(
                          "surgeries",
                          idx,
                          "remarks",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEntry("surgeries", idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button type="submit" className="submit-btn">
              Submit Prescription
            </button>
          </form>
        </div>

        <div className="previous-prescriptions">
          <h3>Previous Prescriptions</h3>
          {prescriptions.length === 0 ? (
            <div className="no-prescriptions">
              <div className="no-results-icon">📋</div>
              <p>No previous prescriptions found.</p>
            </div>
          ) : (
            <div className="prescriptions-table-wrapper">
              <table className="prescriptions-table">
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
                            navigate(
                              `/admin/prescription/${pres.consultation_id}`
                            )
                          }
                          className="view-btn"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WritePrescription;
