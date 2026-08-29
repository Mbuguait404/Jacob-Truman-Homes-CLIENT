import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { useDevelopments } from "../../context/DevelopmentsContext";
import { api } from "../../api/client";
import { DEV_CITIES, DEV_STATUSES } from "../../data/developments";
import { Button } from "../../components/common/Button";

const BLANK_FORM = {
  title: "",
  slug: "",
  city: "Nairobi",
  neighborhood: "",
  developer: "",
  status: "Planning",
  completionDate: "",
  description: "",
  amenities: "",
  images: [],
  unitTypes: [],
  videoUrl: "",
  featured: false,
  hidden: false,
};

const blankUnit = () => ({ type: "", beds: 1, baths: 1, area: "", priceFrom: "" });

export default function AdminDevelopmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { developments, addDevelopment, updateDevelopment } = useDevelopments();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const existing = id ? developments.find((d) => String(d.id) === id) : null;
  const [form, setForm] = useState(
    existing
      ? {
          ...existing,
          amenities: Array.isArray(existing.amenities)
            ? existing.amenities.join(", ")
            : existing.amenities || "",
          unitTypes: existing.unitTypes ? existing.unitTypes.map((u) => ({ ...u })) : [],
        }
      : BLANK_FORM
  );

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const toggle = (key) => () => setForm({ ...form, [key]: !form[key] });

  const setUnit = (idx, key) => (e) =>
    setForm((prev) => {
      const unitTypes = prev.unitTypes.map((u, i) =>
        i === idx ? { ...u, [key]: e.target.value } : u
      );
      return { ...prev, unitTypes };
    });
  const addUnit = () => setForm((prev) => ({ ...prev, unitTypes: [...prev.unitTypes, blankUnit()] }));
  const removeUnit = (idx) =>
    setForm((prev) => ({ ...prev, unitTypes: prev.unitTypes.filter((_, i) => i !== idx) }));

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const data = new FormData();
      for (const file of files) {
        data.append("images", file);
      }
      const res = await api.upload("/uploads", data);
      const newUrls = res.urls || (res.url ? [res.url] : []);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (idx) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amenities: String(form.amenities)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      unitTypes: form.unitTypes
        .filter((u) => u.type && u.type.trim())
        .map((u) => ({
          type: u.type.trim(),
          beds: Number(u.beds) || 0,
          baths: Number(u.baths) || 0,
          area: Number(u.area) || 0,
          priceFrom: Number(u.priceFrom) || 0,
        })),
    };

    try {
      setSaving(true);
      if (existing) {
        await updateDevelopment({ ...payload, _id: existing._id, id: existing.id });
      } else {
        await addDevelopment(payload);
      }
      navigate("/admin/developments");
    } catch (err) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="jth-admin__title">{existing ? "Edit development" : "Add a development"}</h1>
      <div className="jth-admin__panel jth-admin__form">
        <form onSubmit={handleSubmit}>
          <div className="jth-admin__form-grid">
            <label>
              Title
              <input required value={form.title} onChange={set("title")} />
            </label>
            <label>
              Slug (optional — auto from title)
              <input value={form.slug} onChange={set("slug")} placeholder="kilimani-mosaic-residences" />
            </label>
            <label>
              City
              <select value={form.city} onChange={set("city")}>
                {DEV_CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Neighbourhood
              <input value={form.neighborhood} onChange={set("neighborhood")} />
            </label>
            <label>
              Developer
              <input value={form.developer} onChange={set("developer")} />
            </label>
            <label>
              Status
              <select value={form.status} onChange={set("status")}>
                {DEV_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Completion date
              <input type="date" value={form.completionDate || ""} onChange={set("completionDate")} />
            </label>
            <label className="jth-admin__toggle">
              <input type="checkbox" checked={form.featured} onChange={toggle("featured")} />
              Featured on home & developments page
            </label>
            <label className="jth-admin__toggle">
              <input type="checkbox" checked={form.hidden} onChange={toggle("hidden")} />
              Hide from public site
            </label>
          </div>

          <label>
            Description
            <textarea rows={4} value={form.description} onChange={set("description")} />
          </label>
          <label>
            Amenities (comma separated)
            <input value={form.amenities} onChange={set("amenities")} />
          </label>
          <label>
            Virtual tour / video URL (optional)
            <input value={form.videoUrl || ""} onChange={set("videoUrl")} placeholder="https://youtube.com/embed/…" />
          </label>

          <div className="jth-admin__unit-types">
            <div className="jth-admin__unit-types-head">
              <h3>Unit types</h3>
              <button type="button" className="jth-btn jth-btn--outline" onClick={addUnit}>
                <Plus size={14} /> Add unit type
              </button>
            </div>
            {form.unitTypes.map((u, idx) => (
              <div className="jth-admin__unit-row" key={idx}>
                <input
                  placeholder="Type (e.g. 2 Bed)"
                  value={u.type}
                  onChange={setUnit(idx, "type")}
                />
                <input
                  type="number" min="0" placeholder="Beds"
                  value={u.beds} onChange={setUnit(idx, "beds")}
                />
                <input
                  type="number" min="0" placeholder="Baths"
                  value={u.baths} onChange={setUnit(idx, "baths")}
                />
                <input
                  type="number" placeholder="Area m²"
                  value={u.area} onChange={setUnit(idx, "area")}
                />
                <input
                  type="number" placeholder="Price from (KES)"
                  value={u.priceFrom} onChange={setUnit(idx, "priceFrom")}
                />
                <button type="button" className="jth-admin__unit-remove" onClick={() => removeUnit(idx)} aria-label="Remove unit">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {form.unitTypes.length === 0 && (
              <p className="jth-admin__unit-empty">No unit types yet — add one above.</p>
            )}
          </div>

          <label>
            Images
            <div className="jth-admin__image-upload">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <Button
                type="button"
                className="jth-btn--outline"
                loading={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={15} /> Upload images
              </Button>
            </div>
            {form.images.length > 0 && (
              <div className="jth-admin__image-previews">
                {form.images.map((url, i) => (
                  <div key={url + i} className="jth-admin__image-preview">
                    <img src={url} alt="" />
                    <button type="button" onClick={() => removeImage(i)} title="Remove">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </label>

          <div className="jth-admin__form-actions">
            <button type="button" className="jth-btn jth-btn--outline" onClick={() => navigate("/admin/developments")}>
              Cancel
            </button>
            <Button type="submit" className="jth-btn--primary" loading={saving}>
              Save development
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
