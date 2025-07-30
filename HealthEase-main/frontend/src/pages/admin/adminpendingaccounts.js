import React, { useEffect, useState } from "react";
import "../../styles/Admin/AdminPendingAccounts.css"; // Import the CSS file

const AdminPending = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [error, setError] = useState("");

  // Fetch pending admins
  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/admin/pending/adm",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPendingAdmins(data);
        } else {
          setError(data.error || "Failed to fetch pending admin accounts.");
        }
      } catch (err) {
        setError("Something went wrong while fetching pending admin accounts.");
        console.error(err);
      }
    };

    fetchPendingAdmins();
  }, []);

  // Fetch pending doctors
  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/admin/pending/doc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPendingDoctors(data);
        } else {
          setError(data.error || "Failed to fetch pending doctor accounts.");
        }
      } catch (err) {
        setError(
          "Something went wrong while fetching pending doctor accounts."
        );
        console.error(err);
      }
    };

    fetchPendingDoctors();
  }, []);

  // Approve admin
  const handleApproveAdmin = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/admin/approve/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { message: text };
      }

      if (response.ok) {
        alert(`Approved ${username} successfully.`);
        setPendingAdmins((prev) =>
          prev.filter((acc) => acc.username !== username)
        );
      } else {
        alert(`Approval failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
      console.error(err);
    }
  };

  // Approve doctor
  const handleApproveDoctor = async (pendingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/admin/approvedoc/${pendingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { message: text };
      }

      if (response.ok) {
        alert(`Doctor with pending_id ${pendingId} approved successfully.`);
        setPendingDoctors((prev) =>
          prev.filter((doc) => doc.pending_id !== pendingId)
        );
      } else {
        alert(`Approval failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="admin-pending-container">
      <h2 className="admin-pending-title">Pending Admin Registrations</h2>

      {error && <p className="admin-pending-error">{error}</p>}

      <table className="admin-pending-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Branch ID</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingAdmins.length > 0 ? (
            pendingAdmins.map((account, index) => (
              <tr key={index}>
                <td>{account.name}</td>
                <td>{account.branch_id}</td>
                <td>{account.type}</td>
                <td>
                  <button
                    className="admin-pending-approve-btn"
                    onClick={() => handleApproveAdmin(account.username)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="admin-pending-no-data">
                No pending admin accounts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="admin-pending-subtitle">Pending Doctor Registrations</h2>

      {pendingDoctors.length > 0 ? (
        pendingDoctors.map((doc, index) => (
          <div key={index} className="admin-pending-doctor-card">
            <h3 className="admin-pending-doctor-name">{doc.name}</h3>
            <p className="admin-pending-doctor-info">
              <strong>Age:</strong> {doc.age}
            </p>
            <p className="admin-pending-doctor-info">
              <strong>Gender:</strong> {doc.gender}
            </p>
            <p className="admin-pending-doctor-info">
              <strong>Contact:</strong> {doc.contacts}
            </p>
            <p className="admin-pending-doctor-info">
              <strong>Speciality:</strong> {doc.speciality}
            </p>
            <p className="admin-pending-doctor-info">
              <strong>Details:</strong> {doc.details}
            </p>

            <h4 className="admin-pending-degrees-title">Degrees:</h4>
            {doc.degrees && doc.degrees.length > 0 ? (
              <ul className="admin-pending-degrees-list">
                {doc.degrees.map((deg, i) => (
                  <li key={i}>
                    {deg.degree_id}, {deg.institution}, {deg.year}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="admin-pending-no-degrees">No degrees provided.</p>
            )}

            <button
              className="admin-pending-doctor-approve-btn"
              onClick={() => handleApproveDoctor(doc.pending_id)}
            >
              Approve Doctor
            </button>
          </div>
        ))
      ) : (
        <div className="admin-pending-no-doctors">
          <p>No pending doctor registrations found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPending;
