import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, X } from "lucide-react";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ["/", "Home"],
    ["/listings", "Listings"],
    ["/services", "Services"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  const isHome = location.pathname === "/";
  const onHero = isHome && !scrolled;

  return (
    <>
      <header className={`jth-nav ${scrolled || !isHome ? "jth-nav--solid" : ""} ${onHero ? "jth-nav--on-hero" : ""}`}>
        <div className="jth-nav__inner">
          <Link to="/" className="jth-brand">
            <span className="jth-brand__mark">JT</span>
            <span className="jth-brand__text">
              Jacob Truman <em>Properties</em>
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

          <button
            className={`jth-nav__burger ${open ? "jth-nav__burger--open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`jth-nav__overlay ${open ? "jth-nav__overlay--open" : ""}`}>
        <button
          className="jth-nav__overlay-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <div className="jth-nav__overlay-inner">
          <nav className="jth-nav__overlay-links">
            {links.map(([to, label], i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={location.pathname === to ? "active" : ""}
                style={{ animationDelay: `${i * 60 + 80}ms` }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/sell"
              onClick={() => setOpen(false)}
              className="jth-nav__overlay-cta"
              style={{ animationDelay: `${links.length * 60 + 80}ms` }}
            >
              Sell with us
            </Link>
          </nav>

          <div className="jth-nav__overlay-contact">
            <div className="jth-nav__overlay-contact-row">
              <Phone size={16} />
              <span>0718 806741 | 0100201010</span>
            </div>
            <div className="jth-nav__overlay-contact-row">
              <Mail size={16} />
              <a href="mailto:info@trumanproperties.com">info@trumanproperties.com</a>
            </div>
            <div className="jth-nav__overlay-contact-row">
              <MapPin size={16} />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
