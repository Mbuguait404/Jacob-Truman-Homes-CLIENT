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
          <p>Trusted real estate company specializing in sale, letting, management and investment advisory across Kenya.</p>
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
          <span>Property Sales</span>
          <span>Residential &amp; Commercial Letting</span>
          <span>Property Management</span>
          <span>Land Sales</span>
          <span>Investment Consultancy</span>
          <span>Property Marketing</span>
        </div>
        <div className="jth-footer__col">
          <h4>Contact</h4>
          <span><Phone size={14} /> 0718 806741 | 0100201010</span>
          <span><Mail size={14} /> info@trumanproperties.com</span>
          <span><MapPin size={14} /> Nairobi, Kenya</span>
        </div>
      </div>
      <div className="jth-footer__bottom">
        <span>© {new Date().getFullYear()} Jacob Truman Properties. All rights reserved.</span>
        <div className="jth-footer__social">
          <Instagram size={16} />
          <Facebook size={16} />
          <Linkedin size={16} />
        </div>
      </div>
    </footer>
  );
}
