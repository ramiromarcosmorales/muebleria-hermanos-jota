import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { verifyTokenBackend } from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Función para verificar si el token es válido y no está expirado
  const validateToken = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      if (decodedUser.exp) {
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          return null;
        }
      }
      return decodedUser;
    } catch (error) {
      console.error("Error al validar token:", error);
      return null;
    }
  };

  useEffect(() => {
    async function checkSession() {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedUser = validateToken(token);

        if (decodedUser) {
          try {
            // Verificación contra el backend para evitar sesiones zombie
            const verifiedUser = await verifyTokenBackend(token);
            setCurrentUser(verifiedUser);
          } catch (error) {
            console.warn("Sesión inválida en backend, cerrando sesión local.");
            localStorage.removeItem("authToken");
            setCurrentUser(null);
          }
        } else {
          localStorage.removeItem("authToken");
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }

    checkSession();
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decodedUser = validateToken(token);
    if (decodedUser) {
      setCurrentUser(decodedUser);
    } else {
      localStorage.removeItem("authToken");
      setCurrentUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    navigate("/");
  };

  const value = { currentUser, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
