import React, { useState, useEffect } from "react";
import { Mail, Eye, CheckCircle, XCircle } from "lucide-react";
import { api } from "../../api/client";

const STATUS_LABELS = {
  new: { color: "#b45309", bg: "#fff7ed", label: "New" },
  contacted: { color: "#1d4ed8", bg: "#eff6ff", label: "Contacted" },
  closed: { color: "#15803d", bg: "#f0fdf4", label: "Closed" },
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); // 'sell' | 'buy' | ''

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const query = filter ? `?type=${filter}` : "";
      const data = await api.get(`/enquiries${query}`);
      setEnquiries(data || []);
    } catch (err) {
      console.error("Failed to load enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiries/${id}`, { status });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  return (
    <div>
      <div className="jth-admin__title-row">
        <h1 className="jth-admin__title">Enquiries</h1>
        <div className="jth-admin__filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All types</option>
            <option value="sell">Sell</option>
            <option value="buy">Buy</option>
          </select>
        </div>
      </div>
      <div className="jth-admin__panel">
        {loading ? (
          <p>Loading enquiries…</p>
        ) : enquiries.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          <table className="jth-admin__table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Listing</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => {
                const st = STATUS_LABELS[e.status] || STATUS_LABELS.new;
                return (
                  <tr key={e._id}>
                    <td>
                      <span
                        style={{
                          textTransform: "uppercase",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          color: e.type === "sell" ? "#991b1b" : "#1e40af",
                          background: e.type === "sell" ? "#fef2f2" : "#eff6ff",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {e.type}
                      </span>
                    </td>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.email || "—"}</td>
                    <td>{e.location || "—"}</td>
                    <td>{e.listing ? `${e.listing.title} (${e.listing.city})` : "—"}</td>
                    <td>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: st.color,
                          background: st.bg,
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="jth-admin__row-actions">
                      {e.status !== "contacted" && (
                        <button title="Mark contacted" onClick={() => updateStatus(e._id, "contacted")}>
                          <Eye size={15} />
                        </button>
                      )}
                      {e.status !== "closed" && (
                        <button title="Mark closed" onClick={() => updateStatus(e._id, "closed")}>
                          <CheckCircle size={15} />
                        </button>
                      )}
                      {e.status !== "new" && (
                        <button title="Re-open" onClick={() => updateStatus(e._id, "new")}>
                          <XCircle size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
