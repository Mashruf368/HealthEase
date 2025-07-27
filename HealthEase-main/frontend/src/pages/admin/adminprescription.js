import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/admin/prescriptions?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setPrescriptions(data.prescriptions);
          setTotalPages(data.totalPages);
        } else {
          setMessage(data.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, navigate, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const buttons = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: i === currentPage ? "#007bff" : "#f0f0f0",
            color: i === currentPage ? "white" : "black",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {i}
        </button>
      );
    }

    return (
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          &lt; Prev
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next &gt;
        </button>
      </div>
    );
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading prescriptions...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prescriptions</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <>
          <table
            border="1"
            cellPadding="10"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Appointment ID</th>
                <th>Consultation ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((p, idx) => (
                <tr key={idx}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <span style={{ alignSelf: "flex-start" }}>
                        {p.patient_name}
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/admin/patient/${p.patient_id}`)
                        }
                        style={{
                          marginTop: "4px",
                          padding: "0.3rem 0.6rem",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  </td>

                  <td>{p.doctor_name}</td>
                  <td>{p.appointment_id}</td>
                  <td>{p.consultation_id}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/prescription/${p.consultation_id}`)
                      }
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View Prescription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default AdminPrescriptions;
