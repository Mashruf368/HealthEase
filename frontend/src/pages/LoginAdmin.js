// pages/LoginAdmin.js
import LoginForm from "../component/LoginForm";

const LoginAdmin = () => (
  <LoginForm
    endpoint="http://localhost:3001/newreg/login/admin"
    redirectPath="/admin/dashboard"
  />
);
export default LoginAdmin;
