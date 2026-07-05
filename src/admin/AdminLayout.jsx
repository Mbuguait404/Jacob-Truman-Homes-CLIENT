import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, PlusCircle } from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./AdminLogin";
import "../styles/admin.css";

export default function AdminLayout() {
  const { adminName, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (!adminName) return <AdminLogin />;

  const nav = [
    ["/admin/dashboard", "Dashboard", <LayoutDashboard size={17} key="i" />],
    ["/admin/listings", "Listings", <Building2 size={17} key="i" />],
    ["/admin/listings/new", "Add listing", <PlusCircle size={17} key="i" />],
  ];

  return (
    <div className="jth-admin">
      <aside className="jth-admin__sidebar">
        <div className="jth-admin__brand">
          <span className="jth-brand__mark">JT</span> Admin
        </div>
        <nav>
          {nav.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end>
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="jth-admin__sidebar-foot">
          <div className="jth-admin__avatar">{adminName?.[0]?.toUpperCase() || "A"}</div>
          <div>
            <strong>{adminName}</strong>
            <span>Administrator</span>
          </div>
        </div>
        <button
          className="jth-admin__exit"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          ← Exit to site
        </button>
      </aside>
      <main className="jth-admin__main">
        <Outlet />
      </main>
    </div>
  );
}
