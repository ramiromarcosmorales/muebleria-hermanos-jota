import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedUser = jwt_decode(token);
      setCurrentUser(decodedUser);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decodedUser = jwt_decode(token);
    setCurrentUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
