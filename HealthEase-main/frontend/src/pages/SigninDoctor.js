import React, { useState } from "react";

const SignInDoctor = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    contacts: "",
    speciality: "",
    details: "",
  });

  const [degrees, setDegrees] = useState([]);
  const [currentDegree, setCurrentDegree] = useState({
    degree_id: "",
    institute: "",
    year_of_passing: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDegreeChange = (e) => {
    setCurrentDegree({ ...currentDegree, [e.target.name]: e.target.value });
  };

  const addDegree = () => {
    if (
      currentDegree.degree_id &&
      currentDegree.institute &&
      currentDegree.year_of_passing
    ) {
      setDegrees([...degrees, currentDegree]);
      setCurrentDegree({ degree_id: "", institute: "", year_of_passing: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, degrees };

    try {
      const res = await fetch("http://localhost:3001/signin/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // FIXED
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error || "Error occurred");
      }
    } catch (err) {
      setMessage("Failed to register: " + err.message);
    }
  };

  return (
    <div>
      <h2>Doctor Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        {[
          "username",
          "password",
          "name",
          "age",
          "contacts",
          "speciality",
          "details",
        ].map((field) => (
          <div key={field}>
            <input
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
            />
          </div>
        ))}

        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <h4>Add Degrees</h4>
        <input
          name="degree_id"
          placeholder="Degree ID"
          value={currentDegree.degree_id}
          onChange={handleDegreeChange}
          required
        />
        <input
          name="institute"
          placeholder="Institute"
          value={currentDegree.institute}
          onChange={handleDegreeChange}
          required
        />
        <input
          name="year_of_passing"
          placeholder="Year of Passing"
          type="number"
          value={currentDegree.year_of_passing}
          onChange={handleDegreeChange}
          required
        />
        <button type="button" onClick={addDegree}>
          Add Degree
        </button>

        <div>
          <h5>Added Degrees:</h5>
          <ul>
            {degrees.map((d, i) => (
              <li key={i}>
                ID: {d.degree_id}, Institute: {d.institute}, Year:{" "}
                {d.year_of_passing}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignInDoctor;
