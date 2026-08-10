import React, { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { ChevronLeft, MapPin, Check, ShieldCheck, Award, Phone, Mail } from "lucide-react";
import Img from "../components/common/Img";
import Seal from "../components/common/Seal";
import { StatusBadge, SpecRow, Eyebrow } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import { useListings } from "../context/ListingsContext";
import { formatPrice } from "../utils/format";

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { visibleListings } = useListings();
  const [activeImg, setActiveImg] = useState(0);

  const listing = visibleListings.find((l) => String(l.id) === id);
  if (!listing) return <Navigate to="/listings" replace />;

  const gallery = listing.images?.length
    ? listing.images
    : [listing.seed, `${listing.seed}-b`, `${listing.seed}-c`, `${listing.seed}-d`].filter(Boolean);

  const related = visibleListings.filter((l) => l.id !== listing.id && l.city === listing.city).slice(0, 3);

  return (
    <div className="jth-detail">
      <button className="jth-back" onClick={() => navigate("/listings")}>
        <ChevronLeft size={16} /> Back to listings
      </button>

      <div className="jth-detail__gallery">
        <div className="jth-detail__hero-img">
          <Img src={gallery[activeImg]} w={1400} h={900} alt={listing.title} loading="eager" />
          <div className="jth-detail__seal">
            <Seal size={74} />
          </div>
          <div className="jth-detail__gallery-badge">
            {activeImg + 1} / {gallery.length}
          </div>
        </div>
        <div className="jth-detail__thumbs">
          {gallery.map((s, i) => (
            <button key={s + i} className={i === activeImg ? "active" : ""} onClick={() => setActiveImg(i)}>
              <Img src={s} w={300} h={220} />
            </button>
          ))}
        </div>
      </div>

      <div className="jth-detail__layout">
        <div className="jth-detail__main">
          <div className="jth-detail__title-row">
            <div>
              <span className="jth-card__type">{listing.listingType}</span>
              <h1>{listing.title}</h1>
              <span className="jth-card__loc">
                <MapPin size={14} /> {listing.neighborhood}, {listing.city}
              </span>
            </div>
            <StatusBadge status={listing.status} />
          </div>

          <SpecRow listing={listing} />

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">About this home</h3>
          <p className="jth-detail__desc">{listing.description}</p>

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">Features &amp; amenities</h3>
          <div className="jth-amenities">
            {listing.amenities.map((a) => (
              <div key={a} className="jth-amenities__item">
                <Check size={15} /> {a}
              </div>
            ))}
          </div>

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">Location</h3>
          <div className="jth-map-placeholder">
            <MapPin size={22} />
            <span>{listing.neighborhood}, {listing.city}</span>
          </div>
        </div>

        <aside className="jth-detail__sidebar">
          <div className="jth-price-card">
            <div className="jth-price-card__header">
              <span className="jth-price-card__type">{listing.listingType}</span>
              <div className="jth-price-card__price">{formatPrice(listing.price, listing.listingType === "For Rent")}</div>
              <StatusBadge status={listing.status} />
            </div>
            <Link className="jth-btn jth-btn--primary jth-btn--block" to={`/buy?listingId=${listing.id}`}>
              {listing.listingType === "For Rent" ? "Enquire to rent" : "Enquire to buy"}
            </Link>
            <Link className="jth-btn jth-btn--outline jth-btn--block" to="/about">
              Talk to the owner
            </Link>
            <div className="jth-divider" />
            <div className="jth-price-card__agent">
              <Img seed="owner-jacob" w={100} h={100} className="jth-price-card__avatar" />
              <div>
                <strong>Jacob Truman</strong>
                <span>Principal agent</span>
              </div>
            </div>
            <div className="jth-price-card__contact">
              <span><Phone size={14} /> 0718 806741 | 0100201010</span>
              <span><Mail size={14} /> <a href="mailto:info@trumanproperties.com">info@trumanproperties.com</a></span>
            </div>
          </div>
          <div className="jth-trust-card">
            <ShieldCheck size={18} />
            <span>Verified listing, inspected by our team within the last 14 days.</span>
          </div>
          <div className="jth-trust-card jth-trust-card--dark">
            <Award size={18} />
            <span>Priced competitively based on current market analysis.</span>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="jth-section">
          <Eyebrow>Related homes</Eyebrow>
          <h2>More in {listing.city}</h2>
          <div className="jth-listings-grid">
            {related.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
