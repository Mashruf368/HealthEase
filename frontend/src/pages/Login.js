// pages/Login.js
import LoginForm from "../component/LoginForm";

const Login = () => (
  <LoginForm
    endpoint="http://localhost:3001/newreg/login"
    redirectPath="/dashboard"
    showRoleButtons={true}
  />
);
export default Login;
