// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [specialityFilter, setSpecialityFilter] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in.");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:3001/doctors", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });

//         if (!res.ok) {
//           const msg = await res.text();
//           throw new Error(`Error ${res.status}: ${msg}`);
//         }

//         const data = await res.json();
//         setDoctors(data);
//       } catch (err) {
//         console.error("Doctor fetch failed:", err.message);
//         setError("Failed to fetch doctors: " + err.message);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleAppointment = (id) => {
//     navigate(`/doctor/${id}/appointment`);
//   };

//   // Extract unique specialities
//   const specialities = [
//     ...new Set(doctors.map((doc) => doc.speciality).filter(Boolean)),
//   ];

//   // Filtered doctors
//   const filteredDoctors = doctors.filter((doc) => {
//     const matchesName = doc.name
//       .toLowerCase()
//       .includes(searchName.toLowerCase());
//     const matchesSpeciality = specialityFilter
//       ? doc.speciality === specialityFilter
//       : true;
//     return matchesName && matchesSpeciality;
//   });

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Find a Doctor</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Search Inputs */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           style={{ padding: "8px", marginRight: "10px" }}
//         />

//         <select
//           value={specialityFilter}
//           onChange={(e) => setSpecialityFilter(e.target.value)}
//           style={{ padding: "8px" }}
//         >
//           <option value="">All Specialities</option>
//           {specialities.map((spec, idx) => (
//             <option key={idx} value={spec}>
//               {spec}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredDoctors.length === 0 && !error ? (
//         <p>No doctors found.</p>
//       ) : (
//         <div style={{ display: "grid", gap: "16px" }}>
//           {filteredDoctors.map((doc) => (
//             <div
//               key={doc.doctor_id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "16px",
//                 borderRadius: "8px",
//                 background: "#f9f9f9",
//               }}
//             >
//               <h3>{doc.name}</h3>

//               {doc.speciality && (
//                 <p>
//                   <strong>Speciality:</strong> {doc.speciality}
//                 </p>
//               )}

//               {/* Degrees list (only degree_name and institute) */}
//               {doc.degrees && doc.degrees.length > 0 && (
//                 <ul>
//                   {doc.degrees.map((deg, idx) => (
//                     <li key={idx}>
//                       {deg.degree_name} ({deg.institute})
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               <button
//                 onClick={() => handleAppointment(doc.doctor_id)}
//                 style={{
//                   marginTop: "10px",
//                   padding: "8px 16px",
//                   backgroundColor: "#007bff",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Make Appointment
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Doctors;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/doctors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Error ${res.status}: ${msg}`);
        }

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Doctor fetch failed:", err.message);
        setError("Failed to fetch doctors: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = (id) => {
    navigate(`/doctor/${id}/appointment`);
  };

  const clearFilters = () => {
    setSearchName("");
    setSpecialityFilter("");
  };

  // Get first letter for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Extract unique specialities
  const specialities = [
    ...new Set(doctors.map((doc) => doc.speciality).filter(Boolean)),
  ];

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesSpeciality = specialityFilter
      ? doc.speciality === specialityFilter
      : true;
    return matchesName && matchesSpeciality;
  });

  return (
    <div className="doctors-container">
      {/* Header */}
      <header className="doctors-header">
        <div className="brand">HealthEase</div>
        <div className="page-title">Find Your Doctor</div>
      </header>

      {/* Main Content */}
      <main className="doctors-content">
        <div className="doctors-title">
          <h2>Find a Doctor</h2>
          <p>
            Search through our network of qualified healthcare professionals
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Search Section */}
        <section className="search-section">
          <div className="search-controls">
            <div className="search-input-group">
              <div className="input-wrapper">
                <label htmlFor="name-search">Doctor Name</label>
                <input
                  id="name-search"
                  type="text"
                  placeholder="Search by doctor name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="input-wrapper filter-wrapper">
                <label htmlFor="speciality-filter">Speciality</label>
                <select
                  id="speciality-filter"
                  value={specialityFilter}
                  onChange={(e) => setSpecialityFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Specialities</option>
                  {specialities.map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(searchName || specialityFilter) && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          <div className="results-header">
            <div className="results-count">
              {loading
                ? "Loading doctors..."
                : `${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  } found`}
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 && !error ? (
            <div className="no-results">
              <div className="no-results-icon">👨‍⚕️</div>
              <h3>No doctors found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doc) => (
                <article key={doc.doctor_id} className="doctor-card">
                  <div className="doctor-header">
                    <div className="doctor-avatar">{getInitials(doc.name)}</div>
                    <div className="doctor-info">
                      <h3>{doc.name}</h3>
                      {doc.speciality && (
                        <span className="doctor-speciality">
                          {doc.speciality}
                        </span>
                      )}
                    </div>
                  </div>

                  {doc.degrees && doc.degrees.length > 0 && (
                    <div className="doctor-degrees">
                      <h4>Qualifications</h4>
                      <ul className="degrees-list">
                        {doc.degrees.map((deg, idx) => (
                          <li key={idx} className="degree-item">
                            <div className="degree-name">{deg.degree_name}</div>
                            <div className="degree-institute">
                              {deg.institute}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => handleAppointment(doc.doctor_id)}
                    className="appointment-btn"
                  >
                    Book Appointment
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Doctors;
