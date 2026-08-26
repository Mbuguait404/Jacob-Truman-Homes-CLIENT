export const DEV_CITIES = ["Nairobi", "Kiambu", "Eldoret", "Kajiado"];

export const DEV_STATUSES = [
  "Upcoming",
  "Off-Plan",
  "Under Construction",
  "Completed",
  "Sold Out",
];

// Fallback content shown if the API is unavailable. Mirrors the seeded
// developments in the API so the prototype looks complete offline.
export const INITIAL_DEVELOPMENTS = [
  {
    id: "dev-1",
    title: "Kilimani Mosaic Residences",
    slug: "kilimani-mosaic-residences",
    city: "Nairobi",
    neighborhood: "Kilimani",
    developer: "Mosaic Concepts Ltd",
    status: "Off-Plan",
    completionDate: "2027-06-30",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A 14-storey mixed-use tower on Kilimani's vibrant artery, pairing compact one-bedrooms with generous four-bed penthouses. Residents share a sky deck, co-working lounge and a double-height lobby finished in local stone and brass.",
    amenities: ["Sky deck", "Co-working lounge", "Gym & spa", "Backup generator", "Borehole water", "Visitor parking", "Fibre-ready", "24-hour concierge"],
    unitTypes: [
      { type: "1 Bed", beds: 1, baths: 1, area: 58, priceFrom: 9500000 },
      { type: "2 Bed", beds: 2, baths: 2, area: 92, priceFrom: 14500000 },
      { type: "3 Bed", beds: 3, baths: 3, area: 138, priceFrom: 22000000 },
      { type: "Penthouse", beds: 4, baths: 4, area: 240, priceFrom: 48000000 },
    ],
  },
  {
    id: "dev-2",
    title: "Runda Greenway Villas",
    slug: "runda-greenway-villas",
    city: "Nairobi",
    neighborhood: "Runda",
    developer: "Greenway Estates",
    status: "Under Construction",
    completionDate: "2026-12-15",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Twelve detached villas set around a central greenway in Runda's diplomatic belt. Each home opens onto a private garden with a pool court, and the estate shares a clubhouse and a guarded, tree-lined perimeter.",
    amenities: ["Private garden", "Clubhouse", "Swimming pool", "Solar & inverter", "Borehole", "Staff quarters", "Perimeter wall & gate", "Electric fence & CCTV"],
    unitTypes: [
      { type: "4 Bed Villa", beds: 4, baths: 4, area: 420, priceFrom: 95000000 },
      { type: "5 Bed Villa", beds: 5, baths: 5, area: 560, priceFrom: 125000000 },
    ],
  },
  {
    id: "dev-3",
    title: "Eldoret Summit Heights",
    slug: "eldoret-summit-heights",
    city: "Eldoret",
    neighborhood: "Elgon View",
    developer: "Summit Housing Co.",
    status: "Upcoming",
    completionDate: "2028-03-01",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A garden-style apartment community on Elgon View's elevated plots, designed for families and relocating professionals. Low-rise blocks keep every home within a short walk of the shared playground and kitchen garden.",
    amenities: ["Shared playground", "Kitchen garden", "Borehole", "Perimeter security", "Solar water heating", "Reserved parking"],
    unitTypes: [
      { type: "2 Bed", beds: 2, baths: 2, area: 96, priceFrom: 7800000 },
      { type: "3 Bed", beds: 3, baths: 2, area: 128, priceFrom: 11200000 },
    ],
  },
];
