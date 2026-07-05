import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Seal from "../common/Seal";

export default function Footer() {
  return (
    <footer className="jth-footer">
      <div className="jth-footer__top">
        <div className="jth-footer__brand">
          <Seal size={64} />
          <p>Residential sales, lettings and management across Nairobi and Eldoret, since 2011.</p>
        </div>
        <div className="jth-footer__col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/about">About &amp; Owner</Link>
          <Link to="/admin">Admin portal</Link>
        </div>
        <div className="jth-footer__col">
          <h4>Services</h4>
          <span>Buy with us</span>
          <span>Sell with us</span>
          <span>Rent &amp; management</span>
        </div>
        <div className="jth-footer__col">
          <h4>Contact</h4>
          <span><Phone size={14} /> +254 722 000 000</span>
          <span><Mail size={14} /> hello@jacobtrumanhomes.co.ke</span>
          <span><MapPin size={14} /> Kilimani, Nairobi · Elgon View, Eldoret</span>
        </div>
      </div>
      <div className="jth-footer__bottom">
        <span>© {new Date().getFullYear()} Jacob Truman Homes. All rights reserved.</span>
        <div className="jth-footer__social">
          <Instagram size={16} />
          <Facebook size={16} />
          <Linkedin size={16} />
        </div>
      </div>
    </footer>
  );
}
