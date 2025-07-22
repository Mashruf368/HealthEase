import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PathologistPatient = () => {
  const { id } = useParams(); // patient_id
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch(
          `http://localhost:3001/pathologist/patient/${id}/tests`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setTests(data.tests);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTests();
  }, [id]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Tests for Patient ID: {id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tests.length === 0 ? (
        <p>No test records found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Date</th>
              <th>Consultation ID</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td>{test.test_name}</td>
                <td>{test.test_result || "Pending"}</td>
                <td>
                  {test.updated_at
                    ? new Date(test.updated_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{test.consultation_id}</td>
                <td>{test.comments || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PathologistPatient;
