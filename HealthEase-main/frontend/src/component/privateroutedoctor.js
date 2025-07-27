import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "./getuserrole";

const PrivateRouteAdmin = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const checkRole = async () => {
      const role = await getUserRole();
      setAuthorized(role === "DOC");
    };

    checkRole();
  }, []);

  if (authorized === null) return <div>Loading...</div>;

  return authorized ? children : <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
