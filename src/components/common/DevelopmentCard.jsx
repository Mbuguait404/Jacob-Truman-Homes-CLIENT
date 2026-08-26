import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";
import Img from "./Img";
import Seal from "./Seal";
import { StatusBadge } from "./SmallBits";
import { formatPrice } from "../../utils/format";

export default function DevelopmentCard({ development }) {
  const imageSrc = development.images?.[0] || null;
  const minPrice = development.unitTypes?.length
    ? Math.min(...development.unitTypes.map((u) => u.priceFrom || Infinity))
    : null;

  return (
    <div className="jth-card jth-dev-card">
      <Link to={`/developments/${development.id}`} className="jth-card__link">
        <div className="jth-card__media">
          <Img src={imageSrc} seed={development.slug || "development"} w={900} h={620} alt={development.title} />
          <div className="jth-card__seal">
            <Seal size={54} />
          </div>
          <StatusBadge status={development.status} />
        </div>
        <div className="jth-card__body">
          <div className="jth-card__top">
            <span className="jth-card__type">{development.developer}</span>
            <span className="jth-card__loc">
              <MapPin size={13} /> {development.neighborhood}, {development.city}
            </span>
          </div>
          <h3>{development.title}</h3>
          <div className="jth-dev-card__meta">
            <span><Building2 size={14} /> {development.unitTypes?.length || 0} unit types</span>
          </div>
          {minPrice != null && minPrice !== Infinity && (
            <div className="jth-card__price">From {formatPrice(minPrice, false)}</div>
          )}
        </div>
      </Link>
    </div>
  );
}
