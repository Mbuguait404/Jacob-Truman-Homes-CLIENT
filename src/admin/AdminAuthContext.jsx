import React, { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminName, setAdminName] = useState(null);

  const login = (name) => setAdminName(name || "Admin");
  const logout = () => setAdminName(null);

  return (
    <AdminAuthContext.Provider value={{ adminName, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}
