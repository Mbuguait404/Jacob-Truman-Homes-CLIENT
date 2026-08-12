import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Send, Phone, Mail, Globe, MapPin, Home } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import RevealOnScroll from "../components/common/RevealOnScroll";
import { api } from "../api/client";
import { useListings } from "../context/ListingsContext";

export default function EnquiryPage({ mode }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isSell = mode === "sell";

  const [searchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");
  const service = searchParams.get("service") || undefined;
  const { listings } = useListings();

  const listing = useMemo(
    () => listings.find((l) => String(l.id) === listingId),
    [listings, listingId]
  );

  const defaultLocation = listing
    ? `${listing.neighborhood}, ${listing.city}`
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const payload = {
      type: mode,
      service,
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      email: form.elements.email.value || undefined,
      location: form.elements.location.value || undefined,
      message: form.elements.message.value || undefined,
      listing: listingId || undefined,
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
    <RevealOnScroll delay={80}>
    <div className="jth-enquiry">
      <div className="jth-enquiry__side">
        <div className="jth-enquiry__side-text">
          <Eyebrow>{isSell ? "Sell with us" : "Buy or rent with us"}</Eyebrow>
          <h1>
            {listing
              ? `Enquire about ${listing.title}`
              : isSell
              ? "Tell us about your home"
              : "Tell us what you're looking for"}
          </h1>
          <p>
            {listing
              ? "Complete the form below and we'll get back to you about this property."
              : isSell
              ? "A member of our team will call within one business day to arrange a free valuation."
              : "Share your brief and we'll shortlist matching properties across Kenya."}
          </p>
        </div>
        <div className="jth-enquiry__side-visual">
          <Img seed={isSell ? "sell-enquiry" : "buy-enquiry"} w={800} h={600} />
          <div className="jth-enquiry__contact-box">
            <div className="jth-enquiry__contact-row">
              <Phone size={16} />
              <span>0718 806741 | 0100201010</span>
            </div>
            <div className="jth-enquiry__contact-row">
              <Mail size={16} />
              <span>info@trumanproperties.com</span>
            </div>
            <div className="jth-enquiry__contact-row">
              <Globe size={16} />
              <span>www.trumanproperties.com</span>
            </div>
            <div className="jth-enquiry__contact-row">
              <MapPin size={16} />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jth-enquiry__form">
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
            {service && !listing && (
              <div className="jth-enquiry__service-ref">
                <Globe size={18} />
                <div>
                  <strong>{service}</strong>
                  <span>Enquiry about this service</span>
                </div>
              </div>
            )}
            {listing && (
              <div className="jth-enquiry__listing-ref">
                <Home size={18} />
                <div>
                  <strong>{listing.title}</strong>
                  <span>{listing.neighborhood}, {listing.city}</span>
                </div>
                <Link to={`/listings/${listing.id}`}>View</Link>
              </div>
            )}
            <label>
              Full name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Phone
              <input name="phone" required placeholder="+254 7..." />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" />
            </label>
            <label>
              {isSell ? "Property location" : "Preferred city / area"}
              <input
                name="location"
                placeholder="e.g. Karen, Nairobi"
                defaultValue={defaultLocation}
              />
            </label>
            <label>
              {isSell ? "Tell us about the property" : "What are you looking for?"}
              <textarea name="message" rows={4} placeholder={isSell ? "Bedrooms, size, condition..." : "Budget, bedrooms, timeline..."} />
            </label>
            <button className="jth-btn jth-btn--primary jth-btn--block" type="submit" disabled={submitting}>
              <Send size={16} /> {submitting ? "Sending…" : "Submit enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
    </RevealOnScroll>
  );
}
