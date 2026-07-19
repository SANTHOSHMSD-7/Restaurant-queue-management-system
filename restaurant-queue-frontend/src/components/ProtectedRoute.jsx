import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "OWNER") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;