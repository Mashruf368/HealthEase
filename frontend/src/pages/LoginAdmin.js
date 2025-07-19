import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../component/LoginForm";

const LoginAdmin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <LoginForm
        endpoint="http://localhost:3001/newreg/login/admin"
        redirectPath="/admin/dashboard"
      />
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button onClick={() => navigate("/admin/signin")}>
          Sign In (Register Pharmacist / Pathologist)
        </button>
      </div>
    </div>
  );
};

export default LoginAdmin;
