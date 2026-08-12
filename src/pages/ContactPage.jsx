import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Clock, Send, Check, Instagram, Facebook } from "lucide-react";
import { Eyebrow } from "../components/common/SmallBits";
import RevealOnScroll from "../components/common/RevealOnScroll";
import FaqSection from "../components/common/FaqSection";
import PageHero from "../components/common/PageHero";
import { api } from "../api/client";
import { CONTACT_FAQS } from "../data/faqs";

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.696 15.51 2.035 12.165c.418-4.065 2.406-7.13 5.592-8.698.93-.442 1.93-.663 2.97-.663 1.052 0 1.977.196 2.746.58l-.017-.007c.142.073.27.153.386.24.228.174.455.393.67.653.147.225.26.475.331.742.018.208.028.42.028.636 0 2.03-.55 3.476-1.634 4.294-.6.443-1.357.71-2.15.766-.267 0-.526-.024-.776-.072-.388-.073-.75-.204-1.077-.387a2.26 2.26 0 01-.657-.699 2.18 2.18 0 01-.268-.578 2.45 2.45 0 01-.032-.43c0-.185.023-.363.066-.533.13-.37.352-.694.648-.95.228-.174.455-.393.67-.653.177-.03.357-.045.54-.045.16 0 .315.012.466.035.215.058.41.153.578.28.12.11.22.238.295.38.052.155.074.324.074.5 0 .176-.04.345-.113.5a1.26 1.26 0 01-.258.297 1.19 1.19 0 01-.34.177 1.17 1.17 0 01-.287.035 1.16 1.16 0 01-.29-.038 1.09 1.09 0 01-.31-.173 1.04 1.04 0 01-.19-.268.98.98 0 01-.052-.317c0-.114.023-.223.065-.324a.97.97 0 01.19-.237.94.94 0 01.266-.132.91.91 0 01.234-.03.9.9 0 01.234.033.87.87 0 01.24.14.83.83 0 01.153.21.78.78 0 01.04.24c0 .092-.018.18-.05.263a.75.75 0 01-.142.183.73.73 0 01-.2.103.71.71 0 01-.18.023.7.7 0 01-.18-.026.67.67 0 01-.19-.11.64.64 0 01-.117-.165.6.6 0 01-.03-.19c0-.07.013-.137.037-.2a.58.58 0 01.11-.138.56.56 0 01.156-.078.54.54 0 01.14.018.53.53 0 01.14.02.51.51 0 01.144.085.49.49 0 01.09.125.46.46 0 01.02.15c0 .05-.01.098-.026.143a.44.44 0 01-.083.104.42.42 0 01-.117.058.4.4 0 01-.103.013.39.39 0 01-.103-.015.37.37 0 01-.106-.06.35.35 0 01-.067-.1.33.33 0 01-.013-.116c0-.032.006-.063.017-.092a.31.31 0 01.062-.076.3.3 0 01.084-.04.28.28 0 01.072-.01.27.27 0 01.073.01.26.26 0 01.073.042.24.24 0 01.046.075.22.22 0 01.01.085c0 .017-.003.034-.008.05a.2.2 0 01-.04.05.19.19 0 01-.05.024.17.17 0 01-.044.006.16.16 0 01-.045-.007.15.15 0 01-.045-.025.13.13 0 01-.025-.044.11.11 0 01-.005-.045.1.1 0 01.006-.038.09.09 0 01.02-.024.08.08 0 01.022-.01.06.06 0 01.02 0 .05.05 0 01.02.003.04.04 0 01.013.01.02.02 0 01.005.015.01.01 0 010 .007z"/>
  </svg>
);

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const payload = {
      type: "buy",
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      email: form.elements.email.value || undefined,
      location: form.elements.subject.value || undefined,
      message: form.elements.message.value || undefined,
    };

    try {
      await api.post("/enquiries", payload);
      setSent(true);
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="jth-contact">
      {/* ── Hero ── */}
      <PageHero
        seed="jacob-truman-contact"
        eyebrow="Get in touch"
        title="We would love to hear from you."
        subtitle="Whether you are buying, selling, renting, or just exploring the market, our team is ready to help."
        badges={[
          { icon: <Phone size={14} />, label: "0718 806741" },
          { icon: <Mail size={14} />, label: "info@trumanproperties.com" },
          { icon: <Clock size={14} />, label: "Mon–Sat" },
        ]}
      />

      {/* ── Contact Info Cards ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-contact__info">
          <div className="jth-contact__card">
            <Phone size={22} />
            <h3>Phone</h3>
            <p>
              <a href="tel:+254718806741">0718 806741</a>
              <br />
              <a href="tel:+254100201010">0100 201010</a>
            </p>
          </div>
          <div className="jth-contact__card">
            <Mail size={22} />
            <h3>Email</h3>
            <p>
              <a href="mailto:info@trumanproperties.com">info@trumanproperties.com</a>
            </p>
          </div>
          <div className="jth-contact__card">
            <MapPin size={22} />
            <h3>Office</h3>
            <p>Nairobi, Kenya</p>
          </div>
          <div className="jth-contact__card">
            <Clock size={22} />
            <h3>Office Hours</h3>
            <p>
              Mon – Fri: 8:00 AM – 6:00 PM
              <br />
              Saturday: 9:00 AM – 2:00 PM
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Form + Quick Links ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-contact__main">
        <div className="jth-contact__form">
          <Eyebrow>Send a message</Eyebrow>
          <h2>Drop us a line</h2>

          {sent ? (
            <div className="jth-enquiry__success">
              <div className="jth-enquiry__success-icon">
                <Check size={32} />
              </div>
              <h3>Thank you — we've received this.</h3>
              <p>Someone from Jacob Truman Properties will be in touch shortly.</p>
              <Link className="jth-btn jth-btn--outline" to="/">
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Full name
                <input name="name" required placeholder="Your name" />
              </label>
              <div className="jth-contact__row">
                <label>
                  Phone
                  <input name="phone" required placeholder="+254 7..." />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@example.com" />
                </label>
              </div>
              <label>
                Subject
                <input name="subject" placeholder="e.g. Property inquiry, valuation request..." />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} placeholder="Tell us how we can help..." />
              </label>
              <button className="jth-btn jth-btn--primary jth-btn--block" type="submit" disabled={submitting}>
                <Send size={16} /> {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>

        <div className="jth-contact__cta">
          <h3>Quick links</h3>
          <p>Looking for something specific? Jump straight to:</p>
          <Link className="jth-btn jth-btn--outline jth-btn--block" to="/listings">
            Browse listings
          </Link>
          <Link className="jth-btn jth-btn--outline jth-btn--block" to="/sell">
            Sell your property
          </Link>
          <Link className="jth-btn jth-btn--outline jth-btn--block" to="/buy">
            Buy or rent
          </Link>
          <Link className="jth-btn jth-btn--outline jth-btn--block" to="/services">
            Our services
          </Link>

          <div className="jth-contact__social">
            <h3>Follow us</h3>
            <div className="jth-contact__social-row">
              <a href="https://www.instagram.com/jacobtrumanhomes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.threads.com/@jacobtrumanhomes" target="_blank" rel="noopener noreferrer" aria-label="Threads"><ThreadsIcon /></a>
              <a href="https://www.facebook.com/JackTrumanProperties/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>
        </div>
      </section>
      </RevealOnScroll>

      {/* ── FAQs ── */}
      <FaqSection eyebrow="Quick answers" title="Questions about getting in touch" items={CONTACT_FAQS} />
    </div>
  );
}
