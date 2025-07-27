import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminPrescriptionDetails = () => {
  const { id } = useParams(); // consultation_id
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/admin/prescriptions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          setMessage(result.error || "Failed to fetch prescription");
        }
      } catch (err) {
        setMessage("Server error while fetching prescription");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (message)
    return <p style={{ padding: "2rem", color: "red" }}>{message}</p>;
  if (!data || !data.prescription)
    return <p style={{ padding: "2rem" }}>No data found.</p>;

  const { prescription, medicines, tests } = data;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2>Prescription Details (Admin View)</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p>
          <strong>Doctor:</strong> {prescription.name}
        </p>
        <p>
          <strong>Symptoms:</strong> {prescription.symptoms}
        </p>
        <p>
          <strong>Comments:</strong> {prescription.comments}
        </p>
        <p>
          <strong>Appointment Details:</strong> {prescription.details}
        </p>
      </div>

      <h3>Prescribed Medicines</h3>
      {medicines && medicines.length > 0 ? (
        medicines.map((med, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "0.5rem",
            }}
          >
            <p>
              <strong>Medicine:</strong> {med.name} <br />
              <strong>Dosage:</strong> {med.dosage} <br />
              <strong>Duration:</strong> {med.duration}
            </p>
          </div>
        ))
      ) : (
        <p>No medicines prescribed.</p>
      )}

      <h3>Recommended Tests</h3>
      {tests && tests.length > 0 ? (
        tests.map((test, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Test:</strong> {test.test_name} <br />
              <strong>Result:</strong> {test.test_result || "Pending"} <br />
              <strong>Comments:</strong> {test.comments}
            </p>
          </div>
        ))
      ) : (
        <p>No tests recommended.</p>
      )}
    </div>
  );
};

export default AdminPrescriptionDetails;
