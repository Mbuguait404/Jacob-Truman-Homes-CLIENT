import React, { useState, useEffect } from "react";
import { FileText, PhoneCall, CheckCircle2, RotateCcw, X, Mail, Phone, MapPin, Home } from "lucide-react";
import { api } from "../../api/client";
import { Spinner } from "../../components/common/Spinner";

export const STATUS_LABELS = {
  new: { color: "#b45309", bg: "#fff7ed", label: "New" },
  contacted: { color: "#1d4ed8", bg: "#eff6ff", label: "Contacted" },
  closed: { color: "#15803d", bg: "#f0fdf4", label: "Closed" },
};

const SERVICES = [
  "Property Management",
  "Land Sales",
  "Investment Consultancy",
  "Property Marketing",
  "Property Valuation Support",
  "Project Marketing for Developers",
];

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

function TypeBadge({ type }) {
  return (
    <span
      style={{
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "uppercase",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        color: type === "sell" ? "#991b1b" : "#1e40af",
        background: type === "sell" ? "#fef2f2" : "#eff6ff",
        padding: "2px 8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      {type}
    </span>
  );
}

function StatusPill({ status }) {
  const st = STATUS_LABELS[status] || STATUS_LABELS.new;
  return (
    <span
      style={{
        fontSize: "12px",
        fontWeight: 500,
        color: st.color,
        background: st.bg,
        padding: "2px 8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      {st.label}
    </span>
  );
}

function ServiceBadge({ service }) {
  if (!service) return <span>—</span>;
  return (
    <span
      style={{
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "11px",
        fontWeight: 600,
        color: "#6b21a8",
        background: "#faf5ff",
        padding: "2px 8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      {service}
    </span>
  );
}

function EnquiryCard({ e, onSelect, onUpdateStatus, updating }) {
  return (
    <div className="jth-admin__card">
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Name</div>
          <div className="jth-admin__card-value">{e.name}</div>
        </div>
        <StatusPill status={e.status} />
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Phone</div>
          <div className="jth-admin__card-value">{e.phone}</div>
        </div>
        <div className="jth-admin__card-value--muted">{formatDate(e.createdAt)}</div>
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Type</div>
          <TypeBadge type={e.type} />
        </div>
        {e.service && (
          <div style={{ textAlign: "right" }}>
            <div className="jth-admin__card-label">Service</div>
            <ServiceBadge service={e.service} />
          </div>
        )}
      </div>
      {e.message && (
        <div className="jth-admin__card-row">
          <div>
            <div className="jth-admin__card-label">Message</div>
            <div className="jth-admin__card-value--muted">{e.message}</div>
          </div>
        </div>
      )}
      <div className="jth-admin__card-row">
        <div className="jth-admin__row-actions">
          <button onClick={() => onSelect(e)} disabled={updating}>
            <FileText size={12} /> View
          </button>
          {e.status !== "contacted" && (
            <button onClick={() => onUpdateStatus(e.id, "contacted")} disabled={updating}>
              {updating ? <Spinner size={12} /> : <PhoneCall size={12} />} Contact
            </button>
          )}
          {e.status !== "closed" && (
            <button onClick={() => onUpdateStatus(e.id, "closed")} disabled={updating}>
              {updating ? <Spinner size={12} /> : <CheckCircle2 size={12} />} Close
            </button>
          )}
          {e.status !== "new" && (
            <button onClick={() => onUpdateStatus(e.id, "new")} disabled={updating}>
              {updating ? <Spinner size={12} /> : <RotateCcw size={12} />} Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filter) params.set("type", filter);
      if (serviceFilter) params.set("service", serviceFilter);
      const query = params.toString();
      const data = await api.get(`/enquiries${query ? `?${query}` : ""}`);
      setEnquiries(data || []);
    } catch (err) {
      setError(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filter, serviceFilter]);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.patch(`/enquiries/${id}`, { status });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusActions = (e) => {
    const pending = updatingId === e.id;
    return (
      <div className="jth-admin__row-actions">
        {e.status !== "contacted" && (
          <button title="Mark as contacted" onClick={() => updateStatus(e.id, "contacted")} disabled={pending}>
            {pending ? <Spinner size={12} /> : <PhoneCall size={12} />} Contact
          </button>
        )}
        {e.status !== "closed" && (
          <button title="Mark as closed" onClick={() => updateStatus(e.id, "closed")} disabled={pending}>
            {pending ? <Spinner size={12} /> : <CheckCircle2 size={12} />} Close
          </button>
        )}
        {e.status !== "new" && (
          <button title="Re-open as new" onClick={() => updateStatus(e.id, "new")} disabled={pending}>
            {pending ? <Spinner size={12} /> : <RotateCcw size={12} />} Reopen
          </button>
        )}
      </div>
    );
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
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
            <option value="">All services</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="jth-admin__panel">
        {loading ? (
          <p>Loading enquiries…</p>
        ) : error ? (
          <p style={{ color: "#991b1b" }}>{error}</p>
        ) : enquiries.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "7%" }}>Type</th>
                  <th style={{ width: "12%" }}>Service</th>
                  <th style={{ width: "12%" }}>Name</th>
                  <th style={{ width: "11%" }}>Phone</th>
                  <th style={{ width: "24%" }}>Message</th>
                  <th style={{ width: "9%" }}>Status</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e.id}>
                    <td><TypeBadge type={e.type} /></td>
                    <td><ServiceBadge service={e.service} /></td>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>
                      {e.message ? (
                        <span className="jth-admin__truncate" title={e.message}>
                          {e.message}
                        </span>
                      ) : "—"}
                    </td>
                    <td><StatusPill status={e.status} /></td>
                    <td>{formatDate(e.createdAt)}</td>
                    <td>
                      <div className="jth-admin__row-actions">
                        <button title="View full enquiry" onClick={() => setSelected(e)} disabled={updatingId === e.id}>
                          <FileText size={12} /> View
                        </button>
                        {statusActions(e)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="jth-admin__cards">
              {enquiries.map((e) => (
                <EnquiryCard
                  key={e.id}
                  e={e}
                  onSelect={setSelected}
                  onUpdateStatus={updateStatus}
                  updating={updatingId === e.id}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selected && (
        <div className="jth-admin__modal-backdrop" onClick={() => setSelected(null)}>
          <div className="jth-admin__modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="jth-admin__modal-header">
              <h3>{selected.name}</h3>
              <button onClick={() => setSelected(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="jth-admin__modal-body">
              <div className="jth-admin__modal-meta">
                <span><TypeBadge type={selected.type} /></span>
                {selected.service && <span><ServiceBadge service={selected.service} /></span>}
                <span><StatusPill status={selected.status} /></span>
                <span>{formatDate(selected.createdAt)}</span>
              </div>
              <div className="jth-admin__modal-meta">
                <span><Mail size={14} /> {selected.email || "No email"}</span>
                <span><Phone size={14} /> {selected.phone}</span>
                <span><MapPin size={14} /> {selected.location || "No location"}</span>
                {selected.listing && (
                  <span><Home size={14} /> {selected.listing.title} ({selected.listing.city})</span>
                )}
              </div>
              <p className="jth-admin__modal-desc">
                {selected.message || "No message provided."}
              </p>
              {statusActions(selected)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
