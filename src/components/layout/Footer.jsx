import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Instagram, Facebook, Linkedin } from "lucide-react";
import Seal from "../common/Seal";

export default function Footer() {
  return (
    <footer className="jth-footer">
      <div className="jth-footer__top">
        <div className="jth-footer__brand">
          <Seal size={64} />
          <p>Trusted real estate company specializing in the sale, letting, management, and investment advisory of residential, commercial, and land properties across Kenya.</p>
        </div>
        <div className="jth-footer__col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About &amp; Owner</Link>
          <Link to="/contact">Contact</Link>
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
          <span>Property Valuation Support</span>
          <span>Project Marketing for Developers</span>
        </div>
        <div className="jth-footer__col">
          <h4>Contact</h4>
          <span><Phone size={14} /> 0718 806741 | 0100201010</span>
          <span><Mail size={14} /> <a href="mailto:info@trumanproperties.com">info@trumanproperties.com</a></span>
          <span><Globe size={14} /> <a href="http://www.trumanproperties.com" target="_blank" rel="noopener noreferrer">www.trumanproperties.com</a></span>
          <span><MapPin size={14} /> Nairobi, Kenya</span>
        </div>
      </div>
      <div className="jth-footer__bottom">
        <span>© {new Date().getFullYear()} Jacob Truman Properties. All rights reserved.</span>
        <div className="jth-footer__social">
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
