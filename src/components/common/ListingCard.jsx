import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Img from "./Img";
import Seal from "./Seal";
import { StatusBadge, SpecRow } from "./SmallBits";
import { formatPrice } from "../../utils/format";

export default function ListingCard({ listing, size = "md" }) {
  return (
    <Link to={`/listings/${listing.id}`} className={`jth-card jth-card--${size}`}>
      <div className="jth-card__media">
        <Img seed={listing.seed} w={900} h={size === "lg" ? 720 : 620} alt={listing.title} />
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
  );
}
