// // // pages/LoginDoctor.js
// // import LoginForm from "../component/LoginForm";

// // const LoginDoctor = () => (
// //   <LoginForm
// //     endpoint="http://localhost:3001/newreg/login/doctor"
// //     redirectPath="/doctor/dashboard"
// //   />
// // );
// // export default LoginDoctor;
// // pages/LoginDoctor.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import LoginForm from "../component/LoginForm";

// const LoginDoctor = () => {
//   const navigate = useNavigate();

//   const goToSignUp = () => {
//     navigate("/signin/doctor");
//   };

//   return (
//     <div>
//       <LoginForm
//         endpoint="http://localhost:3001/newreg/login/doctor"
//         redirectPath="/doctor/dashboard"
//       />
//       <div className="additional-actions">
//         <button onClick={goToSignUp} className="signup-button">
//           Sign in as new doctor
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginDoctor;
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../component/LoginForm";
import "../styles/LoginDoctor.css"; // Import the new CSS file

const LoginDoctor = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signin/doctor");
  };

  return (
    <div className="login-doctor-container">
      <LoginForm
        endpoint="http://localhost:3001/newreg/login/doctor"
        redirectPath="/doctor/dashboard"
      />
      <div className="doctor-additional-actions">
        <button onClick={goToSignUp} className="doctor-signup-button">
          Sign in as new doctor
        </button>
      </div>
    </div>
  );
};

export default LoginDoctor;
