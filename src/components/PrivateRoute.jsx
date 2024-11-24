import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.role === "admin" ? children : <Navigate to="/" />;
};

export default PrivateRoute;