import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Instagram, Facebook } from "lucide-react";
import Seal from "../common/Seal";
import { TikTokIcon } from "../common/SmallBits";

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.696 15.51 2.035 12.165c.418-4.065 2.406-7.13 5.592-8.698.93-.442 1.93-.663 2.97-.663 1.052 0 1.977.196 2.746.58l-.017-.007c.142.073.27.153.386.24.228.174.455.393.67.653.147.225.26.475.331.742.018.208.028.42.028.636 0 2.03-.55 3.476-1.634 4.294-.6.443-1.357.71-2.15.766-.267 0-.526-.024-.776-.072-.388-.073-.75-.204-1.077-.387a2.26 2.26 0 01-.657-.699 2.18 2.18 0 01-.268-.578 2.45 2.45 0 01-.032-.43c0-.185.023-.363.066-.533.13-.37.352-.694.648-.95.228-.174.455-.393.67-.653.177-.03.357-.045.54-.045.16 0 .315.012.466.035.215.058.41.153.578.28.12.11.22.238.295.38.052.155.074.324.074.5 0 .176-.04.345-.113.5a1.26 1.26 0 01-.258.297 1.19 1.19 0 01-.34.177 1.17 1.17 0 01-.287.035 1.16 1.16 0 01-.29-.038 1.09 1.09 0 01-.31-.173 1.04 1.04 0 01-.19-.268.98.98 0 01-.052-.317c0-.114.023-.223.065-.324a.97.97 0 01.19-.237.94.94 0 01.266-.132.91.91 0 01.234-.03.9.9 0 01.234.033.87.87 0 01.24.14.83.83 0 01.153.21.78.78 0 01.04.24c0 .092-.018.18-.05.263a.75.75 0 01-.142.183.73.73 0 01-.2.103.71.71 0 01-.18.023.7.7 0 01-.18-.026.67.67 0 01-.19-.11.64.64 0 01-.117-.165.6.6 0 01-.03-.19c0-.07.013-.137.037-.2a.58.58 0 01.11-.138.56.56 0 01.156-.078.54.54 0 01.14.018.53.53 0 01.14.02.51.51 0 01.144.085.49.49 0 01.09.125.46.46 0 01.02.15c0 .05-.01.098-.026.143a.44.44 0 01-.083.104.42.42 0 01-.117.058.4.4 0 01-.103.013.39.39 0 01-.103-.015.37.37 0 01-.106-.06.35.35 0 01-.067-.1.33.33 0 01-.013-.116c0-.032.006-.063.017-.092a.31.31 0 01.062-.076.3.3 0 01.084-.04.28.28 0 01.072-.01.27.27 0 01.073.01.26.26 0 01.073.042.24.24 0 01.046.075.22.22 0 01.01.085c0 .017-.003.034-.008.05a.2.2 0 01-.04.05.19.19 0 01-.05.024.17.17 0 01-.044.006.16.16 0 01-.045-.007.15.15 0 01-.045-.025.13.13 0 01-.025-.044.11.11 0 01-.005-.045.1.1 0 01.006-.038.09.09 0 01.02-.024.08.08 0 01.022-.01.06.06 0 01.02 0 .05.05 0 01.02.003.04.04 0 01.013.01.02.02 0 01.005.015.01.01 0 010 .007z"/>
  </svg>
);

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
          <Link to="/developments">Developments</Link>
          <Link to="/about#services">Services</Link>
          <Link to="/about">About &amp; Owner</Link>
          <Link to="/blogs">Blog</Link>
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
          <a href="https://www.instagram.com/jacobtrumanhomes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://www.threads.com/@jacobtrumanhomes" target="_blank" rel="noopener noreferrer" aria-label="Threads"><ThreadsIcon /></a>
          <a href="https://www.facebook.com/JackTrumanProperties/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="https://www.tiktok.com/@jacobtrumanhomes" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
