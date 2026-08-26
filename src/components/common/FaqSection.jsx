import React, { useState } from "react";
import { Phone, Plus, Minus } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { Eyebrow, WhatsAppIcon } from "./SmallBits";

export default function FaqSection({ eyebrow = "FAQs", title = "Frequently asked questions", items }) {
  const [open, setOpen] = useState(0);

  return (
    <RevealOnScroll delay={100}>
      <section className="jth-section jth-faq">
        <div className="jth-faq__layout">
          <aside className="jth-faq__aside">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="jth-faq__title">{title}</h2>
            <p className="jth-faq__intro">
              Can't find what you're looking for? Our team is a call or WhatsApp away — we'll give you a straight answer, no obligation.
            </p>
            <div className="jth-faq__contact">
              <a className="jth-btn jth-btn--primary" href="tel:+254718806741">
                <Phone size={15} /> Call us
              </a>
              <a
                className="jth-btn jth-btn--outline"
                href="https://wa.me/254718806741?text=Hi%20Jacob%20Truman%20Properties,%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={15} /> WhatsApp us
              </a>
            </div>
          </aside>

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
                    <span className="jth-faq__toggle" aria-hidden="true">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div className="jth-faq__panel">
                    <div className="jth-faq__panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
