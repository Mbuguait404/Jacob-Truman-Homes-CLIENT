import React, { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { ChevronLeft, MapPin, Check, ShieldCheck, Award, Phone, Mail } from "lucide-react";
import Img from "../components/common/Img";
import Seal from "../components/common/Seal";
import ShareButton from "../components/common/ShareButton";
import { StatusBadge, SpecRow, Eyebrow, WhatsAppIcon } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import RevealOnScroll from "../components/common/RevealOnScroll";
import FaqSection from "../components/common/FaqSection";
import { useListings } from "../context/ListingsContext";
import { PROPERTY_FAQS } from "../data/faqs";
import { formatPrice } from "../utils/format";
import Seo from "../components/common/Seo";
import { SITE } from "../config/site";

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

  const listingUrl =
    typeof window !== "undefined" ? `${window.location.origin}/listings/${listing.id}` : "";
  const listingShareText = `${listing.title} — ${listing.listingType} in ${listing.neighborhood}, ${listing.city}`;

  const priceText = formatPrice(listing.price);
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: listing.title,
    description: `${listing.title} — ${listing.listingType} in ${listing.neighborhood}, ${listing.city}. ${listing.beds} bed, ${listing.baths} bath, ${listing.area} m².`,
    url: `${SITE.url}/listings/${listing.id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.neighborhood,
      addressRegion: listing.city,
      addressCountry: "KE",
    },
    numberOfRooms: listing.beds,
    floorSize: { "@type": "QuantitativeValue", value: listing.area, unitCode: "MTK" },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: listing.price,
      availability:
        listing.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${SITE.url}/listings/${listing.id}`,
    },
  };

  return (
    <div className="jth-detail">
      <Seo
        title={`${listing.title} — ${listing.listingType} in ${listing.neighborhood}, ${listing.city}`}
        description={`${listing.listingType} in ${listing.neighborhood}, ${listing.city}. ${listing.beds} bed, ${listing.baths} bath, ${listing.area} m². ${priceText}. Verified by Jacob Truman Properties.`}
        path={`/listings/${listing.id}`}
        image={listing.images?.[0]}
        jsonLd={listingJsonLd}
      />
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
            <div className="jth-detail__title-actions">
              <StatusBadge status={listing.status} />
              <ShareButton url={listingUrl} title={listing.title} text={listingShareText} />
            </div>
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
            {/* <Link className="jth-btn jth-btn--outline jth-btn--block" to="/about">
              Talk to the Agent
            </Link> */}
            <div className="jth-price-card__cta-row">
              <a className="jth-btn jth-btn--cta jth-btn--cta-call" href="tel:+254718806741">
                <Phone size={15} /> Call now
              </a>
              <a
                className="jth-btn jth-btn--cta jth-btn--cta-wa"
                href={`https://wa.me/254718806741?text=${encodeURIComponent(
                  `Hi Jacob Truman Properties, I would like to enquire about ${listing.title} (${listing.listingType}) in ${listing.neighborhood}, ${listing.city}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={15} /> WhatsApp
              </a>
            </div>
            <div className="jth-divider" />
            <div className="jth-price-card__agent">
              <Img src="/jack_truman.png" w={100} h={100} alt="Jacob Truman, Principal Agent" className="jth-price-card__avatar" />
              <div>
                <strong>Jacob Truman</strong>
                <span>Principal agent</span>
              </div>
            </div>
            <div className="jth-price-card__contact">
              <span><Phone size={14} /> 0718 806741 | 0100201010</span>
              <span><Mail size={14} /> <a href="mailto:info.trumanproperties@gmail.com">info.trumanproperties@gmail.com</a></span>
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

      <FaqSection eyebrow="About this property" title="Frequently asked questions" items={PROPERTY_FAQS} />

      {related.length > 0 && (
        <RevealOnScroll delay={100}>
          <section className="jth-section">
            <Eyebrow>Related homes</Eyebrow>
            <h2>More in {listing.city}</h2>
            <div className="jth-listings-grid">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        </RevealOnScroll>
      )}
    </div>
  );
}
