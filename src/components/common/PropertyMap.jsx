import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatPrice } from "../../utils/format";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

export default function PropertyMap({ points, listings, selected, onSelect, onOpenListing, expanded }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onOpenListingRef = useRef(onOpenListing);
  onOpenListingRef.current = onOpenListing;

  // Initialise the map once
  useEffect(() => {
    if (mapRef.current || !elRef.current) return;
    const map = L.map(elRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([0.2, 36.8], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Recompute size once the (possibly animated) container has settled
    const t = setTimeout(() => map.invalidateSize(), 250);

    return () => {
      clearTimeout(t);
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Re-draw pins whenever the points or selection change
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    if (!points.length) return;

    const bounds = [];
    const allListings = listings || [];
    points.forEach((p) => {
      const latlng = [p.lat, p.lng];
      bounds.push(latlng);

      const isSel = selected === p.name;
      const icon = L.divIcon({
        className: "jth-map-pin-wrap",
        html: `<span class="jth-map-pin ${isSel ? "jth-map-pin--active" : ""}">${p.count}</span>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const hoodListings = allListings.filter((l) => l.neighborhood === p.name);
      const itemsHtml = hoodListings
        .slice(0, 4)
        .map((l) => {
          const img = l.images && l.images[0] ? l.images[0] : "";
          const imgFallback = `https://picsum.photos/seed/${encodeURIComponent(l.seed || l.id)}/120/90`;
          return `
            <a class="jth-map-pop__item" href="/listings/${l.id}" data-id="${esc(l.id)}">
              <img class="jth-map-pop__img" src="${esc(img)}" alt="" onerror="this.onerror=null;this.src='${imgFallback}'" />
              <span class="jth-map-pop__info">
                <span class="jth-map-pop__title">${esc(l.title)}</span>
                <span class="jth-map-pop__meta">${esc(l.listingType)} · ${esc(formatPrice(l.price, l.listingType === "For Rent"))}</span>
              </span>
            </a>`;
        })
        .join("");

      const popupHtml = `
        <div class="jth-map-pop">
          <div class="jth-map-pop__head">
            <span>${esc(p.name)}</span>
            <span class="jth-map-pop__count">${p.count} ${p.count === 1 ? "home" : "homes"}</span>
          </div>
          <div class="jth-map-pop__list">${itemsHtml}</div>
          <button type="button" class="jth-map-pop__all" data-hood="${esc(p.name)}">View all in ${esc(p.name)}</button>
        </div>`;

      const marker = L.marker(latlng, { icon });
      marker.bindPopup(popupHtml, { minWidth: 240, maxWidth: 260 });
      marker.on("click", () => onSelectRef.current(p.name));
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup().getElement();
        if (!popupEl) return;
        popupEl.querySelectorAll("a[data-id]").forEach((a) => {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            const id = a.getAttribute("data-id");
            if (id && onOpenListingRef.current) onOpenListingRef.current(id);
          });
        });
        const allBtn = popupEl.querySelector("[data-hood]");
        if (allBtn) {
          allBtn.addEventListener("click", () =>
            onSelectRef.current(allBtn.getAttribute("data-hood"))
          );
        }
      });
      marker.addTo(layer);
    });

    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12, animate: true });
  }, [points, listings, selected]);

  // Recompute size when the map panel is expanded/collapsed
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => clearTimeout(t);
  }, [expanded]);

  return <div className="jth-prop-map" ref={elRef} />;
}
