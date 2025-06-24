// pages/LoginDoctor.js
import LoginForm from "../component/LoginForm";

const LoginDoctor = () => (
  <LoginForm
    endpoint="http://localhost:3001/newreg/login/doctor"
    redirectPath="/doctor/dashboard"
  />
);
export default LoginDoctor;
