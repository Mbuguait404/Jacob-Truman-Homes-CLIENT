import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import Img from "./Img";
import Seal from "./Seal";
import ShareButton from "./ShareButton";
import { StatusBadge, SpecRow, WhatsAppIcon } from "./SmallBits";
import { formatPrice } from "../../utils/format";

const PHONE = "+254718806741";
const WA_NUMBER = "254718806741";

export default function ListingCard({ listing, size = "md" }) {
  const imageSrc = listing.images?.[0] || null;
  const imageSeed = !imageSrc ? (listing.seed || "default") : null;
  const waText = encodeURIComponent(
    `Hi Jacob Truman Properties, I would like to enquire about ${listing.title} (${listing.listingType}) in ${listing.neighborhood}, ${listing.city}.`
  );

  const cardUrl = typeof window !== "undefined" ? `${window.location.origin}/listings/${listing.id}` : "";
  const cardShareText = `${listing.title} — ${listing.listingType} in ${listing.neighborhood}, ${listing.city}`;

  return (
    <div className={`jth-card jth-card--${size}`}>
      <Link to={`/listings/${listing.id}`} className="jth-card__link">
        <div className="jth-card__media">
          <Img src={imageSrc} seed={imageSeed} w={900} h={size === "lg" ? 720 : 620} alt={listing.title} />
          <div className="jth-card__seal">
            <Seal size={54} />
          </div>
          <StatusBadge status={listing.status} />
        </div>
        <div className="jth-card__body">
          <div className="jth-card__top">
            <span className="jth-card__type">{listing.listingType}</span>
            <span className="jth-card__loc">
              <MapPin size={13} /> {listing.neighborhood}, {listing.city}
            </span>
          </div>
          <h3>{listing.title}</h3>
          <div className="jth-card__price">{formatPrice(listing.price, listing.listingType === "For Rent")}</div>
          <SpecRow listing={listing} compact />
        </div>
      </Link>
      <div className="jth-card__cta">
        <a href={`tel:${PHONE}`} className="jth-card__cta-btn jth-card__cta-btn--call" aria-label={`Call about ${listing.title}`}>
          <Phone size={15} /> Call now
        </a>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="jth-card__cta-btn jth-card__cta-btn--wa"
          aria-label={`WhatsApp about ${listing.title}`}
        >
          <WhatsAppIcon size={16} /> WhatsApp
        </a>
        <ShareButton iconOnly url={cardUrl} title={listing.title} text={cardShareText} className="jth-card__cta-share" />
      </div>
    </div>
  );
}
