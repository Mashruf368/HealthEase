// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import LoginForm from "../component/LoginForm";

// // // const LoginAdmin = () => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div>
// // //       <LoginForm
// // //         endpoint="http://localhost:3001/newreg/login/admin"
// // //         redirectPath="/admin/dashboard"
// // //       />
// // //       <div style={{ marginTop: "1rem", textAlign: "center" }}>
// // //         <button onClick={() => navigate("/admin/signin")}>
// // //           Sign In (Register Pharmacist / Pathologist)
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginAdmin;
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import LoginForm from "../component/LoginForm";

// // const LoginAdmin = () => {
// //   const navigate = useNavigate();
// //   const [endpoint, setEndpoint] = useState("http://localhost:3001/newreg/login/admin");
// //   const [redirectPath, setRedirectPath] = useState("/admin/dashboard");

// //   const handleLoginType = (type) => {
// //     if (type === "admin") {
// //       setEndpoint("http://localhost:3001/newreg/login/admin");
// //       setRedirectPath("/admin/dashboard");
// //     } else if (type === "pharmacist") {
// //       setEndpoint("http://localhost:3001/newreg/login/pharmacist");
// //       setRedirectPath("/pharmacist/dashboard");
// //     } else if (type === "pathologist") {
// //       setEndpoint("http://localhost:3001/newreg/login/pathologist");
// //       setRedirectPath("/pathologist/dashboard");
// //     }
// //   };

// //   return (
// //     <div>
// //       <div style={{ textAlign: "center", marginTop: "1rem" }}>
// //         <h2>Select Login Type</h2>
// //         <button onClick={() => handleLoginType("admin")}>Login as Admin</button>
// //         <button onClick={() => handleLoginType("pharmacist")}>Login as Pharmacist</button>
// //         <button onClick={() => handleLoginType("pathologist")}>Login as Pathologist</button>
// //       </div>

// //       <LoginForm endpoint={endpoint} redirectPath={redirectPath} />

// //       <div style={{ marginTop: "1rem", textAlign: "center" }}>
// //         <button onClick={() => navigate("/admin/signin")}>
// //           Sign In (Register Pharmacist / Pathologist)
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginAdmin;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginAdmin = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (endpoint) => {
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setMessage("Something went wrong: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//       <h2 style={{ textAlign: "center" }}>Admin Login</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//       />

//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <button
//           onClick={() =>
//             handleLogin("http://localhost:3001/newreg/login/admin")
//           }
//         >
//           Login as Admin
//         </button>
//         <button
//           onClick={() =>
//             handleLogin("http://localhost:3001/newreg/login/pharmacist")
//           }
//         >
//           Login as Pharmacist
//         </button>
//         <button
//           onClick={() =>
//             handleLogin("http://localhost:3001/newreg/login/pathologist")
//           }
//         >
//           Login as Pathologist
//         </button>
//         <button onClick={() => navigate("/admin/signin")}>
//           Sign In (Pharmacist / Pathologist)
//         </button>
//       </div>

//       {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
//     </div>
//   );
// };

// export default LoginAdmin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (endpoint, redirectPath) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate(redirectPath);
    } catch (err) {
      setMessage("Something went wrong: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() =>
            handleLogin(
              "http://localhost:3001/newreg/login/admin",
              "/admin/dashboard"
            )
          }
        >
          Login as Admin
        </button>
        <button
          onClick={() =>
            handleLogin(
              "http://localhost:3001/newreg/login/pharmacist",
              "/pharmacist/dashboard"
            )
          }
        >
          Login as Pharmacist
        </button>
        <button
          onClick={() =>
            handleLogin(
              "http://localhost:3001/newreg/login/pathologist",
              "/pathologist/dashboard"
            )
          }
        >
          Login as Pathologist
        </button>
        <button onClick={() => navigate("/admin/signin")}>
          Sign In (Pharmacist / Pathologist)
        </button>
      </div>

      {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default LoginAdmin;
