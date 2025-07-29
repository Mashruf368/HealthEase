// // pages/Login.js
// import LoginForm from "../component/LoginForm";

// const Login = () => (
//   <LoginForm
//     endpoint="http://localhost:3001/newreg/login"
//     redirectPath="/dashboard"
//     showRoleButtons={true}
//   />
// );
// export default Login;
import React from "react";
import LoginForm from "../component/LoginForm";
import "../styles/Login.css"; // Import the specific CSS for this page

const Login = () => (
  <div className="login-page-container">
    <div className="login-page-card">
      <h1 className="login-page-title">Welcome To Healthease</h1>
      <LoginForm
        endpoint="http://localhost:3001/newreg/login"
        redirectPath="/dashboard"
        showRoleButtons={true}
      />
    </div>
  </div>
);

export default Login;
