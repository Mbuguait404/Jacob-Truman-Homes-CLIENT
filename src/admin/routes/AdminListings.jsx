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

function ListingCard({ listing, onPreview, onEdit, onDelete }) {
  return (
    <div className="jth-admin__card">
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Title</div>
          <div className="jth-admin__card-value">
            {listing.title}
            {listing.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
            {listing.featured && <span className="jth-admin__featured-badge">Featured</span>}
          </div>
        </div>
        <StatusBadge status={listing.status} />
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">City</div>
          <div className="jth-admin__card-value--muted">{listing.neighborhood}, {listing.city}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="jth-admin__card-label">Price</div>
          <div className="jth-admin__card-value--muted">{formatPrice(listing.price, listing.listingType === "For Rent")}</div>
        </div>
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Type</div>
          <div className="jth-admin__card-value--muted">{listing.listingType}</div>
        </div>
      </div>
      <div className="jth-admin__card-row">
        <div className="jth-admin__row-actions">
          <button onClick={() => onPreview(listing)}>
            <Eye size={12} /> Preview
          </button>
          <button onClick={() => onEdit(listing.id)}>
            <Pencil size={12} /> Edit
          </button>
          <button className="jth-admin__row-action--danger" onClick={() => onDelete(listing)}>
            <Trash2 size={12} /> Delete
          </button>
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
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "28%" }}>Title</th>
                  <th style={{ width: "15%" }}>City</th>
                  <th style={{ width: "12%" }}>Price</th>
                  <th style={{ width: "10%" }}>Type</th>
                  <th style={{ width: "12%" }}>Status</th>
                  <th style={{ width: "23%" }}>Actions</th>
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
                        <Eye size={12} /> Preview
                      </button>
                      <button onClick={() => navigate(`/admin/listings/${l.id}/edit`)} title="Edit">
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="jth-admin__row-action--danger" onClick={() => handleDelete(l)} title="Delete">
                        <Trash2 size={12} /> Delete
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

            <div className="jth-admin__cards">
              {listings.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  onPreview={setPreview}
                  onEdit={(id) => navigate(`/admin/listings/${id}/edit`)}
                  onDelete={handleDelete}
                />
              ))}
              {listings.length === 0 && <p>No listings yet.</p>}
            </div>
          </>
        )}
      </div>
      {preview && <PreviewModal listing={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
