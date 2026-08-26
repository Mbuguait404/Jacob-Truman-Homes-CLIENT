import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, PlusCircle, Mail, Menu, X, Layers, Newspaper } from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./AdminLogin";
import "../styles/admin.css";

export default function AdminLayout() {
  const { admin, logout, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (loading) {
    return (
      <div className="jth-admin-login">
        <p>Loading…</p>
      </div>
    );
  }

  if (!admin) return <AdminLogin />;

  const nav = [
    ["/admin/dashboard", "Dashboard", <LayoutDashboard size={17} key="i" />],
    ["/admin/listings", "Listings", <Building2 size={17} key="i" />],
    ["/admin/listings/new", "Add listing", <PlusCircle size={17} key="i" />],
    ["/admin/developments", "Developments", <Layers size={17} key="i" />],
    ["/admin/developments/new", "Add development", <PlusCircle size={17} key="i" />],
    ["/admin/blogs", "Blogs", <Newspaper size={17} key="i" />],
    ["/admin/blogs/new", "Add post", <PlusCircle size={17} key="i" />],
    ["/admin/enquiries", "Enquiries", <Mail size={17} key="i" />],
  ];

  return (
    <div className="jth-admin">
      {/* Mobile header */}
      <header className="jth-admin__mobile-header">
        <div className="jth-admin__mobile-brand">
          <span className="jth-brand__mark">JT</span> Admin
        </div>
        <button
          className="jth-admin__mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Overlay backdrop on mobile */}
      {menuOpen && (
        <div className="jth-admin__overlay" onClick={() => setMenuOpen(false)} />
      )}

      <aside className={`jth-admin__sidebar ${menuOpen ? "jth-admin__sidebar--open" : ""}`}>
        <div className="jth-admin__brand">
          <span className="jth-brand__mark">JT</span> Admin
        </div>
        <nav>
          {nav.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === "/admin/dashboard" ? true : false}>
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="jth-admin__sidebar-foot">
          <div className="jth-admin__avatar">{admin.name?.[0]?.toUpperCase() || "A"}</div>
          <div>
            <strong>{admin.name}</strong>
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
