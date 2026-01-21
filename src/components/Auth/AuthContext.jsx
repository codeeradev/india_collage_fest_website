import { createContext, useEffect, useState } from "react";
import { AUTH_EXPIRY_TIME } from "../../config/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* -------- restore session once -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!token || !userData || !expiresAt) {
      clearSession();
      return;
    }

    if (Date.now() > Number(expiresAt)) {
      clearSession();
      return;
    }

    setUser(JSON.parse(userData));
  }, []);

  const login = (userData, token) => {
    const expiresAt = Date.now() + AUTH_EXPIRY_TIME;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expiresAt", expiresAt);

    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout: clearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
