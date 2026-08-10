import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Loader2, Eye, X, MapPin, ImageOff } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useListings } from "../../context/ListingsContext";
import { formatPrice } from "../../utils/format";

function PreviewModal({ listing, onClose }) {
  if (!listing) return null;
  const gallery = listing.images?.length
    ? listing.images
    : [listing.seed, `${listing.seed}-b`, `${listing.seed}-c`, `${listing.seed}-d`].filter(Boolean);

  return (
    <div className="jth-admin__modal-backdrop" onClick={onClose}>
      <div className="jth-admin__modal" onClick={(e) => e.stopPropagation()}>
        <div className="jth-admin__modal-header">
          <h3>{listing.title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="jth-admin__modal-body">
          <div className="jth-admin__modal-meta">
            <span><MapPin size={13} /> {listing.neighborhood}, {listing.city}</span>
            <span>{formatPrice(listing.price, listing.listingType === "For Rent")}</span>
            <span>{listing.listingType}</span>
            <StatusBadge status={listing.status} />
          </div>
          <p className="jth-admin__modal-desc">{listing.description}</p>
          {gallery.length > 0 ? (
            <div className="jth-admin__modal-gallery">
              {gallery.map((src, i) => (
                <div key={i} className="jth-admin__modal-thumb">
                  <img src={src} alt={`${listing.title} ${i + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="jth-admin__modal-empty">
              <ImageOff size={24} /> No images
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminListings() {
  const { listings, deleteListing, loading } = useListings();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleDelete = async (l) => {
    if (!window.confirm(`Delete "${l.title}"? This can't be undone.`)) return;
    try {
      await deleteListing(l.id);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="jth-admin__title-row">
        <h1 className="jth-admin__title">Listings</h1>
      </div>
      <div className="jth-admin__panel">
        {loading ? (
          <div className="jth-admin__loading">
            <Loader2 size={20} className="jth-spin" /> Loading listings…
          </div>
        ) : (
          <table className="jth-admin__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className={l.hidden ? "jth-admin__row--hidden" : ""}>
                  <td>
                    {l.title}
                    {l.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
                    {l.featured && <span className="jth-admin__featured-badge">Featured</span>}
                  </td>
                  <td>{l.neighborhood}, {l.city}</td>
                  <td>{formatPrice(l.price, l.listingType === "For Rent")}</td>
                  <td>{l.listingType}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="jth-admin__row-actions">
                    <button onClick={() => setPreview(l)} title="Preview">
                      <Eye size={15} />
                    </button>
                    <button onClick={() => navigate(`/admin/listings/${l.id}/edit`)} title="Edit">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(l)} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && (
                <tr>
                  <td colSpan="6">No listings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {preview && <PreviewModal listing={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
