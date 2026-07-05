import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";

export default function EnquiryPage({ mode }) {
  const [sent, setSent] = useState(false);
  const isSell = mode === "sell";

  return (
    <div className="jth-enquiry">
      <div className="jth-enquiry__side">
        <Eyebrow>{isSell ? "Sell with us" : "Buy or rent with us"}</Eyebrow>
        <h1>{isSell ? "Tell us about your home" : "Tell us what you're looking for"}</h1>
        <p>
          {isSell
            ? "A member of our team will call within one business day to arrange a free valuation."
            : "Share your brief and we'll shortlist matching homes across Nairobi and Eldoret."}
        </p>
        <Img seed={isSell ? "sell-enquiry" : "buy-enquiry"} w={800} h={600} />
      </div>
      <div className="jth-enquiry__form">
        {sent ? (
          <div className="jth-enquiry__success">
            <Check size={28} />
            <h3>Thank you — we've received this.</h3>
            <p>Someone from Jacob Truman Homes will be in touch shortly.</p>
            <Link className="jth-btn jth-btn--outline" to="/">
              Back to home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Full name
              <input required placeholder="Your name" />
            </label>
            <label>
              Phone
              <input required placeholder="+254 7..." />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              {isSell ? "Property location" : "Preferred city / area"}
              <input placeholder="e.g. Karen, Nairobi" />
            </label>
            <label>
              {isSell ? "Tell us about the property" : "What are you looking for?"}
              <textarea rows={4} placeholder={isSell ? "Bedrooms, size, condition..." : "Budget, bedrooms, timeline..."} />
            </label>
            <button className="jth-btn jth-btn--primary jth-btn--block" type="submit">
              Submit enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
