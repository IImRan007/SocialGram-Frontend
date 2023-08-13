import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";

const PrivateRoute = ({ children }) => {
  const { userState } = useContext(UserContext);

  if (userState.user) return children;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
