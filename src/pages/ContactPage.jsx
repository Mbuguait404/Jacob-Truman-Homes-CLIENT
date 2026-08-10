import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Clock, Send, Check } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import { api } from "../api/client";

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
      <section className="jth-contact__hero">
        <div className="jth-contact__hero-text">
          <Eyebrow>Get in touch</Eyebrow>
          <h1>We would love to hear from you.</h1>
          <p>Whether you are buying, selling, renting, or just exploring the market, our team is ready to help.</p>
        </div>
        <Img seed="contact-hero" w={900} h={600} />
      </section>

      {/* ── Contact Info Cards ── */}
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

      {/* ── Form + Quick Links ── */}
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
              <a href="#" aria-label="Instagram"><Globe size={18} /></a>
              <a href="#" aria-label="Facebook"><Globe size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Globe size={18} /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
