import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["/", "Home"],
    ["/listings", "Listings"],
    ["/about", "About"],
  ];

  const isHome = location.pathname === "/";

  return (
    <header className={`jth-nav ${scrolled || !isHome ? "jth-nav--solid" : ""}`}>
      <div className="jth-nav__inner">
        <Link to="/" className="jth-brand">
          <span className="jth-brand__mark">JT</span>
          <span className="jth-brand__text">
            Jacob Truman <em>Homes</em>
          </span>
        </Link>
        <nav className="jth-nav__links">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="jth-nav__cta">
          <button className="jth-btn jth-btn--ghost" onClick={() => navigate("/listings?type=For+Rent")}>
            Buy / Rent
          </button>
          <button className="jth-btn jth-btn--primary" onClick={() => navigate("/sell")}>
            Sell with us
          </button>
        </div>
        <button className="jth-nav__burger" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="jth-nav__mobile">
          {links.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to="/sell" onClick={() => setOpen(false)}>Sell with us</Link>
          <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </header>
  );
}
