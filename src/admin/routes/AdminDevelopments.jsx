import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Loader2, Eye, X, MapPin, ImageOff } from "lucide-react";
import { StatusBadge } from "../../components/common/SmallBits";
import { useDevelopments } from "../../context/DevelopmentsContext";

function PreviewModal({ development, onClose }) {
  if (!development) return null;
  const gallery = development.images?.length ? development.images : [];

  return (
    <div className="jth-admin__modal-backdrop" onClick={onClose}>
      <div className="jth-admin__modal" onClick={(e) => e.stopPropagation()}>
        <div className="jth-admin__modal-header">
          <h3>{development.title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="jth-admin__modal-body">
          <div className="jth-admin__modal-meta">
            <span><MapPin size={13} /> {development.neighborhood}, {development.city}</span>
            <span>{development.developer}</span>
            <StatusBadge status={development.status} />
          </div>
          <p className="jth-admin__modal-desc">{development.description}</p>
          {gallery.length > 0 ? (
            <div className="jth-admin__modal-gallery">
              {gallery.map((src, i) => (
                <div key={i} className="jth-admin__modal-thumb">
                  <img src={src} alt={`${development.title} ${i + 1}`} />
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

function DevelopmentCard({ development, onPreview, onEdit, onDelete }) {
  return (
    <div className="jth-admin__card">
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Title</div>
          <div className="jth-admin__card-value">
            {development.title}
            {development.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
            {development.featured && <span className="jth-admin__featured-badge">Featured</span>}
          </div>
        </div>
        <StatusBadge status={development.status} />
      </div>
      <div className="jth-admin__card-row">
        <div>
          <div className="jth-admin__card-label">Location</div>
          <div className="jth-admin__card-value--muted">{development.neighborhood}, {development.city}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="jth-admin__card-label">Developer</div>
          <div className="jth-admin__card-value--muted">{development.developer}</div>
        </div>
      </div>
      <div className="jth-admin__card-row">
        <div className="jth-admin__row-actions">
          <button onClick={() => onPreview(development)}>
            <Eye size={12} /> Preview
          </button>
          <button onClick={() => onEdit(development.id)}>
            <Pencil size={12} /> Edit
          </button>
          <button className="jth-admin__row-action--danger" onClick={() => onDelete(development)}>
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDevelopments() {
  const { developments, deleteDevelopment, loading } = useDevelopments();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleDelete = async (d) => {
    if (!window.confirm(`Delete "${d.title}"? This can't be undone.`)) return;
    try {
      await deleteDevelopment(d.id);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="jth-admin__title-row">
        <h1 className="jth-admin__title">Developments</h1>
        <button className="jth-btn jth-btn--primary" onClick={() => navigate("/admin/developments/new")}>
          + Add development
        </button>
      </div>
      <div className="jth-admin__panel">
        {loading ? (
          <div className="jth-admin__loading">
            <Loader2 size={20} className="jth-spin" /> Loading developments…
          </div>
        ) : (
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "28%" }}>Title</th>
                  <th style={{ width: "16%" }}>Location</th>
                  <th style={{ width: "16%" }}>Developer</th>
                  <th style={{ width: "12%" }}>Status</th>
                  <th style={{ width: "28%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {developments.map((d) => (
                  <tr key={d.id} className={d.hidden ? "jth-admin__row--hidden" : ""}>
                    <td>
                      {d.title}
                      {d.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
                      {d.featured && <span className="jth-admin__featured-badge">Featured</span>}
                    </td>
                    <td>{d.neighborhood}, {d.city}</td>
                    <td>{d.developer}</td>
                    <td><StatusBadge status={d.status} /></td>
                    <td className="jth-admin__row-actions">
                      <button onClick={() => setPreview(d)} title="Preview">
                        <Eye size={12} /> Preview
                      </button>
                      <button onClick={() => navigate(`/admin/developments/${d.id}/edit`)} title="Edit">
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="jth-admin__row-action--danger" onClick={() => handleDelete(d)} title="Delete">
                        <Trash2 size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {developments.length === 0 && (
                  <tr>
                    <td colSpan="5">No developments yet.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="jth-admin__cards">
              {developments.map((d) => (
                <DevelopmentCard
                  key={d.id}
                  development={d}
                  onPreview={setPreview}
                  onEdit={(id) => navigate(`/admin/developments/${id}/edit`)}
                  onDelete={handleDelete}
                />
              ))}
              {developments.length === 0 && <p>No developments yet.</p>}
            </div>
          </>
        )}
      </div>
      {preview && <PreviewModal development={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
