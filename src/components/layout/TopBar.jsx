import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "../common/SmallBits";

export default function TopBar() {
  return (
    <div className="jth-topbar">
      <div className="jth-topbar__inner">
        <div className="jth-topbar__left">
          <a className="jth-topbar__item" href="tel:+254718806741">
            <Phone size={13} /> 0718 806741
          </a>
          <span className="jth-topbar__sep" aria-hidden="true" />
          <a className="jth-topbar__item" href="tel:+254100201010">
            <Phone size={13} /> 0100 201010
          </a>
          <a className="jth-topbar__item" href="mailto:info@trumanproperties.com">
            <Mail size={13} /> info@trumanproperties.com
          </a>
          <span className="jth-topbar__item jth-topbar__item--muted">
            <MapPin size={13} /> Nairobi, Kenya
          </span>
        </div>
        <div className="jth-topbar__right">
          <span className="jth-topbar__item jth-topbar__item--muted">
            <Clock size={13} /> Mon–Fri 8:00–18:00 · Sat 9:00–14:00
          </span>
          <a
            className="jth-topbar__whatsapp"
            href="https://wa.me/254718806741?text=Hi%20Jacob%20Truman%20Properties."
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
