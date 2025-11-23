import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AuthRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <p>Cargando...</p>
      </div>
    );
  }

  if (!currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
