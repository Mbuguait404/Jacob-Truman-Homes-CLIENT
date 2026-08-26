// Marketing data for the neighbourhoods Jacob Truman Properties covers.
// `name` matches the `neighborhood` values used on listings/developments
// so the shortcut links filter correctly. `lat`/`lng` are approximate
// centre points used to plot the neighbourhood on the listings map.
//
// `image` points at a real, keyword-matched photo (LoremFlickr). Swap these
// for your own official neighbourhood photos — drop files in /public and use
// e.g. "/neighbourhoods/karen.jpg", or paste any hosted URL.

export const NEIGHBOURHOODS = [
  // ── Nairobi ──
  {
    name: "Karen",
    city: "Nairobi",
    lat: -1.3197,
    lng: 36.711,
    tagline: "Leafy, established and quietly prestigious",
    blurb:
      "Large plots along the forest fringe, embassies and old-growth gardens. Karen suits buyers wanting space, privacy and a village feel minutes from the city.",
    seed: "hood-karen",
    image: "https://loremflickr.com/760/560/karen,nairobi?lock=11",
  },
  {
    name: "Kilimani",
    city: "Nairobi",
    lat: -1.2921,
    lng: 36.782,
    tagline: "High-rise living in the heart of the action",
    blurb:
      "Kilimani's towers put you steps from dining, gyms and offices. The most liquid rental market in Nairobi, with everything from studios to penthouses.",
    seed: "hood-kilimani",
    image: "https://loremflickr.com/760/560/kilimani,nairobi?lock=12",
  },
  {
    name: "Runda",
    city: "Nairobi",
    lat: -1.223,
    lng: 36.806,
    tagline: "Diplomatic, gated and generously planted",
    blurb:
      "Runda's diplomatic core is all mature hedging, quarter-acre plots and quiet streets. A favourite for families and relocating professionals.",
    seed: "hood-runda",
    image: "https://loremflickr.com/760/560/runda,nairobi?lock=13",
  },
  {
    name: "Westlands",
    city: "Nairobi",
    lat: -1.268,
    lng: 36.81,
    tagline: "Commercial energy meets city apartments",
    blurb:
      "The city's business heart after dark too — Westlands blends offices, malls and smart apartments for buyers who want to be in the middle of it.",
    seed: "hood-westlands",
    image: "https://loremflickr.com/760/560/westlands,nairobi?lock=14",
  },
  {
    name: "Lavington",
    city: "Nairobi",
    lat: -1.282,
    lng: 36.78,
    tagline: "Mature gardens and family homes",
    blurb:
      "Lavington pairs 1970s character homes with newer villas on green, low-density streets. Consistently one of Nairobi's most sought-after addresses.",
    seed: "hood-lavington",
    image: "https://loremflickr.com/760/560/lavington,nairobi?lock=15",
  },
  {
    name: "Kileleshwa",
    city: "Nairobi",
    lat: -1.283,
    lng: 36.79,
    tagline: "Low-rise courtyards close to the city",
    blurb:
      "Quiet, walkable and full of courtyards and boutique blocks. Kileleshwa offers an easy in-town lifestyle between Kilimani and Lavington.",
    seed: "hood-kileleshwa",
    image: "https://loremflickr.com/760/560/kileleshwa,nairobi?lock=16",
  },
  // ── Eldoret ──
  {
    name: "Elgon View",
    city: "Eldoret",
    lat: 0.505,
    lng: 35.29,
    tagline: "Eldoret's most desirable address",
    blurb:
      "Large plots, family character and steady appreciation make Elgon View the address of choice for owner-occupiers in the North Rift.",
    seed: "hood-elgonview",
    image: "https://loremflickr.com/760/560/elgonview,eldoret?lock=17",
  },
  {
    name: "Pioneer",
    city: "Eldoret",
    lat: 0.52,
    lng: 35.278,
    tagline: "Practical townhouses for professionals",
    blurb:
      "A gated row of townhouses close to schools and the bypass — simple, well-kept and easy to run for relocating professionals.",
    seed: "hood-pioneer",
    image: "https://loremflickr.com/760/560/pioneer,eldoret?lock=18",
  },
  {
    name: "Kapsoya",
    city: "Eldoret",
    lat: 0.54,
    lng: 35.3,
    tagline: "New-build apartments with a view",
    blurb:
      "Kapsoya's rising ground gives new-build apartments a view toward the escarpment — built for owner-occupiers rather than speculation.",
    seed: "hood-kapsoya",
    image: "https://loremflickr.com/760/560/kapsoya,eldoret?lock=19",
  },
  {
    name: "Racecourse",
    city: "Eldoret",
    lat: 0.5,
    lng: 35.27,
    tagline: "Established homes near the town centre",
    blurb:
      "Generous corner plots near Eldoret's old racecourse grounds. A balanced mix of family homes and sound buy-to-let options.",
    seed: "hood-racecourse",
    image: "https://loremflickr.com/760/560/racecourse,eldoret?lock=20",
  },
];

export const NEIGHBOURHOOD_NAMES = NEIGHBOURHOODS.map((n) => n.name);
