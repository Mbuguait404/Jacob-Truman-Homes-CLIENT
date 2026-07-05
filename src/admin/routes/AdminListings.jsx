import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useListings } from "../../context/ListingsContext";
import { formatPrice } from "../../utils/format";

export default function AdminListings() {
  const { listings, deleteListing } = useListings();
  const navigate = useNavigate();

  return (
    <div>
      <div className="jth-admin__title-row">
        <h1 className="jth-admin__title">Listings</h1>
      </div>
      <div className="jth-admin__panel">
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
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${l.title}"? This can't be undone.`)) {
                        deleteListing(l.id);
                      }
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
