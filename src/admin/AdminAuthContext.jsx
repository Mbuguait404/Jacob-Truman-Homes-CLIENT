import React, { createContext, useContext, useState, useEffect } from "react";
import { getAdminUser, logoutAdmin, api } from "../api/client";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAdminUser();
    if (user) {
      // Validate token is still good by calling /me
      api
        .get("/auth/me")
        .then((data) => setAdmin(data.admin))
        .catch(() => {
          logoutAdmin();
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (adminData) => setAdmin(adminData);
  const logout = () => {
    logoutAdmin();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}
