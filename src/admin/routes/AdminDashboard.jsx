import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, TrendingUp, Users, Eye, Inbox, PhoneCall, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useListings } from "../../context/ListingsContext";
import { api } from "../../api/client";
import { STATUS_LABELS } from "./AdminEnquiries";

function EnquiryStatusPill({ status }) {
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

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

function EnquiryCard({ e }) {
  return (
    <div className="jth-admin__card">
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Name</div>
          <div className="jth-admin__card-value">{e.name}</div>
        </div>
        <EnquiryStatusPill status={e.status} />
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Phone</div>
          <div className="jth-admin__card-value">{e.phone}</div>
        </div>
        <div className="jth-admin__card-value--muted">{formatDate(e.createdAt)}</div>
      </div>
      {e.service && (
        <div className="jth-admin__card-row">
          <div>
            <div className="jth-admin__card-label">Service</div>
            <div className="jth-admin__card-value--muted">{e.service}</div>
          </div>
        </div>
      )}
      {e.message && (
        <div className="jth-admin__card-row">
          <div>
            <div className="jth-admin__card-label">Message</div>
            <div className="jth-admin__card-value--muted">{e.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListingCard({ l }) {
  return (
    <div className="jth-admin__card">
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Title</div>
          <div className="jth-admin__card-value">{l.title}</div>
        </div>
        <StatusBadge status={l.status} />
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">City</div>
          <div className="jth-admin__card-value--muted">{l.city}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="jth-admin__card-label">Type</div>
          <div className="jth-admin__card-value--muted">{l.listingType}</div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { listings, loading } = useListings();
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const [enquiriesError, setEnquiriesError] = useState("");

  const total = listings.length;
  const available = listings.filter((l) => l.status === "Available").length;
  const sold = listings.filter((l) => l.status === "Sold").length;
  const forRent = listings.filter((l) => l.listingType === "For Rent").length;

  const newCount = enquiries.filter((e) => e.status === "new").length;
  const contactedCount = enquiries.filter((e) => e.status === "contacted").length;
  const closedCount = enquiries.filter((e) => e.status === "closed").length;

  useEffect(() => {
    const load = async () => {
      setEnquiriesLoading(true);
      setEnquiriesError("");
      try {
        const data = await api.get("/enquiries");
        setEnquiries(data || []);
      } catch (err) {
        setEnquiriesError(err.message || "Failed to load enquiries");
      } finally {
        setEnquiriesLoading(false);
      }
    };
    load();
  }, []);

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

      <div className="jth-admin__stats">
        <div className="jth-admin__stat">
          <Inbox size={18} />
          <strong>{enquiries.length}</strong>
          <span>Total enquiries</span>
        </div>
        <div className="jth-admin__stat">
          <PhoneCall size={18} />
          <strong>{newCount}</strong>
          <span>New</span>
        </div>
        <div className="jth-admin__stat">
          <Users size={18} />
          <strong>{contactedCount}</strong>
          <span>Contacted</span>
        </div>
        <div className="jth-admin__stat">
          <CheckCircle2 size={18} />
          <strong>{closedCount}</strong>
          <span>Closed</span>
        </div>
      </div>

      <div className="jth-admin__panel" style={{ marginBottom: 26 }}>
        <h3>
          Recent enquiries{" "}
          <Link to="/admin/enquiries" style={{ fontSize: 13, color: "var(--terracotta)", textDecoration: "none" }}>
            View all →
          </Link>
        </h3>
        {enquiriesLoading ? (
          <p>Loading enquiries…</p>
        ) : enquiriesError ? (
          <p style={{ color: "#991b1b" }}>{enquiriesError}</p>
        ) : enquiries.length === 0 ? (
          <p>No enquiries yet.</p>
        ) : (
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>Type</th>
                  <th style={{ width: "12%" }}>Service</th>
                  <th style={{ width: "14%" }}>Name</th>
                  <th style={{ width: "12%" }}>Phone</th>
                  <th style={{ width: "24%" }}>Message</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "10%" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 6).map((e) => (
                  <tr key={e.id}>
                    <td>{e.type}</td>
                    <td>{e.service || "—"}</td>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>
                      {e.message ? (
                        <span className="jth-admin__truncate" title={e.message}>
                          {e.message}
                        </span>
                      ) : "—"}
                    </td>
                    <td><EnquiryStatusPill status={e.status} /></td>
                    <td>{formatDate(e.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="jth-admin__cards">
              {enquiries.slice(0, 6).map((e) => (
                <EnquiryCard key={e.id} e={e} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="jth-admin__panel">
        <h3>Recent listings</h3>
        {loading ? (
          <p>Loading listings…</p>
        ) : (
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>Title</th>
                  <th style={{ width: "20%" }}>City</th>
                  <th style={{ width: "20%" }}>Type</th>
                  <th style={{ width: "25%" }}>Status</th>
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
                {listings.length === 0 && (
                  <tr>
                    <td colSpan="4">No listings yet.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="jth-admin__cards">
              {listings.slice(0, 6).map((l) => (
                <ListingCard key={l.id} l={l} />
              ))}
              {listings.length === 0 && <p>No listings yet.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
