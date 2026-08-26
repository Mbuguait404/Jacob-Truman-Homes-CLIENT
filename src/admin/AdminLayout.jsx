import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, PlusCircle, Mail, Menu, X, Layers, Newspaper, ChevronDown } from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./AdminLogin";
import "../styles/admin.css";

export default function AdminLayout() {
  const { admin, logout, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const groups = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard size={17} />,
      items: [{ to: "/admin/dashboard", label: "Dashboard" }],
    },
    {
      id: "listings",
      label: "Listings",
      icon: <Building2 size={17} />,
      items: [
        { to: "/admin/listings", label: "All listings" },
        { to: "/admin/listings/new", label: "Add listing" },
      ],
    },
    {
      id: "developments",
      label: "Developments",
      icon: <Layers size={17} />,
      items: [
        { to: "/admin/developments", label: "All developments" },
        { to: "/admin/developments/new", label: "Add development" },
      ],
    },
    {
      id: "content",
      label: "Content",
      icon: <Newspaper size={17} />,
      items: [
        { to: "/admin/blogs", label: "Blogs" },
        { to: "/admin/blogs/new", label: "Add post" },
      ],
    },
    {
      id: "leads",
      label: "Leads",
      icon: <Mail size={17} />,
      items: [{ to: "/admin/enquiries", label: "Enquiries" }],
    },
  ];

  const [openGroups, setOpenGroups] = useState(() => groups.map((g) => g.id));
  const toggleGroup = (id) =>
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

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
        <nav className="jth-admin__nav">
          {groups.map((g) => {
            const isOpen = openGroups.includes(g.id);
            const hasActive = g.items.some((it) =>
              location.pathname.startsWith(it.to)
            );
            return (
              <div className={`jth-admin__group${isOpen ? " is-open" : ""}`} key={g.id}>
                <button
                  type="button"
                  className={`jth-admin__group-head${hasActive ? " is-active" : ""}`}
                  onClick={() => toggleGroup(g.id)}
                  aria-expanded={isOpen}
                >
                  <span className="jth-admin__group-icon">{g.icon}</span>
                  <span className="jth-admin__group-label">{g.label}</span>
                  <ChevronDown size={15} className="jth-admin__group-chevron" />
                </button>
                {isOpen && (
                  <div className="jth-admin__group-items">
                    {g.items.map((it) => (
                      <NavLink
                        key={it.to}
                        to={it.to}
                        end={!it.to.endsWith("/new")}
                        className="jth-admin__sublink"
                      >
                        {it.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
