import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useListings } from "../../context/ListingsContext";
import { formatPrice } from "../../utils/format";

export default function AdminListings() {
  const { listings, deleteListing, loading } = useListings();
  const navigate = useNavigate();

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
                <tr key={l.id}>
                  <td>{l.title}</td>
                  <td>{l.neighborhood}, {l.city}</td>
                  <td>{formatPrice(l.price, l.listingType === "For Rent")}</td>
                  <td>{l.listingType}</td>
                  <td>
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="jth-admin__row-actions">
                    <button onClick={() => navigate(`/admin/listings/${l.id}/edit`)}>
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(l)}>
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
    </div>
  );
}
