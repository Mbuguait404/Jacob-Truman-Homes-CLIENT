import React, { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { Eyebrow, WhatsAppIcon } from "./SmallBits";

export default function FaqSection({ eyebrow = "FAQs", title = "Frequently asked questions", items }) {
  const [open, setOpen] = useState(0);

  return (
    <RevealOnScroll delay={100}>
      <section className="jth-section jth-faq">
        <div className="jth-section__head">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="jth-faq__list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`jth-faq__item ${isOpen ? "jth-faq__item--open" : ""}`}>
                <button
                  type="button"
                  className="jth-faq__q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="jth-faq__chevron" />
                </button>
                {isOpen && <div className="jth-faq__a">{item.a}</div>}
              </div>
            );
          })}
        </div>
        <div className="jth-faq__cta">
          <span>Still have a question?</span>
          <div>
            <a className="jth-btn jth-btn--outline jth-btn--cta-call" href="tel:+254718806741">
              <Phone size={15} /> Call us
            </a>
            <a
              className="jth-btn jth-btn--outline jth-btn--cta-wa"
              href="https://wa.me/254718806741?text=Hi%20Jacob%20Truman%20Properties,%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={15} /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
