import React from "react";
import { Building2, TrendingUp, Users, Eye } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useListings } from "../../context/ListingsContext";

export default function AdminDashboard() {
  const { listings } = useListings();
  const total = listings.length;
  const available = listings.filter((l) => l.status === "Available").length;
  const sold = listings.filter((l) => l.status === "Sold").length;
  const forRent = listings.filter((l) => l.listingType === "For Rent").length;

  return (
    <div>
      <h1 className="jth-admin__title">Dashboard</h1>
      <div className="jth-admin__stats">
        <div className="jth-admin__stat">
          <Building2 size={18} />
          <strong>{total}</strong>
          <span>Total listings</span>
        </div>
        <div className="jth-admin__stat">
          <TrendingUp size={18} />
          <strong>{available}</strong>
          <span>Available</span>
        </div>
        <div className="jth-admin__stat">
          <Users size={18} />
          <strong>{forRent}</strong>
          <span>For rent</span>
        </div>
        <div className="jth-admin__stat">
          <Eye size={18} />
          <strong>{sold}</strong>
          <span>Sold</span>
        </div>
      </div>
      <div className="jth-admin__panel">
        <h3>Recent listings</h3>
        <table className="jth-admin__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.slice(0, 6).map((l) => (
              <tr key={l.id}>
                <td>{l.title}</td>
                <td>{l.city}</td>
                <td>{l.listingType}</td>
                <td>
                  <StatusBadge status={l.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
