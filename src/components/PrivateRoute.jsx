import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Check if the user is logged in and has the "admin" role
  if (currentUser.role === "Admin") {
    return children;
  } else {
    // Redirect customer to their home page (or any other page)
    return <Navigate to="/" />;
  }

};

export default PrivateRoute;